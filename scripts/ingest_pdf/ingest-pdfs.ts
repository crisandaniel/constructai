#!/usr/bin/env node
// scripts/ingest-pdfs.ts
//
// Processes PDF technical data sheets and generates:
//   data/generated/system-prompt-{date}.md  → paste into SYSTEM_PROMPT
//   data/generated/materials-kb-{date}.ts   → paste into MATERIALS_KB
//
// Usage:
//   npm run ingest                                  all PDFs in data/pdfs/
//   npm run ingest -- --file ./data/pdfs/knauf.pdf  single file
//   npm run ingest -- --dir ./my-folder             custom folder

import fs   from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// ─── Config ───────────────────────────────────────────────────────────────────

const PDF_DIR    = path.resolve(process.cwd(), 'data/pdfs')
const OUTPUT_DIR = path.resolve(process.cwd(), 'data/generated')
const DATE_STAMP = new Date().toISOString().split('T')[0]
const PROVIDER   = (process.env.AI_PROVIDER || 'anthropic') as string
const MAX_MB     = 20

// ─── Types ────────────────────────────────────────────────────────────────────

// Normalized consumption — what the calculator needs, regardless of
// how the PDF expressed the original data.
interface NormalizedConsumption {
  // Primary value: kg per m² at the standard/recommended application.
  // Null for purely volumetric materials — use kgPerM3 instead.
  kgPerM2Standard: number | null

  // For thickness-dependent materials (plasters, adhesives, screeds):
  // consumption per m² per 1 mm of thickness.
  // Derived as kgPerM2Standard / thicknessStandardMm.
  kgPerM2PerMm: number | null

  // Thickness values in mm. Null for fixed-layer products (membranes, paint).
  thicknessStandardMm: number | null
  thicknessMinMm:      number | null
  thicknessMaxMm:      number | null

  // Package coverage at standard thickness
  packageDescription: string    // e.g. "sac 30kg", "bidon 20L", "pachet 6m²"
  packageUnit:        string    // "kg" | "L" | "m2" | "buc"
  packageSize:        number | null
  m2PerPackage:       number | null

  // For volumetric materials (concrete, screed mix): kg per m³ of finished product
  kgPerM3: number | null

  // For unit-count materials (masonry blocks, tiles): pieces per m²
  unitsPerM2: number | null
  kgPerUnit:  number | null

  // Audit trail: what the AI found and how it calculated the above
  conversionNote: string
}

type MaterialCategory =
  | 'Tencuieli'
  | 'Adezivi'
  | 'Beton'
  | 'Sapa'
  | 'Zidarie'
  | 'Termoizolatie'
  | 'Vopsele'
  | 'Hidroizolatie'
  | 'Rigips'
  | 'Finisaje'
  | 'Altele'

// ─── Extraction prompt ────────────────────────────────────────────────────────

