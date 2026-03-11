export const runtime = 'nodejs'

interface WorkItem {
  id:           string
  type:         string
  label:        string
  suprafata:    number
  grosime:      number
  materialId:   string | null
  cantitate:    number
  saci:         number
  pretSac:      number
  pretManopera: number
}

interface DevizPayload {
  items:           WorkItem[]
  clientName:      string
  projectName:     string
  totalMateriale:  number
  totalManopera:   number
  total:           number
}

export async function POST(req: Request) {
  const payload: DevizPayload = await req.json()
  const date = new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const rowsHTML = payload.items.map((item, i) => {
    const totalItem = (item.saci * item.pretSac + item.suprafata * item.pretManopera).toFixed(0)
    return `
      <tr class="item-row">
        <td class="nr">${i + 1}</td>
        <td class="desc">
          <strong>${item.label}</strong>
          ${item.materialId ? `<span class="mat-name">${item.materialId}</span>` : ''}
        </td>
        <td class="center">${item.suprafata} m&sup2;</td>
        <td class="center">${item.grosime > 0 ? item.grosime + ' mm' : '&mdash;'}</td>
        <td class="center">${item.cantitate.toFixed(1)} kg</td>
        <td class="center">${item.saci}</td>
        <td class="right">${item.pretSac > 0 ? item.pretSac + ' RON' : '&mdash;'}</td>
        <td class="right">${item.pretManopera > 0 ? item.pretManopera + ' RON/m&sup2;' : '&mdash;'}</td>
        <td class="right total-col">${totalItem !== '0' ? totalItem + ' RON' : '&mdash;'}</td>
      </tr>`
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
  .item-row td { padding:9px 10px; border-bottom:1px solid #f0ece0; vertical-align:top; }
  .item-row:nth-child(even) td { background:#fdfcf8; }
  .item-row td.nr { color:#888; font-size:10px; width:28px; }
  .item-row td.desc strong { display:block; font-weight:600; }
  .item-row td.desc .mat-name { display:block; font-size:9px; color:#888; margin-top:2px; }
  .item-row td.center { text-align:center; }
  .item-row td.right { text-align:right; }
  .item-row td.total-col { font-weight:700; color:#c9a227; }
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
      <th>Nr.</th><th>Descriere lucrare</th>
      <th class="center">Suprafata</th><th class="center">Grosime</th>
      <th class="center">Cantitate</th><th class="center">Saci</th>
      <th class="right">Pret/sac</th><th class="right">Manopera</th>
      <th class="right">Total</th>
    </tr>
  </thead>
  <tbody>${rowsHTML}</tbody>
</table>
<div class="totals">
  <div class="total-row"><span class="total-label">Total materiale</span><span class="total-value">${payload.totalMateriale.toFixed(0)} RON</span></div>
  <div class="total-row"><span class="total-label">Total manopera</span><span class="total-value">${payload.totalManopera.toFixed(0)} RON</span></div>
  <div class="total-row grand"><span>TOTAL GENERAL</span><span>${payload.total.toFixed(0)} RON</span></div>
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