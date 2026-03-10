# data/pdfs/

Drop PDF technical data sheets here, then run:

```bash
npm run ingest
```

## Recommended PDF sources

| Brand | Where to find PDFs |
|-------|--------------------|
| Knauf | https://www.knauf.ro/produse → each product page → "Fișă tehnică" |
| Ytong / Xella | https://www.ytong.ro/produse |
| LaFarge / Holcim | https://www.lafargeholcim.ro |
| Weber (Saint-Gobain) | https://www.weber.ro/produse |
| Isover | https://www.isover.ro/produse |
| Rockwool | https://www.rockwool.com/ro |
| Mapei | https://www.mapei.com/ro/ro |

## Naming convention (optional but helpful)

Name your PDFs descriptively — the filename is passed to the AI for context:

```
knauf-mp75-tencuiala.pdf
ytong-bca-300mm.pdf
lafarge-ciment-cem2.pdf
weber-adeziv-w300.pdf
```

## After running ingest

Output files appear in `data/generated/`:
- `system-prompt-{date}.md` — copy sections into `lib/materials-data.ts → SYSTEM_PROMPT`
- `materials-kb-{date}.ts`  — copy entries into `lib/materials-data.ts → MATERIALS_KB`
- `raw-{id}.json`           — individual parsed result per PDF (for debugging)

## Tips

- PDFs with selectable text work best (not scanned images)
- If a PDF is scanned, try running it through Adobe Acrobat OCR first
- Max PDF size: 20MB per file
- You can process a single file: `npm run ingest -- --file ./data/pdfs/knauf-mp75.pdf`