const EXTRACTION_PROMPT = `You are a specialist extracting technical data from construction material data sheets.
Output goes directly into a materials calculator — every number must be exact.

---

## STEP 1 — FIND CONSUMPTION DATA (most important)

Search the ENTIRE document for any consumption or coverage information.
It may appear in many formats:

FORMAT A — Explicit table:
  Grosime (mm) | Consum (kg/m²) | m²/sac | m²/tonă
  10           | 8.0            | 3.7    | 125

FORMAT B — Inline text:
  "consum aprox. 1.7 kg/m² per strat"
  "randament: 8-10 m²/L"
  "se consumă 350 kg de ciment per m³"

FORMAT C — Coverage per package:
  "un sac de 25 kg acoperă ~4 m²"
  "1 litru acoperă 6-8 m²"
  "3.7 m²/sac la 10 mm"

FORMAT D — Units per area (masonry):
  "65 buc/m² pentru perete de 12.5 cm"
  "aprox. 130 cărămizi pe m² de zid"

FORMAT E — Volumetric (concrete, screed):
  "350 kg ciment/m³ beton"
  "dozaj: 1 : 3 (ciment : nisip)"

Copy the EXACT original text or table into "rawConsumptionFromPDF".
If you cannot find any consumption data, set rawConsumptionFromPDF to "NOT FOUND".

---

## STEP 2 — NORMALIZE TO STANDARD UNITS

Convert whatever you found to the normalized consumption object.
Use these rules:

• kg/m² at thickness T(mm):
  kgPerM2Standard = that value
  kgPerM2PerMm    = kgPerM2Standard / T
  thicknessStandardMm = T

• m²/tonne (randament) with known thickness T(mm):
  kgPerM2Standard = 1000 / m2PerTonne
  kgPerM2PerMm    = kgPerM2Standard / T

• m²/tonne without thickness:
  kgPerM2Standard = 1000 / m2PerTonne
  kgPerM2PerMm    = null
  thicknessStandardMm = null

• Package weight W(kg) covers M(m²):
  kgPerM2Standard = W / M
  m2PerPackage = M

• L/m² with known density D(kg/L):
  kgPerM2Standard = litersPerM2 * D

• L/m² without density:
  kgPerM2Standard = null  (set conversionNote to explain)

• kg/m³ (volumetric):
  kgPerM3 = that value
  kgPerM2Standard = null

• units/m²:
  unitsPerM2 = count
  kgPerUnit  = weight per unit if stated
  kgPerM2Standard = unitsPerM2 * kgPerUnit  (if both known, else null)

Always set conversionNote to explain your calculation.
Example: "Tabel PDF: 10mm → 8.0 kg/m². kgPerM2PerMm = 8.0/10 = 0.8. Sac 30kg → 30/8.0 = 3.75 m²/sac."

---

## STEP 3 — CATEGORY

Pick exactly one:
Tencuieli | Adezivi | Beton | Sapa | Zidarie | Termoizolatie | Vopsele | Hidroizolatie | Rigips | Finisaje | Altele

---

## STEP 4 — SYSTEM PROMPT SECTION (Romanian, 150-250 words)

Write for an AI construction assistant. Must include:
- Exact consumption with units: "X kg/m² la grosimea de Y mm"
- Package coverage: "un sac/bidon de Z kg/L acoperă W m²"
- Min application temperature
- Substrate preparation
- Key warnings
- Compatible primer or system products by name

---

Respond with ONLY raw JSON — no markdown fences, no backticks, no preamble:

{
  "id": "brand-product-slug",
  "brand": "Brand Name",
  "name": "Full Product Name",
  "productCode": "code or null",
  "category": "Tencuieli",
  "description": "2-3 propoziții în română",
  "specs": ["spec string 1", "spec string 2"],
  "keyProperties": { "Proprietate": "Valoare cu unitate" },

  "rawConsumptionFromPDF": "Exact text or table copied from PDF",

  "consumption": {
    "kgPerM2Standard":     8.0,
    "kgPerM2PerMm":        0.8,
    "thicknessStandardMm": 10,
    "thicknessMinMm":      8,
    "thicknessMaxMm":      25,
    "packageDescription":  "sac 30kg",
    "packageUnit":         "kg",
    "packageSize":         30,
    "m2PerPackage":        3.7,
    "kgPerM3":             null,
    "unitsPerM2":          null,
    "kgPerUnit":           null,
    "conversionNote":      "Tabel PDF: 10mm → 8.0 kg/m² → 3.7 m²/sac. kgPerM2PerMm = 8.0/10 = 0.8"
  },

  "application": {
    "minTempC":          5,
    "maxTempC":          null,
    "thicknessMinMm":    8,
    "thicknessMaxMm":    25,
    "openTimeMinutes":   180,
    "dryingDescription": "text",
    "substratePrep":     "text",
    "coatsRequired":     null,
    "tools":             ["Mașină de tencuit", "Dreptar"]
  },

  "packaging": {
    "sizes":           ["30kg sac"],
    "shelfLifeMonths": 6,
    "storageNotes":    "text"
  },

  "compatibility": {
    "compatible":   ["Knauf Betokontakt"],
    "incompatible": ["suprafețe hidrofuge"]
  },

  "standards": ["SR EN 13279"],

  "systemPromptSection": "Romanian text 150-250 words"
}`

