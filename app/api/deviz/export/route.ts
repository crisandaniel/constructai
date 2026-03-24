export const runtime = 'nodejs'

interface SubMaterial {
  id:         string
  name:       string
  cantitate:  number
  unitate:    string
  pretUnitar: number
  custom:     boolean
}

interface WorkItem {
  id:           string
  type:         string
  label:        string
  suprafata:    number
  materials:    SubMaterial[]
  pretManopera: number
}

interface DevizPayload {
  items:          WorkItem[]
  clientName:     string
  projectName:    string
  totalMateriale: number
  totalManopera:  number
  total:          number
}

export async function POST(req: Request) {
  const payload: DevizPayload = await req.json()
  const date = new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const rowsHTML = payload.items.map((item, i) => {
    const totMat = item.materials.reduce((s, m) => s + m.cantitate * m.pretUnitar, 0)
    const totMan = item.suprafata * item.pretManopera
    const totItem = totMat + totMan

    const materialeRows = item.materials
      .filter(m => m.name)
      .map(m => {
        const total = m.cantitate * m.pretUnitar
        return `
          <tr class="mat-row">
            <td></td>
            <td class="mat-name-cell">↳ ${m.name}</td>
            <td class="center">${m.cantitate > 0 ? m.cantitate : '—'} ${m.cantitate > 0 ? m.unitate : ''}</td>
            <td class="right">${m.pretUnitar > 0 ? m.pretUnitar.toFixed(2) + ' RON' : '—'}</td>
            <td class="right">${total > 0 ? total.toFixed(0) + ' RON' : '—'}</td>
          </tr>`
      }).join('')

    return `
      <tr class="item-row">
        <td class="nr">${i + 1}</td>
        <td class="desc"><strong>${item.label}</strong></td>
        <td class="center">${item.suprafata} m&sup2;</td>
        <td class="right">${item.pretManopera > 0 ? item.pretManopera + ' RON/m&sup2;' : '&mdash;'}</td>
        <td class="right total-col">${totItem > 0 ? totItem.toFixed(0) + ' RON' : '&mdash;'}</td>
      </tr>
      ${materialeRows}
      ${totMan > 0 ? `
      <tr class="mat-row manopera-row">
        <td></td>
        <td class="mat-name-cell">↳ Manoperă (${item.suprafata} m² × ${item.pretManopera} RON/m²)</td>
        <td class="center">${item.suprafata} m&sup2;</td>
        <td class="right">${item.pretManopera} RON/m&sup2;</td>
        <td class="right">${totMan.toFixed(0)} RON</td>
      </tr>` : ''}
      <tr class="spacer-row"><td colspan="5"></td></tr>`
  }).join('')

  const html = `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<title>Deviz ConstructAI</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; color:#1a1a1a; background:white; padding:32px; }
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; border-bottom:2px solid #c9a227; padding-bottom:16px; }
  .brand { font-size:22px; font-weight:900; letter-spacing:-0.5px; }
  .brand span { color:#c9a227; }
  .brand-sub { font-size:9px; color:#888; letter-spacing:2px; text-transform:uppercase; margin-top:2px; }
  .meta { text-align:right; }
  .meta-title { font-size:18px; font-weight:700; color:#c9a227; }
  .meta-date { font-size:9px; color:#888; margin-top:2px; }
  .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
  .info-box { background:#f9f8f4; border:1px solid #e8e4d8; border-radius:8px; padding:12px 16px; }
  .info-label { font-size:8px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#888; margin-bottom:4px; }
  .info-value { font-size:12px; font-weight:600; color:#1a1a1a; }
  table { width:100%; border-collapse:collapse; margin-bottom:24px; }
  thead tr { background:#1a1a1a; color:white; }
  thead th { padding:8px 10px; text-align:left; font-size:8px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; }
  thead th.center { text-align:center; }
  thead th.right { text-align:right; }
  .item-row td { padding:9px 10px; background:#fdfcf8; border-top:2px solid #e8e4d8; vertical-align:top; }
  .item-row td.nr { color:#888; font-size:10px; width:28px; }
  .item-row td.desc strong { font-weight:700; font-size:12px; }
  .item-row td.center { text-align:center; }
  .item-row td.right { text-align:right; }
  .item-row td.total-col { font-weight:700; color:#c9a227; }
  .mat-row td { padding:5px 10px 5px 20px; border-bottom:1px solid #f5f2e8; vertical-align:top; font-size:10px; color:#555; }
  .mat-row td.mat-name-cell { color:#444; }
  .mat-row td.center { text-align:center; }
  .mat-row td.right { text-align:right; }
  .manopera-row td { color:#888; font-style:italic; }
  .spacer-row td { padding:4px; }
  .totals { margin-left:auto; width:280px; }
  .total-row { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0ece0; font-size:11px; }
  .total-row.grand { font-size:14px; font-weight:900; color:#c9a227; border-top:2px solid #c9a227; border-bottom:none; padding-top:10px; margin-top:4px; }
  .total-label { color:#555; }
  .total-value { font-weight:600; }
  .footer { margin-top:40px; border-top:1px solid #e8e4d8; padding-top:12px; display:flex; justify-content:space-between; }
  .footer-note { font-size:8px; color:#aaa; max-width:400px; }
  .footer-brand { font-size:8px; color:#c9a227; font-weight:700; letter-spacing:1px; }
  @media print { body { padding:16px; } }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand">Construct<span>AI</span></div>
    <div class="brand-sub">Asistent AI pentru constructii</div>
  </div>
  <div class="meta">
    <div class="meta-title">DEVIZ DE LUCRARI</div>
    <div class="meta-date">Data: ${date}</div>
  </div>
</div>
<div class="info-grid">
  <div class="info-box">
    <div class="info-label">Client</div>
    <div class="info-value">${payload.clientName || 'Nespecificat'}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Proiect / Adresa</div>
    <div class="info-value">${payload.projectName || 'Nespecificat'}</div>
  </div>
</div>
<table>
  <thead>
    <tr>
      <th style="width:28px">Nr.</th>
      <th>Descriere lucrare / Material</th>
      <th class="center" style="width:90px">Cantitate</th>
      <th class="right" style="width:110px">Pret unitar</th>
      <th class="right" style="width:100px">Total</th>
    </tr>
  </thead>
  <tbody>${rowsHTML}</tbody>
</table>
<div class="totals">
  <div class="total-row">
    <span class="total-label">Total materiale</span>
    <span class="total-value">${payload.totalMateriale.toFixed(0)} RON</span>
  </div>
  <div class="total-row">
    <span class="total-label">Total manopera</span>
    <span class="total-value">${payload.totalManopera.toFixed(0)} RON</span>
  </div>
  <div class="total-row grand">
    <span>TOTAL GENERAL</span>
    <span>${payload.total.toFixed(0)} RON</span>
  </div>
</div>
<div class="footer">
  <div class="footer-note">* Deviz generat automat. Valorile sunt estimative si pot varia in functie de conditiile de pe santier.</div>
  <div class="footer-brand">constructai.ro</div>
</div>
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}