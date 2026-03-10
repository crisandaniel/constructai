import type { CalcInput, CalcResult, MaterialResult } from '@/types'

export function calculate(input: CalcInput): CalcResult {
  const { workType, suprafata, grosime, inaltime = 2.8, adaos } = input
  const factor = 1 + adaos / 100
  let materials: MaterialResult[] = []
  let title = ''

  switch (workType) {
    case 'zidarie': {
      const buc    = grosime === 25 ? 130 : grosime === 12.5 ? 65 : 32
      const mortar = grosime === 25 ? 0.030 : grosime === 12.5 ? 0.018 : 0.010
      title = `Zidărie ${grosime}cm`
      materials = [
        { material: 'Cărămidă',           quantity: Math.ceil(suprafata * buc * factor),              unit: 'buc' },
        { material: 'Mortar M10',          quantity: parseFloat((suprafata * mortar * factor).toFixed(2)), unit: 'm³', note: '≈ 1:3 ciment:nisip' },
        { material: 'Ciment CEM II 32.5', quantity: Math.ceil(suprafata * mortar * 300 * factor),     unit: 'kg' },
        { material: 'Nisip 0-4mm',         quantity: parseFloat((suprafata * mortar * 1.1 * factor).toFixed(2)), unit: 'm³' },
      ]
      break
    }
    case 'sapa': {
      const vol = suprafata * (grosime / 100)
      title = `Șapă beton ${grosime}cm`
      materials = [
        { material: 'Beton C12/15',          quantity: parseFloat((vol * factor).toFixed(2)),                    unit: 'm³' },
        { material: 'Ciment CEM I 42.5',     quantity: Math.ceil(vol * 260 * factor),                           unit: 'kg' },
        { material: 'Nisip 0-4mm',           quantity: parseFloat((vol * 0.65 * factor).toFixed(2)),             unit: 'm³' },
        { material: 'Plasă sudată Ø4/10×10', quantity: Math.ceil(suprafata * 1.10 * factor),                    unit: 'm²', note: '+10% suprapuneri' },
      ]
      break
    }
    case 'tencuiala': {
      const kgPerM2 = grosime === 1 ? 9 : grosime === 1.5 ? 13 : 17
      title = `Tencuială ${grosime}cm`
      materials = [
        { material: 'Mortar tencuire (saci 25kg)', quantity: Math.ceil(suprafata * kgPerM2 * factor / 25), unit: 'saci', note: `~${Math.ceil(suprafata * kgPerM2 * factor)} kg total` },
        { material: 'Plasă fibră sticlă 160g/m²', quantity: Math.ceil(suprafata * 1.05 * factor),         unit: 'm²' },
        { material: 'Amorsa penetrantă',           quantity: parseFloat((suprafata * 0.15 * factor).toFixed(1)), unit: 'l' },
      ]
      break
    }
    case 'rigips': {
      title = `Sistem rigips ${grosime}mm`
      materials = [
        { material: `Plăci rigips GKB ${grosime}mm`, quantity: Math.ceil(suprafata * 1.04 * factor),           unit: 'm²' },
        { material: 'Profil CW 75mm',                quantity: Math.ceil((suprafata / 0.6) * factor),           unit: 'ml' },
        { material: 'Profil UW 75mm',                quantity: Math.ceil(Math.sqrt(suprafata) * 4 * factor),    unit: 'ml' },
        { material: 'Șuruburi TN 3.5×25mm',          quantity: Math.ceil(suprafata * 22 * factor),              unit: 'buc' },
        { material: 'Bandă îmbinare + Glet',         quantity: Math.ceil(suprafata * 0.3 * factor),             unit: 'kg' },
        { material: 'Vată minerală 5cm',             quantity: Math.ceil(suprafata * 1.02 * factor),            unit: 'm²' },
      ]
      break
    }
    case 'faiance': {
      const pierderi = grosime <= 30 ? 0.13 : grosime <= 60 ? 0.09 : 0.07
      title = `Faianță/Gresie ${grosime}×${grosime}cm`
      materials = [
        { material: `Plăci ceramice ${grosime}×${grosime}cm`, quantity: parseFloat((suprafata * (1 + pierderi + adaos / 100)).toFixed(1)), unit: 'm²', note: `+${Math.round(pierderi * 100)}% pierderi tăiere` },
        { material: 'Adeziv plăci C2',                        quantity: Math.ceil(suprafata * 4.5 * factor),                               unit: 'kg' },
        { material: 'Material rostuire 3mm',                  quantity: Math.ceil(suprafata * 0.45 * factor),                              unit: 'kg' },
        { material: 'Impermeabilizare (băi)',                  quantity: parseFloat((suprafata * 1.5 * factor).toFixed(1)),                 unit: 'kg', note: 'Dacă e baie/zonă umedă' },
      ]
      break
    }
    case 'termoizolatie': {
      title = `Termoizolație EPS ${grosime}cm`
      materials = [
        { material: `Polistiren EPS ${grosime}cm`,    quantity: Math.ceil(suprafata * factor),              unit: 'm²' },
        { material: 'Adeziv EPS (tip C)',              quantity: Math.ceil(suprafata * 4.5 * factor),       unit: 'kg' },
        { material: 'Dibluri cu șaibă Ø8',            quantity: Math.ceil(suprafata * 8 * factor),         unit: 'buc' },
        { material: 'Mortar armare',                   quantity: Math.ceil(suprafata * 4.5 * factor),       unit: 'kg' },
        { material: 'Plasă fibră sticlă 160g/m²',     quantity: Math.ceil(suprafata * 1.10 * factor),      unit: 'm²' },
        { material: 'Tencuială decorativă siliconat',  quantity: Math.ceil(suprafata * 3.5 * factor),       unit: 'kg' },
      ]
      break
    }
  }

  return { title, inputs: input, materials, totalAdaos: adaos, generatedAt: new Date() }
}