// ─── Post-processing: normalize and auto-correct consumption ─────────────────
// Catches arithmetic errors and derives missing fields where possible.

function normalizeConsumption(c: any, filename: string): string[] {
  const notes: string[] = []
  if (!c) return notes

  // Derive kgPerM2PerMm if missing but derivable
  if (c.kgPerM2Standard != null && c.thicknessStandardMm && c.kgPerM2PerMm == null) {
    c.kgPerM2PerMm = parseFloat((c.kgPerM2Standard / c.thicknessStandardMm).toFixed(4))
    notes.push(`Derived kgPerM2PerMm = ${c.kgPerM2Standard} / ${c.thicknessStandardMm} = ${c.kgPerM2PerMm}`)
  }

  // Cross-check kgPerM2PerMm arithmetic and auto-correct if wrong
  if (c.kgPerM2Standard != null && c.thicknessStandardMm && c.kgPerM2PerMm != null) {
    const expected = c.kgPerM2Standard / c.thicknessStandardMm
    if (Math.abs(expected - c.kgPerM2PerMm) > 0.05) {
      notes.push(`⚠ kgPerM2PerMm was ${c.kgPerM2PerMm}, expected ${expected.toFixed(4)} — auto-corrected`)
      c.kgPerM2PerMm = parseFloat(expected.toFixed(4))
    }
  }

  // Derive kgPerM2Standard from package data
  if (c.kgPerM2Standard == null && c.packageSize && c.m2PerPackage && c.packageUnit === 'kg') {
    c.kgPerM2Standard = parseFloat((c.packageSize / c.m2PerPackage).toFixed(2))
    notes.push(`Derived kgPerM2Standard = ${c.packageSize}kg / ${c.m2PerPackage}m² = ${c.kgPerM2Standard}`)
  }

  // Derive m2PerPackage from kgPerM2Standard + packageSize
  if (c.m2PerPackage == null && c.kgPerM2Standard && c.packageSize && c.packageUnit === 'kg') {
    c.m2PerPackage = parseFloat((c.packageSize / c.kgPerM2Standard).toFixed(2))
    notes.push(`Derived m2PerPackage = ${c.packageSize}kg / ${c.kgPerM2Standard} kg/m² = ${c.m2PerPackage}`)
  }

  // Cross-check m2PerPackage (warn only — PDF table value may include waste factor)
  if (c.kgPerM2Standard && c.packageSize && c.packageUnit === 'kg' && c.m2PerPackage) {
    const expected = c.packageSize / c.kgPerM2Standard
    if (Math.abs(expected - c.m2PerPackage) > 0.5) {
      notes.push(
        `⚠ m2PerPackage: PDF says ${c.m2PerPackage}, arithmetic gives ${expected.toFixed(1)} ` +
        `— keeping PDF value (may include waste factor)`
      )
    }
  }

  // Masonry: derive kgPerM2Standard from units × weight per unit
  if (c.kgPerM2Standard == null && c.unitsPerM2 && c.kgPerUnit) {
    c.kgPerM2Standard = parseFloat((c.unitsPerM2 * c.kgPerUnit).toFixed(1))
    notes.push(`Derived kgPerM2Standard = ${c.unitsPerM2} buc/m² × ${c.kgPerUnit} kg/buc = ${c.kgPerM2Standard}`)
  }

  return notes
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(parsed: any, filename: string): string[] {
  const errors: string[] = []
  const c = parsed?.consumption || {}

  const hasM2   = c.kgPerM2Standard != null
  const hasVol  = c.kgPerM3        != null
  const hasUnits= c.unitsPerM2     != null

  if (!hasM2 && !hasVol && !hasUnits) {
    errors.push(
      'No usable consumption value. Need at least one of:\n' +
      '  consumption.kgPerM2Standard  (most materials)\n' +
      '  consumption.kgPerM3          (concrete/screed)\n' +
      '  consumption.unitsPerM2       (masonry)\n' +
      'Check rawConsumptionFromPDF — if "NOT FOUND", PDF may be a scanned image (needs OCR first).'
    )
  }

  if (!parsed.rawConsumptionFromPDF || parsed.rawConsumptionFromPDF === 'NOT FOUND')
    errors.push('rawConsumptionFromPDF is empty or "NOT FOUND" — AI could not locate consumption data')

  return errors
}

// ─── Output generators ────────────────────────────────────────────────────────

function buildDisplaySpecs(m: any): string[] {
  const c    = m.consumption || {}
  const specs: string[] = []

  if (c.kgPerM2Standard != null && c.thicknessStandardMm)
    specs.push(`${c.kgPerM2Standard} kg/m² la ${c.thicknessStandardMm}mm`)
  else if (c.kgPerM2Standard != null)
    specs.push(`${c.kgPerM2Standard} kg/m²`)

  if (c.m2PerPackage && c.packageDescription)
    specs.push(`${c.m2PerPackage} m²/${c.packageDescription}`)

  if (c.kgPerM3)
    specs.push(`${c.kgPerM3} kg/m³`)

  if (c.unitsPerM2)
    specs.push(`${c.unitsPerM2} buc/m²`)

  if (m.application?.minTempC != null)
    specs.push(`min +${m.application.minTempC}°C`)

  return Array.from(new Set([...specs, ...(m.specs || [])]))
}

function generateSystemPrompt(materials: any[]): string {
  const sections = materials
    .filter(m => m?.systemPromptSection)
    .map(m => `### ${(m.name || '').toUpperCase()} (${m.brand || ''})\n${m.systemPromptSection}`)
    .join('\n\n')

  return `# GENERATED SYSTEM PROMPT SECTIONS
# Generated: ${new Date().toISOString()}
# PDFs processed: ${materials.length}
#
# HOW TO USE:
# 1. Review each section below
# 2. Paste into SYSTEM_PROMPT in lib/materials-data.ts
# 3. Merge with existing content — check for duplicates
# =====================================================

${sections}

# =====================================================
# END
`
}

function generateMaterialsKB(materials: any[]): string {
  const entries = materials
    .filter(m => m?.id && m?.name)
    .map(m => {
      const c      = m.consumption || {}
      const specs  = buildDisplaySpecs(m)
      const props  = Object.entries(m.keyProperties || {})
        .map(([k, v]) => `      '${k}': '${v}'`)
        .join(',\n')

      return `  {
    id:          '${m.id}',
    category:    '${m.category}',
    name:        '${m.name}',
    description: '${(m.description || '').replace(/'/g, "\\'")}',
    specs: [${specs.map((s: string) => `'${s}'`).join(', ')}],
    keyProperties: {
${props}
    },
    // Source: ${JSON.stringify(m.rawConsumptionFromPDF?.slice(0, 120))}
    // Note  : ${c.conversionNote || 'n/a'}
    consumption: {
      kgPerM2Standard:     ${c.kgPerM2Standard     ?? null},
      kgPerM2PerMm:        ${c.kgPerM2PerMm        ?? null},
      thicknessStandardMm: ${c.thicknessStandardMm ?? null},
      thicknessMinMm:      ${c.thicknessMinMm       ?? null},
      thicknessMaxMm:      ${c.thicknessMaxMm       ?? null},
      m2PerPackage:        ${c.m2PerPackage         ?? null},
      packageDescription:  '${c.packageDescription ?? ''}',
      packageSize:         ${c.packageSize          ?? null},
      packageUnit:         '${c.packageUnit         ?? ''}',
      kgPerM3:             ${c.kgPerM3              ?? null},
      unitsPerM2:          ${c.unitsPerM2           ?? null},
      kgPerUnit:           ${c.kgPerUnit            ?? null},
    },
  }`
    })
    .join(',\n\n')

  return `// Generated: ${new Date().toISOString()}
// Source: ${materials.length} PDF(s)
//
// HOW TO USE:
// 1. Review each consumption{} block
//    → "Source" comment shows what was in the PDF
//    → "Note" comment shows how values were derived
// 2. Paste entries into MATERIALS_KB in lib/materials-data.ts
// 3. Add 'consumption' field to MaterialSpec type in types/index.ts

export const GENERATED_MATERIALS = [
${entries}
] as const
`
}

// ─── AI provider calls ────────────────────────────────────────────────────────

async function callAI(pdfBase64: string, filename: string): Promise<string> {
  console.log(`   🤖 ${PROVIDER.toUpperCase()}...`)

  if (PROVIDER === 'anthropic') {
    const Anthropic = require('@anthropic-ai/sdk')
    const client    = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY })
    const res = await client.messages.create({
      model:      'claude-opus-4-6',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
          { type: 'text',     text: `Filename: ${filename}\n\n${EXTRACTION_PROMPT}` },
        ],
      }],
    })
    return res.content[0].text
  }

  if (PROVIDER === 'openai') {
    const OpenAI = require('openai')
    const client = new OpenAI.default({ apiKey: process.env.OPENAI_API_KEY })
    const res = await client.chat.completions.create({
      model:      'gpt-4o',
      max_tokens: 4096,
      messages: [{
        role:    'user',
        content: `Filename: ${filename}\n\n${EXTRACTION_PROMPT}\n\n[PDF — base64 length: ${pdfBase64.length} chars]`,
      }],
    })
    return res.choices[0].message.content || ''
  }

  if (PROVIDER === 'gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: 'application/pdf', data: pdfBase64 } },
              { text: `Filename: ${filename}\n\n${EXTRACTION_PROMPT}` },
            ],
          }],
          generationConfig: { maxOutputTokens: 4096 },
        }),
      }
    )
    const data: any = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  }

  throw new Error(`Provider "${PROVIDER}" not supported. Set AI_PROVIDER to: anthropic | openai | gemini`)
}

// ─── JSON parsing ─────────────────────────────────────────────────────────────

function parseResponse(raw: string, filename: string): any | null {
  const cleaned = raw
    .replace(/^```json\s*/m, '')
    .replace(/^```\s*/m, '')
    .replace(/```\s*$/m, '')
    .trim()

  try { return JSON.parse(cleaned) } catch {}

  const match = cleaned.match(/\{[\s\S]*\}/)
  if (match) { try { return JSON.parse(match[0]) } catch {} }

  return null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function findPDFs(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Not found: ${dir}\n   Run: mkdir -p ${dir}`)
    process.exit(1)
  }

  const results: string[] = []

  function walk(current: string) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory())                             walk(full)
      else if (entry.name.toLowerCase().endsWith('.pdf')) results.push(full)
    }
  }

  walk(dir)

  if (!results.length) {
    console.error(`❌ No PDFs found in: ${dir} (searched recursively)`)
    process.exit(1)
  }

  return results
}

function readPDF(fp: string): string {
  const mb = fs.statSync(fp).size / 1024 / 1024
  if (mb > MAX_MB) throw new Error(`Too large: ${mb.toFixed(1)}MB (max ${MAX_MB}MB)`)
  return fs.readFileSync(fp).toString('base64')
}

function parseArgs() {
  const args = process.argv.slice(2)
  const r    = { dir: PDF_DIR, file: null as string | null }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dir'  && args[i+1]) r.dir  = path.resolve(args[i+1])
    if (args[i] === '--file' && args[i+1]) r.file = path.resolve(args[i+1])
  }
  return r
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🏗️  ConstructAI — PDF Ingestion')
  console.log('================================')
  console.log(`Provider : ${PROVIDER.toUpperCase()}`)
  console.log(`Output   : ${path.relative(process.cwd(), OUTPUT_DIR)}\n`)

  const { dir, file } = parseArgs()
  const pdfs = file ? [file] : findPDFs(dir)

  console.log(`Found ${pdfs.length} PDF(s):`)
  pdfs.forEach(p => console.log(`  • ${path.basename(p)}`))

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const results:  any[] = []
  const failures: string[] = []

  for (let i = 0; i < pdfs.length; i++) {
    const fp       = pdfs[i]
    const filename = path.basename(fp)
    const pct      = Math.round(((i + 1) / pdfs.length) * 100)
    const bar      = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5))

    console.log(`\n[${bar}] ${pct}% — ${filename}`)

    try {
      const base64 = readPDF(fp)
      const raw    = await callAI(base64, filename)
      const parsed = parseResponse(raw, filename)

      if (!parsed) {
        const out = path.join(OUTPUT_DIR, `failed-${filename.replace('.pdf', '.txt')}`)
        fs.writeFileSync(out, raw)
        failures.push(`${filename} — JSON parse failed, see ${path.basename(out)}`)
        continue
      }

      // Normalize and auto-correct consumption values
      const normNotes = normalizeConsumption(parsed.consumption, filename)
      if (normNotes.length) {
        console.log('   🔧 Normalized:')
        normNotes.forEach(n => console.log(`      ${n}`))
      }

      // Validate
      const errors = validate(parsed, filename)
      if (errors.length) {
        console.error(`   ❌ Errors:`)
        errors.forEach(e => console.error(`      • ${e}`))
        failures.push(`${filename} — ${errors.length} error(s)`)
      } else {
        const c = parsed.consumption
        const summary = c?.kgPerM2Standard != null
          ? `${c.kgPerM2Standard} kg/m²${c.thicknessStandardMm ? ` @ ${c.thicknessStandardMm}mm` : ''}`
          : c?.kgPerM3 != null ? `${c.kgPerM3} kg/m³`
          : c?.unitsPerM2 != null ? `${c.unitsPerM2} buc/m²`
          : 'consumption extracted'
        console.log(`   ✅ ${parsed.name} — ${summary}`)
      }

      // Always save debug JSON
      const debugOut = path.join(OUTPUT_DIR, `raw-${parsed.id || filename.replace('.pdf', '')}.json`)
      fs.writeFileSync(debugOut, JSON.stringify(parsed, null, 2))
      results.push(parsed)

    } catch (err: any) {
      console.error(`   ❌ ${err.message}`)
      failures.push(`${filename} — ${err.message}`)
    }

    // Pause between calls to stay within rate limits
    if (i < pdfs.length - 1) await new Promise(r => setTimeout(r, 1200))
  }

  // Write output files
  console.log('\n📝 Writing output...')

  if (results.length) {
    const promptFile = path.join(OUTPUT_DIR, `system-prompt-${DATE_STAMP}.md`)
    const kbFile     = path.join(OUTPUT_DIR, `materials-kb-${DATE_STAMP}.ts`)
    fs.writeFileSync(promptFile, generateSystemPrompt(results))
    fs.writeFileSync(kbFile,     generateMaterialsKB(results))
    console.log(`   ✅ ${path.relative(process.cwd(), promptFile)}`)
    console.log(`   ✅ ${path.relative(process.cwd(), kbFile)}`)
  }

  console.log('\n================================')
  console.log(`✅ Success : ${results.length}/${pdfs.length}`)
  if (failures.length) {
    console.log(`❌ Failures: ${failures.length}`)
    failures.forEach(f => console.log(`   • ${f}`))
  }

  console.log(`
📋 Review checklist:
   1. Open data/generated/raw-*.json for each material
      → rawConsumptionFromPDF  — does it match what's in the PDF?
      → consumption.kgPerM2Standard — is the number correct?
      → consumption.conversionNote  — does the math make sense?
   2. Paste system-prompt-${DATE_STAMP}.md into SYSTEM_PROMPT
   3. Paste materials-kb-${DATE_STAMP}.ts into MATERIALS_KB
`)
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1) })
