// Generated: 2026-03-10T10:59:03.143Z
// Source: 40 PDF(s)
//
// HOW TO USE:
// 1. Review each consumption{} block
//    → "Source" comment shows what was in the PDF
//    → "Note" comment shows how values were derived
// 2. Copy file to /lib
// 3. Add 'consumption' field to MaterialSpec type in types/index.ts

export const GENERATED_MATERIALS = [
  {
    id:          'baudeman-adf27',
    category:    'Adezivi',
    name:        'Baudeman ADF 27 - Adeziv flexibil pentru placi ceramice',
    description: 'Adeziv flexibil pe bază de ciment pentru plăci ceramice, destinat lucrărilor de interior și exterior. Oferă aderență foarte bună, flexibilitate ridicată și este potrivit pentru plăci de dimensiuni mari, gresie porțelanată, gresogranit, clincher, piatră naturală, marmură, inclusiv peste suprafețe netede precum faianță veche, ciment sclivisit și plăci de gipscarton.',
    specs: ['3.75 kg/m²', '6.67 m²/sac 25 kg', 'min +5°C', 'Compoziție: ciment, adaosuri minerale, polimeri, plastificatori', 'Necesar de apă: 0.25–0.27 litri/kg (6.25–6.75 litri/sac)', 'Timp deschis: minim 30 minute', 'Alunecare: maxim 0.5 mm', 'Aplicabilitate după amestecare: 2 ore', 'Consum specific: 2.5–5 kg/m²', 'Temperaturi de exploatare: -25°C la +80°C', 'Standard: SR EN 12004+A1:2012'],
    keyProperties: {
      'Necesar de apă': '0.25–0.27 litri/kg',
      'Timp deschis': 'minim 30 minute',
      'Alunecare': 'maxim 0.5 mm',
      'Consum specific': '2.5–5 kg/m²',
      'Aplicabilitate după amestecare': '2 ore',
      'Grosime aplicare': '4–5 mm',
      'Temperaturi exploatare': '-25°C la +80°C'
    },
    // Source: "CONSUM SPECIFIC: 2.5 - 5 kg/m² în funcţie de calitatea suprafeţei suport si de dimensiunea placilor. Pasta se pune pe su"
    // Note  : PDF: consum 2.5–5 kg/m², media 3.75 kg/m². Grosime aplicare 4–5 mm. Sac 25 kg: la consum minim 2.5 kg/m² → 25/2.5 = 10 m²/sac; la consum maxim 5 kg/m² → 25/5 = 5 m²/sac; la consum mediu 3.75 kg/m² → 25/3.75 ≈ 6.67 m²/sac. Nu se poate calcula kgPerM2PerMm deoarece consumul variază în funcție de dimensiunea plăcilor și calitatea suportului, nu doar de grosime.
    consumption: {
      kgPerM2Standard:     3.75,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      4,
      thicknessMaxMm:      5,
      m2PerPackage:        6.67,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'mapei-keraflex-extra-s1',
    category:    'Adezivi',
    name:        'Keraflex Extra S1',
    description: 'Adeziv pe bază de ciment, de înaltă performanță, deformabil (S1), tixotropic, cu timp deschis extins, pentru lipirea plăcilor ceramice și a pietrei naturale pe suprafețe orizontale și verticale. Clasificat C2TE S1 conform EN 12004.',
    specs: ['2.75 kg/m²', '9.09 m²/sac 25 kg', 'min +5°C', 'Clasificare EN 12004: C2TE S1', 'Aderență inițială: 2,5 N/mm²', 'Aderență după expunere la căldură: 2,3 N/mm²', 'Aderență după imersie în apă: 1,1 N/mm²', 'Aderență după cicluri îngheț-dezgheț: 1,3 N/mm²', 'Deformabilitate: S1 (δ > 2,5 mm)', 'Timp deschis: aprox. 30 minute', 'Timp de corecție: aprox. 45-60 minute', 'EMICODE: EC1 R Plus - emisii foarte scăzute', 'Reacție la foc: A2FL-s1 / A2-s1, d0'],
    keyProperties: {
      'Clasificare EN 12004': 'C2TE S1',
      'Aderență inițială': '2,5 N/mm²',
      'Aderență după căldură': '2,3 N/mm²',
      'Aderență după imersie în apă': '1,1 N/mm²',
      'Aderență după îngheț-dezgheț': '1,3 N/mm²',
      'Deformabilitate': 'S1 (δ > 2,5 mm)',
      'Timp deschis': 'aprox. 30 minute',
      'Timp de corecție': 'aprox. 45-60 minute',
      'Durată amestec (pot life)': '4 ore',
      'pH amestec': '12',
      'Greutate specifică amestec': '1.550 kg/m³',
      'Greutate specifică pulbere': '1,4 g/cm³',
      'Rezistență la temperatură': '-30°C până la +90°C',
      'EMICODE': 'EC1 R Plus'
    },
    // Source: "CONSUM\nMontarea plăcilor ceramice\n– Mozaic și plăcuțe format mic (spatula Nr. 4): 2 kg/m²\n– Placi dimensiuni normale (sp"
    // Note  : Consum variabil în funcție de dimensiunea plăcilor: mozaic/format mic (spatula Nr. 4) = 2 kg/m² → 25/2 = 12,5 m²/sac; plăci dimensiuni normale (spatula Nr. 5) = 2,5-3 kg/m² (medie 2,75 kg/m²) → 25/2,75 = 9,09 m²/sac; plăci format mare/pardoseli exterioare (spatula Nr. 8-10) = 5 kg/m² → 25/5 = 5 m²/sac. Valoarea standard setată la media pentru plăci normale (2,75 kg/m²). Lipire materiale izolante: spume 0,5-0,8 kg/m², plăci fibrociment/beton celular 1,5 kg/m².
    consumption: {
      kgPerM2Standard:     2.75,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        9.09,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'mapei-keraflex-maxi-s1-zero',
    category:    'Adezivi',
    name:        'Keraflex Maxi S1 Zero',
    description: 'Adeziv pe bază de ciment, de înaltă performanță, de culoare gri, cu timp deschis extins și fără alunecare pe verticală, cu tehnologie Low Dust, cu emisii foarte scăzute de compuși organici volatili și cu emisii de gaze cu efect de seră compensate. Clasificat C2TE S1 conform EN 12004. Recomandat în special pentru montarea plăcilor de mari dimensiuni din gresie porțelanată și piatră naturală.',
    specs: ['1.2 kg/m² la 1mm', '20.83 m²/sac 25 kg', 'min +5°C', 'Clasificare EN 12004: C2TE S1', 'ISO 13007-1: C2TE S1', 'EMICODE: EC1 Plus - emisii foarte scăzute', 'Tehnologie Low Dust', 'CO2 Fully Offset in the Entire Life Cycle', 'EPD nr. S-P-00907'],
    keyProperties: {
      'Culoare': 'gri',
      'Consistență': 'pulbere',
      'Greutate specifică': '1400 kg/m³',
      'Densitate amestec': '1550 kg/m³',
      'pH amestec': 'mai mare de 12',
      'Consum': '1,2 kg/m² pe mm de grosime',
      'Timp deschis': '> 30 minute',
      'Timp de corecție': 'circa 45 minute',
      'Aderență inițială (28 zile)': '2,6 N/mm²',
      'Aderență după expunere la căldură': '2,5 N/mm²',
      'Aderență după imersie în apă': '1,1 N/mm²',
      'Aderență după cicluri îngheț-dezgheț': '1,3 N/mm²',
      'Deformabilitate': 'S1 (> 2,5 mm, < 5 mm)',
      'Temperatură în exploatare': '-30°C până la +90°C',
      'Grosime maximă de aplicare': '15 mm',
      'Raport amestec': '7,3-7,8 litri apă / 25 kg sac'
    },
    // Source: "CONSUM: 1,2 kg/m² pe mm de grosime."
    // Note  : PDF: 1,2 kg/m² pe mm de grosime. La 1 mm grosime: 1,2 kg/m². kgPerM2PerMm = 1,2. Exemple: la 5 mm grosime → 6,0 kg/m² → 25/6,0 = 4,17 m²/sac; la 10 mm → 12,0 kg/m² → 25/12 = 2,08 m²/sac; la 15 mm → 18,0 kg/m² → 25/18 = 1,39 m²/sac. m2PerPackage variază în funcție de grosime, nu se poate seta o valoare fixă.
    consumption: {
      kgPerM2Standard:     1.2,
      kgPerM2PerMm:        1.2,
      thicknessStandardMm: 1,
      thicknessMinMm:      null,
      thicknessMaxMm:      15,
      m2PerPackage:        20.83,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-baumacol-flexmarmor',
    category:    'Adezivi',
    name:        'Baumit Baumacol FlexMarmor',
    description: 'Adeziv flexibil superior alb, sub formă de pulbere, pe bază de ciment alb, netoxic, rezistent la apă și îngheț, clasificare C2TE S1 conform SR EN 12004. Destinat lipirii plăcilor de marmură, piatră naturală și placaje ceramice la interior și exterior, cu grosime de aplicare variabilă între 3-20 mm.',
    specs: ['3 kg/m²', '8.3 m²/sac 25 kg', 'min +5°C', 'Clasificare C2TE S1 conform SR EN 12004', 'Culoare alb', 'Grosime aplicare: 3-20 mm', 'Granulă maxim 0.6 mm', 'Timp de lucrabilitate: aprox. 4 ore', 'Timp deschis: max. 30 min', 'Timp de corecție: aprox. 5 min', 'Rezistent la apă și îngheț', 'EC1 - emisii foarte scăzute'],
    keyProperties: {
      'Clasificare': 'C2TE S1',
      'Culoare': 'alb',
      'Granulă maximă': '0.6 mm',
      'Grosime minimă strat': '3 mm',
      'Grosime maximă strat': '20 mm',
      'Timp de lucrabilitate': 'aprox. 4 ore',
      'Timp deschis': 'max. 30 min',
      'Timp de corecție': 'aprox. 5 min',
      'Timp de așteptare': 'max. 5 min',
      'Solicitare pas': 'după 24 ore',
      'Necesar apă': 'aprox. 7.5 l/sac',
      'Consum': '3-5 kg/m²'
    },
    // Source: "Consum 3 - 5 kg/m² functie de tipul si dimensiunea placajului ceramic, rugozitatea suportului si tipul gletierei\n\nTile s"
    // Note  : PDF indică consum 3-5 kg/m² (tehnica simplă TS, acoperire 75%). Tabel detaliat EN: 10x10cm→1.6 kg/m², 15x15→2.0, 25x25→2.5, 35x35→3.0 kg/m². Tehnica dublă TD: 4-6 kg/m². Folosim 3.0 kg/m² ca valoare standard medie (plăci 35x35, TS). m²/sac = 25/3.0 = 8.3 m²/sac. Consumul variază în funcție de dimensiunea plăcii, gleteră și tehnica de aplicare.
    consumption: {
      kgPerM2Standard:     3,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      3,
      thicknessMaxMm:      20,
      m2PerPackage:        8.3,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'mapei-granirapid',
    category:    'Adezivi',
    name:        'Granirapid',
    description: 'Adeziv bicomponent pe bază de ciment, de înaltă performanță, deformabil, cu priză și hidratare rapidă, pentru plăci ceramice și din piatră naturală. Clasificat C2F S1 conform EN 12004. Apt pentru trafic pietonal în doar 3-4 ore și gata de utilizare în 24 ore.',
    specs: ['4 kg/m²', '7 m²/kit 28 kg (sac 22,5 kg comp. A + bidon 5,5 kg comp. B)', 'min +5°C', 'Clasificare EN 12004: C2F S1', 'Adeziv bicomponent (pulbere + latex cauciuc sintetic)', 'Aderență inițială conform EN 1348: 2,5 N/mm²', 'Rezistență la compresiune la 28 zile: 20,0 N/mm²', 'Rezistență la încovoiere la 28 zile: 6,0 N/mm²', 'Timp deschis conform EN 1346: circa 20 minute', 'Timp de priză: circa 2 ore', 'Temperatură în exercițiu: de la -30°C la +90°C', 'EMICODE: EC1 Plus – emisii foarte scăzute', 'Certificat MED pentru industria navală'],
    keyProperties: {
      'Clasificare EN 12004': 'C2F S1',
      'Aderență inițială (28 zile)': '2,5 N/mm²',
      'Aderență după expunere la căldură': '2,2 N/mm²',
      'Aderență după imersie în apă': '1,3 N/mm²',
      'Aderență după cicluri îngheț-dezgheț': '1,4 N/mm²',
      'Rezistență la compresiune 28 zile': '20,0 N/mm²',
      'Rezistență la încovoiere 28 zile': '6,0 N/mm²',
      'Masă volumică amestec': '1600 kg/m³',
      'Durată amestec la +20°C': '45 minute',
      'Timp deschis': 'circa 20 minute',
      'Timp de priză': 'circa 2 ore',
      'Apt trafic pietonal': 'după 3-4 ore',
      'Gata de utilizare': 'după 24 ore',
      'Temperatură în exercițiu': 'de la -30°C la +90°C',
      'Deformabilitate': 'S1 - deformabil',
      'pH amestec': 'circa 11'
    },
    // Source: "Mozaic si placute mici in general (spatula nr. 4): 2,5-3 kg/m²; dimensiuni normale (spatula nr. 5): 3,5-4 kg/m²; dimensi"
    // Note  : Consumul variază în funcție de spatulă: 2,5-3 kg/m² (spatula nr. 4, mozaic), 3,5-4 kg/m² (spatula nr. 5, dimensiuni normale), 5-6 kg/m² (spatula nr. 6, dimensiuni mari/exterior), 8+ kg/m² (spatula nr. 10, plăci mari/suport neregulat). Valoarea standard de 4 kg/m² corespunde spatulei nr. 5 pentru plăci de dimensiuni normale. Kit 28 kg / 4 kg/m² = 7 m²/kit.
    consumption: {
      kgPerM2Standard:     4,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        7,
      packageDescription:  'kit 28 kg (sac 22,5 kg comp. A + bidon 5,5 kg comp. B)',
      packageSize:         28,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'ceresit-cm9-adeziv-standard-placi-ceramice-interior',
    category:    'Adezivi',
    name:        'Ceresit CM 9 - Adeziv standard pentru plăci ceramice la interior',
    description: 'Adeziv pe bază de ciment pentru lipirea plăcilor ceramice absorbante la interior, în pat subțire și mediu. Ideal pentru suprafețe neregulate, economic, pentru grosimi de la 5 la 15 mm. Se utilizează numai pentru plăci ceramice cu absorbție de apă mai mare de 3% (E>3%).',
    specs: ['4.3 kg/m²', '5.81 m²/sac 25 kg', 'min +5°C', 'Clasificare C1T conform EN 12004-1:2017', 'Aderență ≥ 0,5 N/mm² (C1)', 'Alunecare ≤ 0,5 mm (T)', 'Grosimi de aplicare 5-15 mm', 'Pentru plăci ceramice absorbante gr. BIIa, BIIb, BIII'],
    keyProperties: {
      'Bază': 'combinație de ciment cu compuși minerali și modificatori',
      'Densitate': '1,44 kg/dm³',
      'Proporția amestecului': 'cca. 6 l apă pentru 25 kg',
      'Timp de punere în operă': 'până la 3 ore (minimum 90 minute)',
      'Temperatură de punere în operă': 'de la +5°C până la +30°C',
      'Timp deschis': '≤ 20 min',
      'Timp de maturare': '5 min',
      'Alunecare': '≤ 0,5 mm',
      'Rostuire': 'după 24 de ore',
      'Timp de ajustabilitate': 'cca. 15 min',
      'Aderență în mediu uscat': '≥ 0,7 N/mm²',
      'Aderență în mediu umed': '≥ 0,5 N/mm²'
    },
    // Source: "Consum orientativ:\nPlaca/Mărimea dinților mistriei (mm) | Consum CM 9 (kg/m²)\n15x15/6 | 2,1\n20x20/8 | 3\n30x30/10 | 4,3\n≥"
    // Note  : Consumul variază în funcție de dimensiunea dinților mistriei: 2,1 kg/m² (dinți 6mm), 3 kg/m² (dinți 8mm), 4,3 kg/m² (dinți 10mm), 6 kg/m² (dinți 15mm). Valoare de referință aleasă: 4,3 kg/m² pentru plăci 30x30 cu mistrie dinți 10mm. m2PerPackage = 25/4,3 = 5,81 m²/sac. Consumul nu este direct proporțional cu grosimea stratului ci depinde de mărimea dinților mistriei, deci kgPerM2PerMm nu se poate calcula corect.
    consumption: {
      kgPerM2Standard:     4.3,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      5,
      thicknessMaxMm:      15,
      m2PerPackage:        5.81,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-baumacol-basic',
    category:    'Adezivi',
    name:        'Baumit Baumacol Basic',
    description: 'Adeziv în pat subțire pentru gresie și faianță la interior, sub formă de pulbere, netoxic, cu stabilitate ridicată, clasa C1T conform SR EN 12004. Se utilizează pentru lipirea plăcilor ceramice cu dimensiunea de până la 900 cm² și latura ≤ 30 cm, cu absorbție de apă începând cu grupa BII (E>3%), pe suporturi minerale.',
    specs: ['4 kg/m²', '6.25 m²/sac 25kg', 'min +5°C', 'Clasa C1 T conform SR EN 12004', 'Culoare: gri', 'Granulă maxim 0.6 mm', 'Grosime maximă strat: 5 mm', 'Timp de lucrabilitate: aprox. 4 ore', 'Timp deschis: aprox. 30 min', 'Timp de corecție: aprox. 5 min', 'Solicitare pas: după 24 ore'],
    keyProperties: {
      'Clasificare': 'C1 T',
      'Standard': 'SR EN 12004',
      'Culoare': 'gri',
      'Granulă maximă': '0.6 mm',
      'Grosime maximă strat': '5 mm',
      'Timp de lucrabilitate': 'aprox. 4 ore',
      'Timp deschis': 'aprox. 30 min',
      'Timp de așteptare': 'aprox. 5 min',
      'Timp de amestecare': 'aprox. 3-5 min',
      'Timp de corecție': 'aprox. 5 min',
      'Solicitare pas': 'după 24 ore',
      'Necesar apă': 'aprox. 7 l/sac'
    },
    // Source: "Consum aprox. 3 - 5 kg/m² functie de tipul si dimensiunea placajului ceramic, rugozitatea suportului si tipul gletierei"
    // Note  : PDF indică consum aprox. 3-5 kg/m² în funcție de dimensiunea plăcii, rugozitatea suportului și tipul gletierei. Valoare medie adoptată: 4.0 kg/m². m2PerPackage = 25 / 4.0 = 6.25 m²/sac (valoare medie). La consum minim (3 kg/m²): 25/3 = 8.33 m²/sac. La consum maxim (5 kg/m²): 25/5 = 5.0 m²/sac. Grosimea stratului nu este specificată explicit pentru consum, dar grosimea maximă a stratului este 5 mm.
    consumption: {
      kgPerM2Standard:     4,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      5,
      m2PerPackage:        6.25,
      packageDescription:  'sac 25kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'etalon-adeziv-faianta-interior-standard',
    category:    'Adezivi',
    name:        'Adeziv faianță interior standard',
    description: 'Adeziv pe bază de ciment, clasa C1T, pentru placare ceramică (gresie și faianță) la interior, în strat subțire, pe suporturi minerale cu absorbție. Se aplică pe tencuială ciment și var-ciment, BCA tencuit, beton și șape pe bază de ciment. Nu se utilizează pe gipscarton, lemn, plastic sau metal.',
    specs: ['3.5 kg/m²', '7.14 m²/sac 25kg', 'min +5°C', 'Clasa adeziv: C1T conform SR EN 12004+A1/2012', 'Aderență inițială prin tracțiune: minim 0,5 N/mm²', 'Aderență după imersare în apă: minim 0,5 N/mm²', 'Alunecare: maxim 0,5 mm', 'Timp de găleată: cca. 2 ore', 'Timp deschis: 15-20 minute', 'Dimensiune maximă plăci: 900 cm²', 'Consum: cca. 3-4 kg/m²'],
    keyProperties: {
      'Clasa adeziv': 'C1T conform SR EN 12004+A1/2012',
      'Aderență inițială': 'minim 0,5 N/mm²',
      'Aderență după imersare': 'minim 0,5 N/mm²',
      'Alunecare': 'maxim 0,5 mm',
      'Timp de găleată': 'cca. 2 ore',
      'Timp deschis': '15-20 minute',
      'Consum': 'cca. 3-4 kg/m²',
      'Temperatură aplicare': '+5°C ... +30°C',
      'Baza materialului': 'ciment, agregate minerale, polimeri, plastificatori'
    },
    // Source: "Consum: cca. 3 - 4 kg / m²"
    // Note  : PDF indică consum cca. 3-4 kg/m². Valoare medie: 3.5 kg/m². Sac 25 kg → 25/3.5 = 7.14 m²/sac. Grosimea stratului aplicat este 4-5 mm (conform secțiunea Punere în operă), dar consumul depinde de dimensiunea dinților gletieriei (6-8 mm) și de dimensiunea plăcilor. Nu se poate calcula kgPerM2PerMm deoarece consumul nu variază liniar cu grosimea în aplicații de adeziv strat subțire.
    consumption: {
      kgPerM2Standard:     3.5,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      4,
      thicknessMaxMm:      5,
      m2PerPackage:        7.14,
      packageDescription:  'sac 25kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'holcim-ecoplanet-plus-cem-ii-bm-v-ll-42-5r',
    category:    'Beton',
    name:        'ECOPlanet PLUS CEM II/BM(V-LL) 42,5R',
    description: 'Ciment Portland compozit, aditivat cu Duraditiv, cu performanță ridicată și amprentă redusă de CO2 (30% mai puține emisii). Primul ciment verde însăcuit din România, ideal pentru construcții rezidențiale, comerciale și industriale, inclusiv lucrări de renovare și modernizare.',
    specs: ['229 kg/m³', 'min +5°C', 'CEM II/BM(V-LL) 42,5R', 'Clincher (K): 65÷79%', 'Cenușă zburătoare silicioasă (V) și calcar (LL): 21÷35%', 'Componente auxiliare minore: 0÷5%', 'Timp inițial de priză: min. 60 min', 'Stabilitate (expansiune): max. 10 mm', 'Rezistență la compresiune inițială: min. 20 MPa', 'Rezistență la compresiune standard: min. 42,5 / max. 62,5 MPa', 'Conținut de sulfați (SO3): max. 4,0%', 'Conținut de cloruri: max. 0,1%', 'Conținut de crom hexavalent: max. 0,0002%', '30% mai puține emisii de CO2', 'Clasă climatică A', 'Conține până la 18% materiale reciclate'],
    keyProperties: {
      'Tip ciment': 'CEM II/BM(V-LL) 42,5R',
      'Clincher': '65÷79%',
      'Cenușă zburătoare și calcar': '21÷35%',
      'Timp inițial de priză': 'min. 60 min',
      'Stabilitate (expansiune)': 'max. 10 mm',
      'Rezistență compresiune inițială': 'min. 20 MPa',
      'Rezistență compresiune standard': 'min. 42,5 / max. 62,5 MPa',
      'Sulfați (SO3)': 'max. 4,0%',
      'Cloruri': 'max. 0,1%',
      'Crom hexavalent': 'max. 0,0002%',
      'Termen de valabilitate': '90 zile',
      'Reducere emisii CO2': '30%'
    },
    // Source: "REȚETE orientative de preparare betoane cu ECOPlanet PLUS (pentru un sac de ciment):\n\nC8/10 (B150): 1 sac = 20 kg → Apă "
    // Note  : Produs volumetric (ciment pentru beton). Dozaje variază per clasă de beton: C8/10: 1 sac 40kg → 0,175 m³ beton → ~229 kg ciment/m³. C16/20: 1 sac 40kg → 0,143 m³ → ~280 kg/m³. C30/37: 1 sac 40kg → 0,092 m³ → ~435 kg/m³. kgPerM3 setat la 229 kg/m³ pentru C8/10 ca referință minimă. Pentru C16/20 dozajul este ~280 kg/m³, iar pentru C30/37 ~435 kg/m³.
    consumption: {
      kgPerM2Standard:     null,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        null,
      packageDescription:  'sac 20 kg sau 40 kg',
      packageSize:         40,
      packageUnit:         'kg',
      kgPerM3:             229,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'holcim-extradur-52',
    category:    'Beton',
    name:        'ExtraDur 52® CEM II/A-S 52,5R',
    description: 'Ciment de înaltă rezistență dezvoltat pentru betoane extradure, cu rezistențe inițiale mari într-un timp scurt. Ideal pentru producția de elemente prefabricate (pavele, borduri, dale, elemente gard), betoane armate de clasele C30/37 - C50/60, reparații speciale și mortare de injectare. Conține până la 18% materiale reciclate.',
    specs: ['385 kg/m³', 'min +0°C', 'Rezistență la compresiune inițială: min. 30 MPa', 'Rezistență la compresiune standard: min. 52,5 MPa', 'Timp inițial de priză: min. 45 minute', 'Stabilitate (expansiune): max. 10 mm', 'Conținut SO₃: max. 4%', 'Conținut cloruri: max. 0,1%', 'Conținut crom hexavalent: max. 0,0002%', 'Clincher (K): 80-94%', 'Zgură de furnal (S): 6-20%', 'Componente auxiliare minore: 0-5%', 'Clasa climatică: B (Eticheta Verde Holcim)'],
    keyProperties: {
      'Rezistență compresiune inițială': 'min. 30 MPa',
      'Rezistență compresiune standard': 'min. 52,5 MPa',
      'Timp inițial de priză': 'min. 45 min',
      'Stabilitate (expansiune)': 'max. 10 mm',
      'Conținut SO₃': 'max. 4%',
      'Conținut cloruri': 'max. 0,1%',
      'Clincher': '80-94%',
      'Zgură de furnal': '6-20%',
      'Clase beton armat recomandate': 'C30/37 ... C50/60',
      'Clase beton ușor recomandate': 'L16/18 ... L45/50',
      'Clase micro beton recomandate': 'C25/30 ... C50/60'
    },
    // Source: "REȚETE orientative de preparare betoane: Pavele C30/37: 1 sac=20kg, Apă 1.1 găleată, Nisip 0-4mm 10.5 lopați/2.7 găleți,"
    // Note  : Produs volumetric (ciment). Din rețetele orientative: 1 sac 20kg produce între 0.046 mc (C40/50) și 0.054 mc (C30/37 armat). Pentru C30/37 armat: 20kg/0.054mc ≈ 370 kg/m³. Pentru C40/50: 20kg/0.046mc ≈ 435 kg/m³. Valoare medie orientativă ~385 kg/m³. Consumul exact depinde de clasa betonului.
    consumption: {
      kgPerM2Standard:     null,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        null,
      packageDescription:  'sac 20 kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             385,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'apla-aplafill-exterior',
    category:    'Finisaje',
    name:        'AplaFill Exterior - Glet pe bază de ciment alb, pentru exterior',
    description: 'Mortar fin de uz general pe bază de ciment alb aditivat cu silicon, rășini și fibre sintetice, destinat nivelării și finisajului suprafețelor minerale la exterior și în spații cu umiditate mare. Produs de tip 2-în-1, adaptat atât pentru nivelare cât și pentru finisaj, creând o suprafață de un alb imaculat, netedă și fără pori.',
    specs: ['0.8 kg/m² la 1mm', '25 m²/sac 20kg / sac 5kg', 'min +8°C', 'Clasificare SR EN 998-1: GP A1 CS3 W2 Aderența 0,5 FP:B', 'Rezistența la compresiune: CS 3 (3,5-7,5 N/mm²)', 'Aderență la suport din beton: ≥ 0,5 N/mm², FP:B (rupere în mortar)', 'Absorbție de apă prin capilaritate: W2 (≤ 0,2 kg/m²min^1/2)', 'Permeabilitate la vaporii de apă: µ ≤ 20', 'Densitatea aparentă a mortarului întărit: 1200-1300 kg/m³', 'Clasa de reacție la foc: A1 (incombustibil)'],
    keyProperties: {
      'Bază': 'Ciment alb aditivat cu silicon, rășini și fibre sintetice',
      'Rezistență la compresiune': 'CS 3 (3,5-7,5 N/mm²)',
      'Aderență la beton': '≥ 0,5 N/mm²',
      'Absorbție apă capilaritate': 'W2 (≤ 0,2 kg/m²min^1/2)',
      'Permeabilitate vapori': 'µ ≤ 20',
      'Densitate mortar întărit': '1200-1300 kg/m³',
      'Reacție la foc': 'A1',
      'Proporție apă/sac 20 kg': '8 litri',
      'Lucrabilitate': 'cca. 4 ore de la prepararea cu apă',
      'Timp uscare șlefuire': 'cca. 6 ore (grosime 1 mm, la 20°C și umiditate 50%)',
      'Timp maturare vopsire': '2-7 zile'
    },
    // Source: "Consum standard (grosime de 1 mm): 0,8 kg/m²; Randament teoretic: 1,25 m²/kg; Consumul standard este de 0,8 kg/m² in str"
    // Note  : PDF: consum standard 0,8 kg/m² la grosime 1 mm. kgPerM2PerMm = 0,8/1 = 0,8. Sac 20kg: 20/0,8 = 25 m²/sac la 1 mm. Sac 5kg: 5/0,8 = 6,25 m² ≈ 6 m²/sac. Randament teoretic: 1,25 m²/kg = 1/1,25 = 0,8 kg/m² confirmă.
    consumption: {
      kgPerM2Standard:     0.8,
      kgPerM2PerMm:        0.8,
      thicknessStandardMm: 1,
      thicknessMinMm:      1,
      thicknessMaxMm:      4,
      m2PerPackage:        25,
      packageDescription:  'sac 20kg / sac 5kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-glemabrillant',
    category:    'Finisaje',
    name:        'Baumit GlemaBrillant',
    description: 'Glet pe bază de ciment alb și adaosuri minerale pentru obținerea unor suprafețe netede pe pereți și plafoane la interior și exterior, cu finețe și grad de alb foarte ridicat. Se aplică manual și mecanizat.',
    specs: ['1.1 kg/m² la 1mm', '20 m²/sac 20 kg', 'min +5°C', 'Grupa Mortare: CS III', 'Standard: SR EN 998-1', 'Clasificare: GP-CS III-Wc1', 'Granulă maxim: 0.1 mm', 'Densitate: 930 kg/m³', 'Conductivitate termică: ≤ 0.43 W/mK', 'Timp de uscare: 24 ore', 'Grosime maximă strat: 3 mm', 'Grosime minimă aplicare: 0.1 mm', 'Timp de păstrare în vas: până la 5 ore'],
    keyProperties: {
      'Grupa Mortare': 'CS III',
      'Standard': 'SR EN 998-1',
      'Clasificare': 'GP-CS III-Wc1',
      'Granulă maximă': '0.1 mm',
      'Densitate': '930 kg/m³',
      'Conductivitate termică': '≤ 0.43 W/mK',
      'Timp de uscare': '24 ore',
      'Grosime maximă strat': '3 mm',
      'Grosime minimă aplicare': '0.1 mm',
      'Rezistența la compresiune la 28 zile': 'CS III',
      'Timp de păstrare în vas': 'până la 5 ore',
      'Necesar apă': '8 l/Sac'
    },
    // Source: "Consum: 1 - 1.2 kg/m²/mm | Acoperire: 20 m²/Sac /mm grosime | Grosime minimă de aplicare: 0.1 mm | Grosimea maximă a str"
    // Note  : PDF: Consum 1 - 1.2 kg/m²/mm. Valoare medie = 1.1 kg/m²/mm. Acoperire: 20 m²/Sac/mm grosime, adică la 1 mm grosime un sac de 20 kg acoperă 20 m² → 20/20 = 1.0 kg/m² (corespunde limitei inferioare). kgPerM2PerMm = 1.1 (medie). La 1 mm: 1.1 kg/m², sac 20 kg → 20/1.1 ≈ 18.2 m²/sac. PDF indică 20 m²/sac/mm.
    consumption: {
      kgPerM2Standard:     1.1,
      kgPerM2PerMm:        1.1,
      thicknessStandardMm: 1,
      thicknessMinMm:      0.1,
      thicknessMaxMm:      3,
      m2PerPackage:        20,
      packageDescription:  'sac 20 kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'apla-aplafill-incarcare',
    category:    'Finisaje',
    name:        'AplaFill Încărcare',
    description: 'Glet de încărcare pe bază de ipsos, aditivi și combinație de pulbere de marmură și calcită, utilizat la interiorul clădirilor civile și industriale pentru nivelarea grosieră a pereților sau tavanelor. Oferă super-lucrabilitate, grad sporit de alb și permite încărcări în straturi de până la 15 mm pe strat.',
    specs: ['4 kg/m² la 4mm', '5 m²/sac 20kg / sac 25kg', 'min +5°C', 'Bază de ipsos cu aditivi și pulbere de marmură și calcită', 'Grosime strat: 2–15 mm', 'Rezistență la compresiune după 28 zile: cca. 3,0 N/mm²', 'Rezistență la încovoiere după 28 zile: cca. 1,5 N/mm²', 'Aderență la suport din beton: cca. 0,4 N/mm²', 'Clasa de reacție la foc: A1 – incombustibil', 'Timp de lucru (început de priză): cca. 50–60 min', 'Timp de întărire (sfârșit de priză): cca. 120 min', 'Încadrare SR EN 13279-1: Tencuială de ipsos pentru interior B3/60/2'],
    keyProperties: {
      'Bază': 'Ipsos, aditivi, pulbere de marmură și calcită',
      'Grosime strat': '2–15 mm',
      'Consum orientativ': '0,8–3 kg/m²',
      'Consum standard': '0,8 kg/m² la 1 mm grosime',
      'Rezistență la compresiune (28 zile)': 'cca. 3,0 N/mm²',
      'Rezistență la încovoiere (28 zile)': 'cca. 1,5 N/mm²',
      'Aderență la suport beton': 'cca. 0,4 N/mm²',
      'Timp de lucru': 'cca. 50–60 min',
      'Timp de întărire': 'cca. 120 min',
      'Timp de uscare (5 mm)': 'min. 2 zile',
      'Timp de maturare completă': '7 zile',
      'Clasă reacție la foc': 'A1 – incombustibil',
      'Standard': 'SR EN 13279-1'
    },
    // Source: "Consum orientativ de glet: 0,8 – 3 kg/m² (în funcție de grosimea stratului aplicat). Consumul standard este de 0,8 kg/m²"
    // Note  : PDF: consum standard 0,8 kg/m² la 1 mm grosime. La 4 mm → 0,8 × 4 = 3,2 kg/m² (PDF declară 4 kg/m² la 4 mm, incluzând pierderi). Sac 20 kg → 20/4 = 5 m²/sac. kgPerM2PerMm = 0,8 kg/m²/mm conform declarație fabricant.
    consumption: {
      kgPerM2Standard:     4,
      kgPerM2PerMm:        1,
      thicknessStandardMm: 4,
      thicknessMinMm:      2,
      thicknessMaxMm:      15,
      m2PerPackage:        5,
      packageDescription:  'sac 20kg / sac 25kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-finogrande',
    category:    'Finisaje',
    name:        'Baumit FinoGrande',
    description: 'Glet pe bază de ipsos pentru interior, destinat egalizării suprafețelor și obținerii de suprafețe netede pe pereți și plafoane. Se aplică în grosimi de 2-6 mm, fiind utilizabil atât ca glet de încărcare cât și ca glet de finisare.',
    specs: ['1 kg/m² la 1mm', '20 m²/sac 20 kg', 'min +5°C', 'Standard: SR EN 13279-1:2009', 'Clasificare: B1/20/2', 'Grosime aplicare: 2-6 mm', 'Timp de păstrare în vas: 60 min', 'Densitate: 920 kg/m³', 'Rezistența la încovoiere la 28 zile: > 1 N/mm²', 'Rezistența la compresiune la 28 zile: > 2 N/mm²', 'Timp de uscare: 24 ore / 3 mm grosime'],
    keyProperties: {
      'Standard': 'SR EN 13279-1:2009',
      'Clasificare': 'B1/20/2',
      'Grosime minimă aplicare': '2 mm',
      'Grosime maximă strat': '6 mm',
      'Consum': '1 kg/m²/mm',
      'Densitate': '920 kg/m³',
      'Rezistența la încovoiere (28 zile)': '> 1 N/mm²',
      'Rezistența la compresiune (28 zile)': '> 2 N/mm²',
      'Timp de păstrare în vas': '60 min',
      'Timp de uscare': '24 ore / 3 mm grosime'
    },
    // Source: "Consum: 1 kg/m²/mm | Acoperire: 20 m² /1 mm grosime | Necesar apă: aprox. 10 l/Sac | FinoGrande_20 kg | Grosime minimă d"
    // Note  : PDF: Consum 1 kg/m²/mm. Acoperire 20 m² la 1 mm grosime (sac 20 kg). La grosimea minimă de 2 mm: 2 kg/m², m²/sac = 20/2 = 10 m². La grosimea maximă de 6 mm: 6 kg/m², m²/sac = 20/6 = 3.33 m².
    consumption: {
      kgPerM2Standard:     1,
      kgPerM2PerMm:        1,
      thicknessStandardMm: 1,
      thicknessMinMm:      2,
      thicknessMaxMm:      6,
      m2PerPackage:        20,
      packageDescription:  'sac 20 kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'ceresit-ct126-glet-interior-1',
    category:    'Finisaje',
    name:        'Ceresit CT 126 Glet pentru interior',
    description: 'Glet pe bază de ipsos aditivat pentru interior, destinat egalizării suprafețelor tencuite și din beton, pentru denivelări de la 2 la 10 mm. Oferă un finisaj alb mat de foarte bună calitate, cu rezistență la fisurare în strat gros.',
    specs: ['1.2 kg/m² la 1mm', '16.67 m²/sac hârtie 20kg / sac plastic 5kg', 'min +5°C', 'Straturi de până la 10 mm într-un singur strat', 'Rezistență mare în timp scurt', 'Grad mare de aderență', 'Finisaj alb mat de foarte bună calitate', 'Rezistență la fisurare în strat gros', 'Permite lipirea plăcilor de gips carton pe suprafețe verticale'],
    keyProperties: {
      'Compoziție': 'amestec de ipsos cu compuși minerali și aditivi',
      'Densitate': 'aprox. 0,9 kg/dm³',
      'Consum orientativ': '1,2 kg/m²/mm',
      'Aderență la suport': '≥ 0,4 N/mm²',
      'Rezistență la încovoiere': '≥ 1 N/mm²',
      'Rezistență la compresiune': '≥ 2 N/mm²',
      'Timp de uscare': 'cca. 24 ore/strat de 5 mm',
      'Timp de punere în operă': '40 - 60 minute'
    },
    // Source: "Consum orientativ: 1,2 kg/m²/mm"
    // Note  : PDF: consum orientativ 1,2 kg/m²/mm. La 1 mm grosime = 1,2 kg/m². La grosime medie de 5 mm = 6,0 kg/m². Sac 20 kg la 1 mm: 20/1,2 = 16,67 m²/sac. Sac 20 kg la 5 mm: 20/6,0 = 3,33 m²/sac. Sac 5 kg la 1 mm: 5/1,2 = 4,17 m²/sac.
    consumption: {
      kgPerM2Standard:     1.2,
      kgPerM2PerMm:        1.2,
      thicknessStandardMm: 1,
      thicknessMinMm:      2,
      thicknessMaxMm:      10,
      m2PerPackage:        16.67,
      packageDescription:  'sac hârtie 20kg / sac plastic 5kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'ceresit-ct126-glet-interior-2',
    category:    'Finisaje',
    name:        'Ceresit CT 126 Glet pentru interior',
    description: 'Glet pe bază de ipsos aditivat pentru interior, destinat egalizării suprafețelor de pereți și plafoane cu denivelări de la 2 la 6 mm. Oferă o suprafață finală netedă, de un alb mat, cu consistență cremoasă și rezistență mare în timp scurt.',
    specs: ['1 kg/m² la 1mm', '10 m²/sac 20kg / sac 5kg', 'min +5°C', 'Aplicare în strat de la 2 la 6 mm', 'Consistență cremoasă, nivelare ușoară', 'Suprafață finală netedă, alb mat', 'Rezistență mare în timp scurt', 'Grad mare de aderență', 'Aplicare manuală sau mecanizată (Graco T-Max 506)', 'Se poate aplica crud pe crud'],
    keyProperties: {
      'Compoziție': 'amestec de ipsos cu compuși minerali și aditivi',
      'Densitate': 'aprox. 0,9 kg/dm³',
      'Proporția amestecului': 'cca. 7,5 - 8 l apă / 20 kg CT 126',
      'Timp de punere în operă': 'cca. 60 minute',
      'Consum orientativ': 'cca. 1 kg/m²/mm',
      'Aderență la suport': '≥ 0,4 N/mm²',
      'Rezistență la încovoiere': '≥ 1 N/mm²',
      'Rezistență la compresiune': '≥ 2 N/mm²',
      'Timp de uscare': 'cca. 24 ore/strat de 5 mm',
      'Timp de nivelare manuală': 'cca. 30 min',
      'Timp de nivelare mecanizată': 'cca. 45 min'
    },
    // Source: "Consum orientativ: cca. 1 kg/m²/mm"
    // Note  : PDF: consum cca. 1 kg/m²/mm. La grosime 2 mm → 2 kg/m² → sac 20 kg acoperă 10 m². La grosime 6 mm → 6 kg/m² → sac 20 kg acoperă 3,33 m². kgPerM2PerMm = 1.0.
    consumption: {
      kgPerM2Standard:     1,
      kgPerM2PerMm:        1,
      thicknessStandardMm: 1,
      thicknessMinMm:      2,
      thicknessMaxMm:      6,
      m2PerPackage:        10,
      packageDescription:  'sac 20kg / sac 5kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'ceresit-ct126-glet-interior-3',
    category:    'Finisaje',
    name:        'Ceresit CT 126 Glet pentru interior',
    description: 'Glet pe bază de ipsos aditivat pentru interior, destinat egalizării suprafețelor și umplerii denivelărilor între 2 și 10 mm. Oferă un finisaj alb mat, de foarte bună calitate, pe pereți și plafoane în interiorul clădirilor.',
    specs: ['1.2 kg/m² la 1mm', '1.67 m²/sac 5kg și sac 20kg', 'min +5°C', 'Permite realizarea de straturi de până la 10 mm', 'Rezistență mare, în timp scurt', 'Grad mare de aderență', 'Finisaj alb mat, de foarte bună calitate', 'Rezistență la fisurare în strat gros', 'Reacție la foc A1'],
    keyProperties: {
      'Compoziție': 'amestec de ipsos cu compuși minerali și aditivi',
      'Densitate': '0,9 kg/dm³',
      'Timp de punere în operă': '40 - 60 minute',
      'Temperatură de punere în operă': '+5°C până la +30°C',
      'Consum orientativ': '1,2 kg/m²/mm',
      'Aderență la suport': '≥ 0,4 N/mm²',
      'Rezistență la încovoiere': '≥ 1 N/mm²',
      'Rezistență la compresiune': '≥ 2 N/mm²',
      'Timp de uscare': 'cca. 24 ore/strat de 5 mm',
      'Clasificare EN 13279': 'B2/20/2'
    },
    // Source: "Consum orientativ: 1,2 kg/m²/mm"
    // Note  : PDF: consum orientativ 1,2 kg/m²/mm. La grosimea de 10 mm: 1,2 × 10 = 12 kg/m². Sac 20 kg la 10 mm: 20/12 = 1,67 m²/sac. La grosimea de 2 mm: 1,2 × 2 = 2,4 kg/m², sac 20 kg: 20/2,4 = 8,33 m²/sac.
    consumption: {
      kgPerM2Standard:     1.2,
      kgPerM2PerMm:        1.2,
      thicknessStandardMm: 1,
      thicknessMinMm:      2,
      thicknessMaxMm:      10,
      m2PerPackage:        1.67,
      packageDescription:  'sac 5kg și sac 20kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'rigips-rimano-bianco',
    category:    'Finisaje',
    name:        'Rimano® BIANCO - Glet de nivelare pe bază de ipsos',
    description: 'Rimano® BIANCO este un glet de nivelare pe bază de ipsos pentru finisaje interioare, cu aplicare manuală sau mecanizată (cu pompe airless) în grosimi de până la 7 mm. Destinat gletuirii suprafețelor acoperite cu tencuieli pe bază de ciment sau ciment-var-nisip, rezultând o suprafață perfect netedă.',
    specs: ['0.9 kg/m² la 1mm', '3.17 m²/Sac de polietilenă 20 kg', 'min +5°C', 'Standard de referință: SR EN 13279-1:2009', 'Clasa de încadrare: B2/20/2', 'Compoziție: Ipsos, compuși minerali și aditivi', 'Reacție la foc: A1', 'Finețe: 99% sub 200 µm', 'Aderență: >0,1 N/mm²', 'Rezistență la încovoiere: >1 N/mm²', 'Rezistență la compresiune: >2 N/mm²', 'Timp de lucru: 90 min', 'Raport amestec: 20 kg pulbere / 10 L apă'],
    keyProperties: {
      'Standard de referință': 'SR EN 13279-1:2009',
      'Clasa de încadrare': 'B2/20/2',
      'Reacție la foc': 'A1',
      'Finețe': '99% sub 200 µm',
      'Aderență': '>0,1 N/mm²',
      'Rezistență la încovoiere': '>1 N/mm²',
      'Rezistență la compresiune': '>2 N/mm²',
      'Timp de lucru': '90 min',
      'Raport amestec': '20 kg pulbere / 10 L apă',
      'Consum orientativ de pulbere': '0,9 kg/m²/1 mm'
    },
    // Source: "Consum orientativ de pulbere 0,9 kg/m²/1 mm"
    // Note  : PDF indică 0,9 kg/m²/1 mm grosime. La grosime maximă 7 mm: 0,9 × 7 = 6,3 kg/m². Sac 20 kg la 1 mm grosime: 20 / 0,9 = 22,22 m²/sac. La grosimea medie de ~7 mm: 20 / 6,3 = 3,17 m²/sac. kgPerM2PerMm = 0,9.
    consumption: {
      kgPerM2Standard:     0.9,
      kgPerM2PerMm:        0.9,
      thicknessStandardMm: 1,
      thicknessMinMm:      1,
      thicknessMaxMm:      7,
      m2PerPackage:        3.17,
      packageDescription:  'Sac de polietilenă 20 kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-mpa-35-1',
    category:    'Tencuieli',
    name:        'Baumit MPA 35',
    description: 'Tencuială mecanizată var-ciment, hidrofobată, cu permeabilitate bună la vapori, pentru exterior și interior. Se aplică pe zidării de cărămidă plină sau eficientă și blocuri ceramice, mecanizat sau manual.',
    specs: ['14 kg/m² la 10mm', '1.43 m²/sac 40 kg', 'min +5°C', 'Grupa Mortare: CS II', 'Standard: SR EN 998-1', 'Clasificare: GP-CS II', 'Rezistența la compresiune la 28 zile: > 2.5 N/mm²', 'Aderența la forfecare: > 0.1 N/mm²', 'Rezistența la difuzia vaporilor: 5/20 valoare tabelară', 'Conductivitate termică λ: 0.430 W/mK (valoare tabelară P=50%)', 'Granulă maxim: 1 mm', 'Necesar apă: 20-22%'],
    keyProperties: {
      'Grupa Mortare': 'CS II',
      'Rezistența la compresiune 28 zile': '> 2.5 N/mm²',
      'Aderența la forfecare': '> 0.1 N/mm²',
      'Rezistența la difuzia vaporilor': '5/20',
      'Conductivitate termică λ': '0.430 W/mK',
      'Granulă maxim': '1 mm',
      'Necesar apă': '20-22%'
    },
    // Source: "Consum: 14 kg/m² (MPA 35_40 kg) / 14 kg/m²/cm (MPA 35_siloz). Grosime minimă de aplicare: 20 mm/strat. Grosime maximă de"
    // Note  : PDF indică 14 kg/m²/cm (adică per 10 mm grosime). kgPerM2PerMm = 14/10 = 1.4. La grosime de 10 mm: 14 kg/m². La 20 mm (minim exterior): 28 kg/m². m2PerPackage la 10 mm = 40/14 = 2.86 m²/sac; la 20 mm = 40/28 = 1.43 m²/sac. Se raportează m2PerPackage la grosimea minimă de aplicare exterior (20 mm).
    consumption: {
      kgPerM2Standard:     14,
      kgPerM2PerMm:        1.4,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        1.43,
      packageDescription:  'sac 40 kg',
      packageSize:         40,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-sockelputz-1',
    category:    'Tencuieli',
    name:        'Baumit SockelPutz',
    description: 'Tencuială de ciment hidrofobată, impermeabilă la apă, pentru aplicare manuală și mecanizată la interior și exterior. Se utilizează ca tencuială de soclu, suport pentru placări ceramice și tencuială armată la lucrări de consolidare.',
    specs: ['32 kg/m² la 20mm', '0.78 m²/sac 25 kg', 'min +5°C', 'Grupa Mortare: CS IV', 'Standard: SR 998-1:2016', 'Clasificare: GP - CS IV - W2', 'Granulă maxim 2 mm', 'Rezistența la încovoiere: > 1.5 N/mm²', 'Rezistența la încovoiere la 28 zile: > 3 N/mm² (mecanizat)', 'Rezistența la compresiune: > 5 N/mm² (manual)', 'Rezistența la compresiune la 28 zile: > 10 N/mm² (mecanizat)', 'Aderența la forfecare: > 0.1 N/mm²', 'Rezistența la difuzia vaporilor: 15 / 35 tabelar', 'Conductivitate termică: < 0.460 W/mK (manual)'],
    keyProperties: {
      'Grupa Mortare': 'CS IV',
      'Clasificare': 'GP - CS IV - W2',
      'Granulă maximă': '2 mm',
      'Rezistență la compresiune (manual)': '> 5 N/mm²',
      'Rezistență la compresiune 28 zile (mecanizat)': '> 10 N/mm²',
      'Rezistență la încovoiere': '> 1.5 N/mm²',
      'Rezistență la încovoiere 28 zile (mecanizat)': '> 3 N/mm²',
      'Aderență la forfecare': '> 0.1 N/mm²',
      'Rezistență la difuzia vaporilor': '15 / 35',
      'Conductivitate termică': '< 0.460 W/mK',
      'Consum': '16 kg/m²/cm',
      'Necesar apă': '4 - 5 l/sac'
    },
    // Source: "Consum 16 kg/m²/cm\nGrosime minimă de aplicare 20 mm\nGrosime maximă de aplicare 25 mm\nsac 25 kg, 1 palet=54 saci=1350 kg"
    // Note  : PDF indică 16 kg/m²/cm (adică 16 kg/m² la 10 mm grosime). kgPerM2PerMm = 16/10 = 1.6 kg/m²/mm. La grosimea minimă de 20 mm: 1.6 × 20 = 32 kg/m². m²/sac la 20 mm = 25/32 = 0.78 m²/sac. La grosimea maximă de 25 mm: 1.6 × 25 = 40 kg/m², m²/sac = 25/40 = 0.625 m²/sac.
    consumption: {
      kgPerM2Standard:     32,
      kgPerM2PerMm:        1.6,
      thicknessStandardMm: 20,
      thicknessMinMm:      20,
      thicknessMaxMm:      25,
      m2PerPackage:        0.78,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-feinputz-tencuiala-fina-alba-interior',
    category:    'Tencuieli',
    name:        'Baumit FeinPutz - Tencuială fină albă pentru interior',
    description: 'Mortar uscat, predozat pe bază de var și ciment alb, cu difuzie ridicată la vapori, pentru executarea manuală a tencuielilor fine la interior. Se aplică peste tencuieli brute minerale și tencuieli termoizolante. Nu se recomandă ca suport pentru lipirea placajelor ceramice.',
    specs: ['6 kg/m² la 4mm', '6.67 m²/sac de 40 kg', 'min +5°C', 'Clasificare: GP - CS I conform EN 998-1', 'Rezistență la compresiune (28 zile): > 0,6 N/mm²', 'Granulație max.: 0,6 mm', 'Conductivitate termică (λ): 0,50 W/mK', 'Factor rezistență la permeabilitate vapori (µ): ca. 12', 'Densitate: 1300 kg/m³', 'Grosime strat: 3-6 mm', 'Necesar de apă: cca. 11 l/sac', 'Timp de uscare: 5 zile'],
    keyProperties: {
      'Clasificare': 'GP - CS I conform EN 998-1',
      'Rezistență la compresiune (28 zile)': '> 0,6 N/mm²',
      'Granulație maximă': '0,6 mm',
      'Conductivitate termică (λ)': '0,50 W/mK',
      'Factor rezistență permeabilitate vapori (µ)': 'ca. 12',
      'Densitate': '1300 kg/m³',
      'Grosime strat minimă': '3 mm',
      'Grosime strat maximă': '6 mm',
      'Necesar de apă': 'cca. 11 l/sac',
      'Timp de uscare': '5 zile'
    },
    // Source: "Necesarul de material: cca. 6 kg/m² la grosimea de strat de 4 mm"
    // Note  : PDF: cca. 6 kg/m² la grosimea de strat de 4 mm. kgPerM2PerMm = 6.0 / 4 = 1.5. m2PerPackage = 40 / 6.0 = 6.67 m²/sac la 4 mm. La grosime minimă 3 mm: 1.5 × 3 = 4.5 kg/m² → 40/4.5 = 8.89 m²/sac. La grosime maximă 6 mm: 1.5 × 6 = 9.0 kg/m² → 40/9.0 = 4.44 m²/sac.
    consumption: {
      kgPerM2Standard:     6,
      kgPerM2PerMm:        1.5,
      thicknessStandardMm: 4,
      thicknessMinMm:      3,
      thicknessMaxMm:      6,
      m2PerPackage:        6.67,
      packageDescription:  'sac de 40 kg',
      packageSize:         40,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'adeplast-sapa-autonivelanta-sa-2-10',
    category:    'Sapa',
    name:        'Șapă autonivelantă pe bază de ciment, 2-10 mm, pentru interior',
    description: 'Mortar de șapă autonivelantă pe bază de ciment pentru aplicare la interior în strat de 2-10 mm, destinat egalizării șapelor de ciment și suprafețelor de beton în vederea finisării cu linoleum, PVC, mochetă, parchet, gresie etc. Se aplică numai pe suporturi minerale.',
    specs: ['17 kg/m² la 10mm', '1.47 m²/sac 25kg', 'min +5°C', 'Clasa de mortar: CT-C25-F6-A15 conform SR EN 13813/2003', 'Rezistență la compresiune: C25', 'Rezistență la încovoiere: F6', 'Rezistență la uzură: A15', 'Timp de găleată: cca. 1 oră', 'Timp deschis: 30 minute', 'Consum: cca. 1,6 – 1,8 kg/m²/mm', 'Grosime aplicare: 2 – 10 mm'],
    keyProperties: {
      'Rezistență la compresiune': 'C25',
      'Rezistență la încovoiere': 'F6',
      'Rezistență la uzură': 'A15',
      'Timp de găleată': 'cca. 1 oră',
      'Timp deschis': '30 minute',
      'Baza materialului': 'ciment, agregate minerale, polimeri, plastificatori',
      'Consum': 'cca. 1,6 – 1,8 kg/m²/mm'
    },
    // Source: "Consum: cca. 1,6 – 1,8 kg / m² / mm"
    // Note  : PDF: consum cca. 1,6 – 1,8 kg/m²/mm. Valoare medie 1,7 kg/m²/mm. La 10 mm grosime: 1,7 × 10 = 17,0 kg/m². Sac 25 kg la 10 mm: 25 / 17,0 = 1,47 m²/sac. La 2 mm grosime: 1,7 × 2 = 3,4 kg/m², sac 25 kg acoperă 7,35 m².
    consumption: {
      kgPerM2Standard:     17,
      kgPerM2PerMm:        1.7,
      thicknessStandardMm: 10,
      thicknessMinMm:      2,
      thicknessMaxMm:      10,
      m2PerPackage:        1.47,
      packageDescription:  'sac 25kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'ceresit-cn68-sapa-autonivelanta',
    category:    'Sapa',
    name:        'Ceresit CN 68 Șapă autonivelantă',
    description: 'Șapă autonivelantă pe bază de sulfat de calciu, armată cu fibre, pentru nivelarea și egalizarea pardoselilor în interior. Se aplică în grosimi între 2 și 20 mm, destinată traficului rezidențial, compatibilă cu pardoseli încălzite și aplicare mecanizată.',
    specs: ['1.5 kg/m² la 1mm', '1.67 m²/sac 25 kg', 'min +5°C', 'Grosime aplicare: 2-20 mm', 'Rezistență la compresiune: C20 (20 N/mm² după 28 zile)', 'Rezistență la încovoiere: F6 (6 N/mm² după 28 zile)', 'Aderență la suport: B 0,5 (0,5 N/mm²)', 'Reacție la foc: A1fl', 'Armat cu fibre, fără contracții, fără fisuri', 'Densitate șapă proaspătă: cca. 1,3 kg/l', 'Clasa SR EN 13813: CA - C 20 - F6 - B 0.5'],
    keyProperties: {
      'Compoziție': 'amestec de ipsos, ciment, agregate și aditivi',
      'Culoare': 'gri',
      'Necesar de apă': '5,5-6 litri apă la 25 kg pulbere',
      'Densitate șapă proaspătă': 'cca. 1,3 kg/l',
      'Consum orientativ': 'cca. 1,5 kg/m²/mm grosime',
      'Timp de aplicare': 'max. 40 minute de la amestecarea cu apă',
      'Temperatura de aplicare': 'de la +5°C până la +30°C',
      'Trafic pietonal <5mm': 'după 4 ore',
      'Trafic pietonal 5-20mm': 'după 12 ore',
      'Rezistență la compresiune': '20 N/mm² după 28 zile',
      'Rezistență la încovoiere': '6 N/mm² după 28 zile',
      'Aderență la suport': '0,5 N/mm²'
    },
    // Source: "Consum orientativ: cca. 1,5 kg/m²/mm grosime"
    // Note  : PDF: consum orientativ cca. 1,5 kg/m²/mm grosime. La 10 mm: 1,5 × 10 = 15 kg/m². Sac 25 kg la 10 mm: 25/15 = 1,67 m²/sac. La 1 mm: 25/1,5 = 16,67 m²/sac.
    consumption: {
      kgPerM2Standard:     1.5,
      kgPerM2PerMm:        1.5,
      thicknessStandardMm: 1,
      thicknessMinMm:      2,
      thicknessMaxMm:      20,
      m2PerPackage:        1.67,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-grund',
    category:    'Altele',
    name:        'Baumit Grund',
    description: 'Amorsă concentrată fără solvenți, diluabilă cu apă, pentru reducerea și egalizarea absorbției suporturilor absorbante. Se utilizează înaintea aplicării tencuielilor minerale, șapelor autonivelante, adezivilor, maselor de nivelare și hidroizolațiilor Baumit.',
    specs: ['0.15 kg/m²', '166.7 m²/bidon 5 kg / bidon 25 kg', 'min +5°C', 'Egalizator de absorbție și punte de aderență', 'Capacitate mare de penetrare în suport', 'Fără solvent', 'Permeabilă la vaporii de apă', 'EMICODE EC 1 PLUS (TVOC < 60 µg/m³)'],
    keyProperties: {
      'Culoare': 'albastru',
      'Densitate': '1 kg/l',
      'Valoare pH': '8',
      'Timp de uscare': 'min. 15 min funcție de suport',
      'TVOC': '< 60 µg/m³ EMICODE EC 1 PLUS',
      'Consum': 'aprox. 0.05 - 0.15 kg/m²'
    },
    // Source: "Consum aprox. 0.05 - 0.15 kg/m²\nAcoperire: Grund_5 kg: aprox. 33 - 100 m²; Grund_25 kg: aprox. 160 - 500 m²\n\nTABEL DILUT"
    // Note  : Consum variabil funcție de suport și diluție: 0.025 kg/m² (diluat 1:6, cărămidă+tencuială var-ciment), 0.05 kg/m² (diluat 1:2-1:3, cărămidă+tencuială ipsos), 0.15 kg/m² (nediluat, beton/șapă+șape autonivelante sau adezivi/hidroizolații). Bidon 25 kg nediluat: 25/0.15 ≈ 166.7 m²/bidon. Bidon 5 kg nediluat: 5/0.15 ≈ 33 m²/bidon. PDF confirmă acoperire 33-100 m² (5 kg) și 160-500 m² (25 kg).
    consumption: {
      kgPerM2Standard:     0.15,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        166.7,
      packageDescription:  'bidon 5 kg / bidon 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'mapei-primer-g',
    category:    'Altele',
    name:        'Primer G',
    description: 'Amorsă pe bază de rășini sintetice în dispersie apoasă cu conținut foarte redus de compuși organici volatili (VOC). Se utilizează pentru tratarea suprafețelor din ipsos, ciment și anhidride înainte de aplicarea adezivilor, tencuielilor, șapelor autonivelante, tapetului sau vopselei. Formează o peliculă subțire, compactă și lucioasă ce consolidează suprafața și îmbunătățește aderența.',
    specs: ['0.115 kg/m²', '43.5 m²/bidon plastic 5 kg', 'min +5°C', 'Bază de rășini sintetice în dispersie apoasă', 'Conținut VOC: 0 g/l conform 2004/42/EC', 'GEV EMICODE EC1 Plus - emisii foarte scăzute', 'Nu este inflamabil sau toxic', 'Densitate: 1,01 g/cm³', 'pH: 8', 'Conținut de solide: 18%', 'Consistență: lichid, culoare albastru deschis'],
    keyProperties: {
      'Consistență': 'lichid',
      'Culoare': 'albastru deschis',
      'Densitate': '1,01 g/cm³',
      'pH': '8',
      'Conținut de solide': '18%',
      'Conținut VOC': '0 g/l',
      'EMICODE': 'EC1 Plus - emisii foarte scăzute',
      'Timp uscare pe beton': '30 min',
      'Timp uscare pe ipsos': '30-60 min',
      'Temperatură de aplicare': '+5°C până la +35°C'
    },
    // Source: "Consumul de Primer G depinde de porozitatea si gradul de absorbtie al suprafetei. Consumul normal este intre 0,08 si 0,1"
    // Note  : PDF: consum normal 0,08-0,15 kg/m². Valoare medie: (0,08+0,15)/2 = 0,115 kg/m². Bidon 5 kg: 5/0,115 ≈ 43,5 m²/bidon. Bidon 10 kg: 10/0,115 ≈ 87 m². Bidon 25 kg: 25/0,115 ≈ 217 m². Sticlă 1 kg: 1/0,115 ≈ 8,7 m². Consumul variază în funcție de porozitatea suportului.
    consumption: {
      kgPerM2Standard:     0.115,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        43.5,
      packageDescription:  'bidon plastic 5 kg',
      packageSize:         5,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-superprimer',
    category:    'Altele',
    name:        'Baumit SuperPrimer',
    description: 'Amorsă gata preparată de culoare galbenă, de înaltă calitate, fără solvenți, cu umplutură de nisip de cuarț. Recomandată pentru suporturi slab absorbante și neabsorbante, la interior și exterior, pentru pereți și pardoseli.',
    specs: ['0.3 kg/m²', '67 m²/găleată 5 kg / găleată 20 kg', 'min +5°C', 'Aderență ridicată pe suprafețe netede și neabsorbante', 'Fără solvenți', 'Umpluturi cu nisip de cuarț', 'Culoare galbenă pentru verificarea aplicării uniforme', 'EMICODE EC 1 PLUS', 'Reactivitate chimică specială în primele 48 ore'],
    keyProperties: {
      'Culoare': 'galben',
      'Timp de uscare': '30 min',
      'Densitate': '1.5 kg/dm³',
      'Valoare pH': '8.5',
      'TVOC': '< 60 µg/m³ EMICODE EC 1 PLUS',
      'Consum': '0.3 kg/m²'
    },
    // Source: "Consum: 0.3 kg/m² (atât pentru SuperPrimer_5 Kg cât și SuperPrimer_20 Kg). Acoperire: 17 m² (5 kg), 67 m² (20 kg)."
    // Note  : PDF indică consum 0.3 kg/m² pentru ambele ambalaje. Găleată 5 kg acoperă 17 m² (5/0.3≈16.7). Găleată 20 kg acoperă 67 m² (20/0.3≈66.7). Produs aplicat în strat subțire, fără grosime specificată.
    consumption: {
      kgPerM2Standard:     0.3,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        67,
      packageDescription:  'găleată 5 kg / găleată 20 kg',
      packageSize:         20,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-mpa-35-2',
    category:    'Tencuieli',
    name:        'Baumit MPA 35',
    description: 'Tencuială mecanizată var-ciment, hidrofobată, cu permeabilitate bună la vapori, pentru exterior și interior. Se aplică pe zidării de cărămidă plină sau eficientă și blocuri ceramice, mecanizat sau manual.',
    specs: ['14 kg/m² la 10mm', '1.43 m²/sac 40 kg', 'min +5°C', 'Grupa Mortare: CS II', 'Standard: SR EN 998-1', 'Clasificare: GP-CS II', 'Rezistența la compresiune la 28 zile: > 2.5 N/mm²', 'Aderența la forfecare: > 0.1 N/mm²', 'Rezistența la difuzia vaporilor: 5 / 20 valoare tabelară', 'Conductivitate termică λ: 0.430 W/mK (valoare tabelară pentru P=50%)', 'Granulă maxim: 1 mm', 'Necesar apă: 20 - 22 %'],
    keyProperties: {
      'Grupa Mortare': 'CS II',
      'Rezistența la compresiune (28 zile)': '> 2.5 N/mm²',
      'Aderența la forfecare': '> 0.1 N/mm²',
      'Rezistența la difuzia vaporilor': '5 / 20',
      'Conductivitate termică λ': '0.430 W/mK',
      'Granulă maxim': '1 mm',
      'Necesar apă': '20 - 22 %'
    },
    // Source: "Consum: 14 kg/m² (MPA 35_40 kg) / 14 kg/m²/cm (MPA 35_siloz). Grosime minimă de aplicare: 20 mm /strat. Grosime maximă d"
    // Note  : PDF indică 14 kg/m²/cm (adică per 10 mm grosime). kgPerM2PerMm = 14/10 = 1.4. La grosimea minimă exterior de 20 mm: 14 * 2 = 28 kg/m². m2PerPackage la 10 mm = 40/14 = 2.86 m². La 20 mm = 40/28 = 1.43 m²/sac. Valoarea standard de 14 kg/m² corespunde la 10 mm grosime.
    consumption: {
      kgPerM2Standard:     14,
      kgPerM2PerMm:        1.4,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        1.43,
      packageDescription:  'sac 40 kg',
      packageSize:         40,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-mpi-25-1',
    category:    'Tencuieli',
    name:        'Baumit MPI 25',
    description: 'Tencuială mecanizată var-ciment pentru interior, permeabilă la vapori, care reglează umiditatea în încăpere și asigură un climat interior confortabil. Se aplică manual sau mecanizat pe diverse suporturi, inclusiv în încăperi umede (grupe W1-W4).',
    specs: ['14 kg/m² la 10mm', '1.79 m²/sac 25 kg / sac 40 kg / siloz', 'min +5°C', 'Grupa Mortare: CS II', 'Standard: SR EN 998-1', 'Clasificare: GP - CS II', 'Rezistența la compresiune la 28 zile: > 2.5 N/mm²', 'Aderența la forfecare: 0.08 N/mm²', 'Rezistența la difuzia vaporilor: 5 / 20', 'Conductivitate termică λ: 0.43 W/mK (P=50%)', 'Granulă maxim: 0.6 mm', 'Necesar apă: aprox. 22 - 24 %'],
    keyProperties: {
      'Grupa Mortare': 'CS II',
      'Rezistența la compresiune (28 zile)': '> 2.5 N/mm²',
      'Aderența la forfecare': '0.08 N/mm²',
      'Rezistența la difuzia vaporilor': '5 / 20',
      'Conductivitate termică λ': '0.43 W/mK',
      'Granulă maxim': '0.6 mm',
      'Consum': '14 kg/m²/cm',
      'Grosime minimă aplicare': '10 mm',
      'Grosime maximă aplicare': '25 mm'
    },
    // Source: "Consum: 14 kg/m²/cm | Acoperire: 3 m²/cm/sac (MPI 25_25 kg și MPI 25_40 kg), 72 m²/tonă (MPI 25_siloz) | Grosime minimă "
    // Note  : PDF indică 14 kg/m²/cm, adică 14 kg/m² la 10 mm grosime. kgPerM2PerMm = 14/10 = 1.4. Acoperire sac 25 kg: 3 m²/cm/sac înseamnă 3 m² la 10 mm per sac, deci la grosimea minimă de 10 mm: 25/14 = 1.79 m²/sac. Pentru sac 40 kg: 40/14 = 2.86 m²/sac la 10 mm. Siloz: 72 m²/tonă la 10 mm → 1000/72 = 13.89 ≈ 14 kg/m².
    consumption: {
      kgPerM2Standard:     14,
      kgPerM2PerMm:        1.4,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        1.79,
      packageDescription:  'sac 25 kg / sac 40 kg / siloz',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-ratioglatt-1',
    category:    'Tencuieli',
    name:        'Baumit RatioGlatt',
    description: 'Tencuială glet de ipsos pentru interior, pe bază de ipsos, var pentru construcții, nisipuri fine și adaosuri. Se aplică mecanizat cu mașina de tencuit, oferind suprafață netedă gletuită, într-un singur strat (unistrat). Potrivită pentru bucătării, băi și încăperi cu nivel de umiditate mediu (grupe W1, W2, W3).',
    specs: ['10.5 kg/m² la 10mm', '2.9 m²/sac 30 kg', 'min +5°C', 'Standard: EN 13279-1', 'Clasificare: B2/50/2', 'Rezistența la încovoiere la 28 zile: > 1 N/mm²', 'Rezistența la compresiune la 28 zile: > 2 N/mm²', 'Rezistența la difuzia vaporilor: 10', 'Conductivitate termică λ: 0.600 W/mK', 'Granulă maxim: 0.6 mm', 'Necesar apă: 40 - 49%'],
    keyProperties: {
      'Rezistența la încovoiere (28 zile)': '> 1 N/mm²',
      'Rezistența la compresiune (28 zile)': '> 2 N/mm²',
      'Rezistența la difuzia vaporilor': '10',
      'Conductivitate termică λ': '0.600 W/mK',
      'Granulă maxim': '0.6 mm',
      'Grosime minimă aplicare': '10 mm',
      'Grosime maximă aplicare': '25 mm'
    },
    // Source: "Consum: 10.5 kg/m²/cm | Acoperire: 2.9 m²/cm/sac (Ratio Glatt_30 kg) | 95 m²/to/cm (Ratio Glatt_siloz)"
    // Note  : Fișa PDF: consum 10.5 kg/m²/cm (adică la 10 mm grosime). kgPerM2PerMm = 10.5/10 = 1.05 kg/m²/mm. Acoperire sac 30 kg: 2.9 m²/cm/sac (la 10 mm grosime). Verificare: 30/10.5 = 2.857 ≈ 2.9 m²/sac. Siloz: 95 m²/to/cm → 1000/95 = 10.53 kg/m² la 10 mm, confirmă consumul.
    consumption: {
      kgPerM2Standard:     10.5,
      kgPerM2PerMm:        1.05,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        2.9,
      packageDescription:  'sac 30 kg',
      packageSize:         30,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-sockelputz-2',
    category:    'Tencuieli',
    name:        'Baumit SockelPutz',
    description: 'Tencuială de ciment hidrofobată, impermeabilă la apă, pentru aplicare manuală și mecanizată la interior și exterior. Utilizată pentru tencuirea soclurilor, ca suport pentru placări ceramice și ca tencuială armată la lucrări de consolidare.',
    specs: ['16 kg/m² la 10mm', '0.78 m²/sac 25 kg', 'min +5°C', 'Grupa Mortare: CS IV', 'Standard: SR 998-1:2016', 'Clasificare: GP - CS IV - W2', 'Rezistența la încovoiere: > 1.5 N/mm²', 'Rezistența la încovoiere la 28 zile: > 3 N/mm² (mecanizat)', 'Rezistența la compresiune: > 5 N/mm² (manual)', 'Rezistența la compresiune la 28 zile: > 10 N/mm² (mecanizat)', 'Aderența la forfecare: > 0.1 N/mm²', 'Rezistența la difuzia vaporilor: 15 / 35 tabelar', 'Conductivitate termică: < 0.460 W/mK (manual)', 'Granulă maxim: 2 mm'],
    keyProperties: {
      'Grupa Mortare': 'CS IV',
      'Clasificare': 'GP - CS IV - W2',
      'Rezistența la încovoiere': '> 1.5 N/mm²',
      'Rezistența la încovoiere la 28 zile': '> 3 N/mm² (mecanizat)',
      'Rezistența la compresiune': '> 5 N/mm² (manual)',
      'Rezistența la compresiune la 28 zile': '> 10 N/mm² (mecanizat)',
      'Aderența la forfecare': '> 0.1 N/mm²',
      'Rezistența la difuzia vaporilor': '15 / 35 tabelar',
      'Conductivitate termică': '< 0.460 W/mK (manual)',
      'Granulă maxim': '2 mm',
      'Consum': '16 kg/m²/cm',
      'Necesar apă': '4 - 5 l/sac'
    },
    // Source: "Consum 16 kg/m²/cm\nGrosime minimă de aplicare 20 mm\nGrosime maximă de aplicare 25 mm\nsac 25 kg, 1 palet=54 saci=1350 kg"
    // Note  : PDF: Consum 16 kg/m²/cm (adică 16 kg/m² la 10 mm grosime). kgPerM2PerMm = 16.0/10 = 1.6. La grosimea minimă de 20 mm: 1.6 × 20 = 32 kg/m², deci m²/sac la 20mm = 25/32 = 0.78 m²/sac. La 10mm referință: 25/16 = 1.5625 m²/sac.
    consumption: {
      kgPerM2Standard:     16,
      kgPerM2PerMm:        1.6,
      thicknessStandardMm: 10,
      thicknessMinMm:      20,
      thicknessMaxMm:      25,
      m2PerPackage:        0.78,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'primus-mortar-tencuiala-1',
    category:    'Tencuieli',
    name:        'PRIMUS Mortar Tencuială',
    description: 'Mortar pe bază de ciment pentru tencuieli interioare și exterioare, aplicabil mecanic sau manual. Asigură aderență bună la tencuieli, betoane și zidării, cu grosimea stratului de 3-4 cm dintr-o mână.',
    specs: ['13 kg/m² la 10mm', '1.92 m²/sac 25 kg', 'min +5°C', 'Clasificare SR EN 998-1: GP-CSIII/Wo', 'Compoziție: ciment, aditivi, nisip și alte agregate', 'Granulație: 1 mm', 'Densitate: 1,25 kg/dm³', 'Rezistență la compresiune: clasa CS III (3,5 ÷ 7,5 N/mm²)', 'Absorbție de apă prin capilaritate: WcO', 'Conductivitate termică: 0,33 W/mK', 'Aderență și mod de rupere: 0,29 N/mm² - FP:B', 'Coeficient permeabilitate la vapori de apă: μ=5/20', 'Proporție de amestec: 25 kg praf în 5,5 ÷ 6 litri apă', 'Timp de punere în operă: 1 oră', 'Timp de uscare: 7 zile/cm grosime', 'Clasa de reacție la foc: A1'],
    keyProperties: {
      'Clasificare': 'GP-CSIII/Wo',
      'Granulație': '1 mm',
      'Densitate': '1,25 kg/dm³',
      'Rezistență la compresiune': 'clasa CS III (3,5 ÷ 7,5 N/mm²)',
      'Conductivitate termică': '0,33 W/mK',
      'Aderență': '0,29 N/mm² - FP:B',
      'Permeabilitate vapori': 'μ=5/20',
      'Consum': '12 ÷ 14 kg/m², cm',
      'Timp de punere în operă': '1 oră',
      'Timp de uscare': '7 zile/cm grosime',
      'Clasa de reacție la foc': 'A1'
    },
    // Source: "Consum: 12 ÷ 14 kg/m², cm. Randamentul materialului este de 12÷14 kg/m² la fiecare cm de grosime a stratului."
    // Note  : PDF indică consum 12÷14 kg/m² per cm grosime. Media = 13 kg/m²/cm = 1.3 kg/m²/mm. La grosimea standard de 10 mm (1 cm): 13 kg/m². Sac 25 kg: 25/13 = 1.92 m²/sac la 10 mm grosime. Grosimea normală a stratului: 2÷2,5 cm, poate ajunge la 4 cm (3-4 cm dintr-o mână).
    consumption: {
      kgPerM2Standard:     13,
      kgPerM2PerMm:        1.3,
      thicknessStandardMm: 10,
      thicknessMinMm:      20,
      thicknessMaxMm:      40,
      m2PerPackage:        1.92,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'adeplast-mti-25',
    category:    'Tencuieli',
    name:        'MTI 25 - Mortar pentru tencuire și reparații aplicabil manual sau cu mașina de tencuit',
    description: 'Mortar de tencuială suport sau drișcuită, CS I conform SR EN 998-1/2016, pentru aplicare la interior pe suporturi minerale. Poate fi aplicat manual sau mecanizat, inclusiv în spații cu umiditate ridicată precum băi și bucătării. Se aplică numai pe suporturi minerale (beton, cărămidă, BCA).',
    specs: ['11.5 kg/m² la 10mm', '2.61 m²/sac 30 kg', 'min +5°C', 'Clasa de mortar: CS I conform SR EN 998-1/2016', 'Granulație: 0-1 mm', 'Reacția la foc: Clasa A1', 'Absorbție apă prin capilaritate: W0', 'Timp de găleată: cca. 3 ore', 'Grosime aplicare: minim 10 mm - maxim 25 mm / strat', 'Baza materialului: ciment, var, agregate minerale, polimeri, plastificatori'],
    keyProperties: {
      'Clasa de mortar': 'CS I conform SR EN 998-1/2016',
      'Granulație': '0-1 mm',
      'Reacția la foc': 'Clasa A1',
      'Absorbție apă prin capilaritate': 'W0',
      'Timp de găleată': 'cca. 3 ore',
      'Grosime aplicare': '10-25 mm/strat',
      'Consum': 'cca. 10-13 kg/m²/cm',
      'Temperatură aplicare': '+5°C - +35°C',
      'Necesarul de apă': '6,6-7,2 litri / 30 kg'
    },
    // Source: "Consum: cca. 10 - 13 kg / m² / cm"
    // Note  : PDF: consum cca. 10-13 kg/m²/cm. Medie = 11.5 kg/m² la 1 cm (10 mm). kgPerM2PerMm = 11.5/10 = 1.15 kg/m²/mm. La 10 mm grosime: 30 kg / 11.5 kg/m² = 2.61 m²/sac.
    consumption: {
      kgPerM2Standard:     11.5,
      kgPerM2PerMm:        1.15,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        2.61,
      packageDescription:  'sac 30 kg',
      packageSize:         30,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-mpa-35-3',
    category:    'Tencuieli',
    name:        'Baumit MPA 35',
    description: 'Tencuială mecanizată var-ciment, hidrofobată, cu permeabilitate bună la vapori, pentru exterior și interior. Se aplică pe zidării de cărămidă plină sau eficientă și blocuri ceramice, mecanizat sau manual.',
    specs: ['14 kg/m² la 10mm', '1.43 m²/sac 40 kg', 'min +5°C', 'Grupa Mortare: CS II', 'Standard: SR EN 998-1', 'Clasificare: GP-CS II', 'Rezistența la compresiune la 28 zile: > 2.5 N/mm²', 'Aderența la forfecare: > 0.1 N/mm²', 'Rezistența la difuzia vaporilor: 5/20 valoare tabelară', 'Conductivitate termică λ: 0.430 W/mK (valoare tabelară P=50%)', 'Granulă maxim: 1 mm', 'Hidrofobată'],
    keyProperties: {
      'Grupa Mortare': 'CS II',
      'Clasificare': 'GP-CS II',
      'Rezistența la compresiune (28 zile)': '> 2.5 N/mm²',
      'Aderența la forfecare': '> 0.1 N/mm²',
      'Rezistența la difuzia vaporilor': '5/20',
      'Conductivitate termică λ': '0.430 W/mK',
      'Granulă maximă': '1 mm',
      'Necesar apă': '20-22%'
    },
    // Source: "Consum: 14 kg/m² (MPA 35_40 kg) / 14 kg/m²/cm (MPA 35_siloz). Grosime minimă de aplicare: 20 mm/strat. Grosime maximă de"
    // Note  : PDF indică 14 kg/m²/cm adică 14 kg/m² la 10 mm grosime. kgPerM2PerMm = 14/10 = 1.4. La grosimea minimă exterior 20 mm: 28 kg/m². Sac 40 kg la 10 mm: 40/14 = 2.86 m²/sac. La 20 mm: 40/28 = 1.43 m²/sac.
    consumption: {
      kgPerM2Standard:     14,
      kgPerM2PerMm:        1.4,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        1.43,
      packageDescription:  'sac 40 kg',
      packageSize:         40,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-mpi-25-2',
    category:    'Tencuieli',
    name:        'Baumit MPI 25',
    description: 'Tencuială mecanizată var-ciment pentru interior, permeabilă la vapori, care reglează umiditatea în încăpere și asigură un climat interior confortabil. Se aplică manual sau mecanizat pe diverse suporturi, inclusiv în încăperi umede.',
    specs: ['14 kg/m² la 10mm', '1.786 m²/sac 25 kg sau sac 40 kg', 'min +5°C', 'Grupa Mortare: CS II', 'Standard: SR EN 998-1', 'Clasificare: GP - CS II', 'Rezistența la compresiune la 28 zile: > 2.5 N/mm²', 'Aderența la forfecare: 0.08 N/mm²', 'Rezistența la difuzia vaporilor: 5 / 20', 'Conductivitate termică λ: 0.43 W/mK (P=50%)', 'Granulă maximă: 0.6 mm', 'Necesar apă: aprox. 22 - 24%'],
    keyProperties: {
      'Grupa Mortare': 'CS II',
      'Rezistența la compresiune (28 zile)': '> 2.5 N/mm²',
      'Aderența la forfecare': '0.08 N/mm²',
      'Rezistența la difuzia vaporilor': '5 / 20',
      'Conductivitate termică λ': '0.43 W/mK',
      'Granulă maximă': '0.6 mm',
      'Consum': '14 kg/m²/cm',
      'Grosime minimă aplicare': '10 mm',
      'Grosime maximă aplicare': '25 mm'
    },
    // Source: "Consum 14 kg/m²/cm | Acoperire 3 m²/cm/sac (MPI 25_25 kg), 3 m²/cm/sac (MPI 25_40 kg), 72 m²/tonă (MPI 25_siloz) | Grosi"
    // Note  : PDF indică 14 kg/m²/cm (adică 14 kg/m² per 1 cm grosime). kgPerM2PerMm = 14/10 = 1.4 kg/m²/mm. La grosimea minimă de 10 mm: 14 kg/m². Sac 25 kg la 10 mm: 25/14 = 1.786 m²/sac. PDF confirmă 3 m²/cm/sac, adică la 1 cm grosime un sac de 25 kg acoperă ~3 m² (25/3 ≈ 8.33 kg/m² per cm? – discrepanță aparentă, dar 14 kg/m²/cm pare valoarea corectă de consum, iar 3 m²/cm/sac se interpretează ca 3 m² per sac la grosime de 1 cm, ceea ce implică 25/3 ≈ 8.33 dar fișa indică 14; se folosește valoarea explicită 14 kg/m²/cm). Siloz: 72 m²/tonă la 1 cm → 1000/72 = 13.89 ≈ 14 kg/m²/cm, confirmă consumul.
    consumption: {
      kgPerM2Standard:     14,
      kgPerM2PerMm:        1.4,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        1.786,
      packageDescription:  'sac 25 kg sau sac 40 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-ratioglatt-2',
    category:    'Tencuieli',
    name:        'Baumit RatioGlatt',
    description: 'Tencuială glet de ipsos pentru interior, pe bază de ipsos, var pentru construcții și nisipuri fine, destinată prelucrării mecanizate a suprafețelor interioare. Oferă suprafață netedă, gletuită, aplicabilă unistrat, corespunzătoare grupelor de solicitări la umiditate W1, W2 și W3.',
    specs: ['10.5 kg/m² la 10mm', '2.9 m²/sac 30 kg', 'min +5°C', 'Standard: EN 13279-1', 'Clasificare: B2/50/2', 'Rezistența la încovoiere la 28 zile: > 1 N/mm²', 'Rezistența la compresiune la 28 zile: > 2 N/mm²', 'Rezistența la difuzia vaporilor: 10', 'Conductivitate termică λ: 0.600 W/mK', 'Granulă maxim: 0.6 mm', 'Necesar apă: 40 - 49 %'],
    keyProperties: {
      'Rezistența la încovoiere (28 zile)': '> 1 N/mm²',
      'Rezistența la compresiune (28 zile)': '> 2 N/mm²',
      'Rezistența la difuzia vaporilor': '10',
      'Conductivitate termică λ': '0.600 W/mK',
      'Granulă maxim': '0.6 mm',
      'Necesar apă': '40 - 49 %'
    },
    // Source: "Consum: 10.5 kg/m²/cm | Acoperire: 2.9 m²/cm/sac (30 kg) | 95 m²/to /cm | Grosime minimă de aplicare: 10 mm | Grosime ma"
    // Note  : PDF: consum 10.5 kg/m²/cm, adică 10.5 kg/m² la 10 mm grosime. kgPerM2PerMm = 10.5/10 = 1.05 kg/m²/mm. Acoperire sac 30 kg: 2.9 m²/cm/sac (la 10 mm). Verificare: 30/10.5 = 2.857 ≈ 2.9 m²/sac. Acoperire siloz: 95 m²/to/cm → 1000/10.5 = 95.24 ≈ 95 m²/tonă la 10 mm.
    consumption: {
      kgPerM2Standard:     10.5,
      kgPerM2PerMm:        1.05,
      thicknessStandardMm: 10,
      thicknessMinMm:      10,
      thicknessMaxMm:      25,
      m2PerPackage:        2.9,
      packageDescription:  'sac 30 kg',
      packageSize:         30,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-sockelputz-3',
    category:    'Tencuieli',
    name:        'Baumit SockelPutz',
    description: 'Tencuială de ciment hidrofobată, impermeabilă la apă, pentru aplicare manuală și mecanizată. Se utilizează ca tencuială de soclu la interior și exterior, ca suport pentru placări ceramice și ca tencuială armată la lucrări de consolidare.',
    specs: ['32 kg/m² la 20mm', '0.78 m²/sac 25 kg', 'min +5°C', 'Grupa Mortare: CS IV', 'Standard: SR 998-1:2016', 'Clasificare: GP - CS IV - W2', 'Granulă maxim 2 mm', 'Consum: 16 kg/m²/cm', 'Grosime minimă aplicare: 20 mm', 'Grosime maximă aplicare: 25 mm', 'Necesar apă: 4-5 l/sac'],
    keyProperties: {
      'Rezistența la încovoiere': '> 1.5 N/mm²',
      'Rezistența la încovoiere la 28 zile (mecanizat)': '> 3 N/mm²',
      'Rezistența la compresiune (manual)': '> 5 N/mm²',
      'Rezistența la compresiune la 28 zile (mecanizat)': '> 10 N/mm²',
      'Aderența la forfecare': '> 0.1 N/mm²',
      'Rezistența la difuzia vaporilor': '15 / 35 tabelar',
      'Conductivitate termică': '< 0.460 W/mK (manual)',
      'Granulă maxim': '2 mm'
    },
    // Source: "Consum 16 kg/m²/cm"
    // Note  : PDF: 16 kg/m²/cm = 1.6 kg/m²/mm. La grosimea minimă de 20 mm: 1.6 × 20 = 32 kg/m². m²/sac la 20 mm: 25 / 32 = 0.78 m²/sac. La 25 mm: 1.6 × 25 = 40 kg/m², 25/40 = 0.625 m²/sac.
    consumption: {
      kgPerM2Standard:     32,
      kgPerM2PerMm:        1.6,
      thicknessStandardMm: 20,
      thicknessMinMm:      20,
      thicknessMaxMm:      25,
      m2PerPackage:        0.78,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'primus-mortar-tencuiala-2',
    category:    'Tencuieli',
    name:        'PRIMUS Mortar Tencuială',
    description: 'Mortar pe bază de ciment pentru tencuieli interioare și exterioare, aplicabil mecanizat sau manual. Asigură aderență bună la tencuieli, betoane și zidării, cu grosimea stratului de 3-4 cm dintr-o mână.',
    specs: ['13 kg/m² la 10mm', '0.96 m²/sac 25 kg', 'min +5°C', 'Clasificare SR EN 998-1: GP-CSIII/Wo', 'Compoziție: ciment, aditivi, nisip și alte agregate', 'Granulație: 1 mm', 'Densitate: 1,25 kg/dm³', 'Rezistență la compresiune: clasa CS III (3,5 ÷ 7,5 N/mm²)', 'Absorbție de apă prin capilaritate: WcO', 'Conductivitate termică: 0,33 W/mK', 'Aderență și mod de rupere: 0,29 N/mm² - FP:B', 'Coeficient de permeabilitate la vaporii de apă: μ=5/20', 'Proporție de amestec: 25 kg praf în 5,5 ÷ 6 litri apă', 'Timp de punere în operă: 1 oră', 'Timp de uscare: 7 zile/cm grosime', 'Clasa de reacție la foc: A1'],
    keyProperties: {
      'Clasificare': 'GP-CSIII/Wo',
      'Granulație': '1 mm',
      'Densitate': '1,25 kg/dm³',
      'Rezistență la compresiune': 'clasa CS III (3,5 ÷ 7,5 N/mm²)',
      'Conductivitate termică': '0,33 W/mK',
      'Aderență': '0,29 N/mm² - FP:B',
      'Coeficient permeabilitate vapori': 'μ=5/20',
      'Consum': '12 ÷ 14 kg/m², cm',
      'Culoare': 'gri',
      'Clasa de reacție la foc': 'A1'
    },
    // Source: "Consum: 12 ÷ 14 kg/m², cm. Randamentul materialului este de 12÷14 kg/m² la fiecare cm de grosime a stratului. Grosimea n"
    // Note  : PDF: Consum 12÷14 kg/m² per cm grosime. Medie = 13 kg/m²/cm = 1.3 kg/m²/mm. La grosime standard de 10 mm: 13 kg/m². La grosimea normală recomandată de 20-25 mm: 26-32.5 kg/m². Sac 25 kg la 10 mm grosime: 25/13 = 1.92 m²/sac. La grosimea tipică de 20 mm: 25/26 = 0.96 m²/sac.
    consumption: {
      kgPerM2Standard:     13,
      kgPerM2PerMm:        1.3,
      thicknessStandardMm: 10,
      thicknessMinMm:      20,
      thicknessMaxMm:      40,
      m2PerPackage:        0.96,
      packageDescription:  'sac 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-duotop',
    category:    'Tencuieli',
    name:        'Baumit DuoTop',
    description: 'Tencuială decorativă în strat subțire gata preparată pe bază de rășini sintetice, în structură striată (R) sau periată (K), colorată în masă pentru exterior. Rezistentă la intemperii, cu absorbție redusă de apă și permeabilă la vapori.',
    specs: ['2.5 kg/m²', '10 m²/găleată 25 kg', 'min +5°C', 'Clasa de rezistență la foc: A2 s1 d0', 'Rezistența la smulgere: > 0.3 MPa', 'Densitate: aprox. 1.8 kg/dm³', 'Permeabilitatea la vaporii de apă: V2', 'Conductivitate termică λ: aprox. 0.700 W/mK', 'Valoare W: W2', 'Culoare: paletarul Baumit Life, coduri cu terminațiile 6-9'],
    keyProperties: {
      'Clasa rezistență la foc': 'A2 s1 d0',
      'Rezistența la smulgere': '> 0.3 MPa',
      'Densitate': 'aprox. 1.8 kg/dm³',
      'Permeabilitate vapori apă': 'V2',
      'Conductivitate termică': 'aprox. 0.700 W/mK',
      'Valoare W': 'W2',
      'Consum DuoTop 1.5 K': '2.5 kg/m²',
      'Consum DuoTop 2R': '2.6 kg/m²'
    },
    // Source: "DuoTop 1.5 K: Acoperire 10 m²/25kg, Consum 2.5 kg/m²; DuoTop 2R: Acoperire 9.6 m²/25kg, Consum 2.6 kg/m²"
    // Note  : DuoTop 1.5 K: 2.5 kg/m², 25kg/2.5=10 m²/găleată. DuoTop 2R: 2.6 kg/m², 25kg/2.6≈9.6 m²/găleată. Se folosește valoarea DuoTop 1.5 K ca standard (2.5 kg/m²). Grosimea nu este specificată explicit, se aplică la grosimea granulei.
    consumption: {
      kgPerM2Standard:     2.5,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        10,
      packageDescription:  'găleată 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'baumit-granoportop',
    category:    'Tencuieli',
    name:        'Baumit GranoporTop',
    description: 'Tencuială decorativă organică în strat subțire, gata preparată, disponibilă în structură striată (K) sau periată (R), pentru exterior. Element component al sistemelor termoizolante Baumit Star și Baumit Pro. Disponibilă în granulații de 1,5 / 2,0 / 3,0 mm.',
    specs: ['2.9 kg/m²', '8.6 m²/Găleată 25 kg', 'min +5°C', 'Granulație: 1,5 / 2,0 / 3,0 mm', 'Densitate: cca. 1,8 kg/dm³', 'Conductivitate termică: cca. 0,7 W/mK', 'Factor rezistență permeabilitate vapori (μ): cca. 110-140', 'Absorbția de apă (W): ≤ 0,2 kg/(m²h⁰·⁵)', 'Aderența la suport: > 0,3 MPa', 'Liant organic, granule de marmură, fibre, pigmenți albi și colorați, adaosuri și apă'],
    keyProperties: {
      'Granulație': '1,5 / 2,0 / 3,0 mm',
      'Densitate': 'cca. 1,8 kg/dm³',
      'Conductivitate termică': 'cca. 0,7 W/mK',
      'Factor μ': 'cca. 110-140',
      'Absorbție apă': '≤ 0,2 kg/(m²h⁰·⁵)',
      'Aderență la suport': '> 0,3 MPa'
    },
    // Source: "Structura 1,5 K | 2K | 3K | 2R | 3R\nConsum kg/m² cca. 2,5 | cca. 2,9 | cca. 3,9 | cca. 2,8 | cca. 3,9\nConsumurile prezen"
    // Note  : Consum variabil pe structură: 1,5K=2,5 kg/m², 2K=2,9 kg/m², 3K=3,9 kg/m², 2R=2,8 kg/m², 3R=3,9 kg/m². Se aplică la grosimea granulei, nu la grosime variabilă. Valoarea standard aleasă: 2K = 2,9 kg/m² (cea mai uzuală). m²/găleată = 25/2,9 ≈ 8,6 m². În practică se adaugă 10% pierderi.
    consumption: {
      kgPerM2Standard:     2.9,
      kgPerM2PerMm:        null,
      thicknessStandardMm: null,
      thicknessMinMm:      null,
      thicknessMaxMm:      null,
      m2PerPackage:        8.6,
      packageDescription:  'Găleată 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  },

  {
    id:          'sarcom-sticky-mozaic',
    category:    'Finisaje',
    name:        'Tencuiala Decorativa Sticky Mozaic',
    description: 'Tencuială decorativă pe bază de copolimeri acrilici în dispersie apoasă, cu granule de cuart colorat și aditivi de finisare. Se recomandă pentru protejarea și finisarea decorativă a suprafețelor interioare și exterioare din beton, gleturi, zidărie și gips carton, în special pentru soclu și detalii decorative la interior.',
    specs: ['4 kg/m² la 1.8mm', '6.25 m²/găleată 25 kg', 'min +15°C', 'Conținut nevolatile: 80 ± 3%', 'Granule de cuart colorat 1,2-1,8 mm', 'Gama culori: M 302, M 602, M 703, M 803', 'Aspect peliculă: dură, uniformă, cu aspect mozaic', 'Putere de acoperire: 1 strat', 'COV maxim produs gata de utilizare: 40 g/l'],
    keyProperties: {
      'Conținut nevolatile': '80 ± 3%',
      'Granule cuart': '1,2-1,8 mm',
      'Timp uscare parțial (20°C)': '24 ore',
      'Timp uscare total (20°C)': '72 ore',
      'Consum specific': '3,5 – 4,5 kg/m²',
      'Grosime aplicare strat': '~1,8 mm',
      'Putere de acoperire': '1 strat',
      'COV limita UE cat A/c': '40 g/l',
      'COV maxim produs': '40 g/l'
    },
    // Source: "6. Consum specific: 3,5 – 4,5 kg/m² in functie de natura suportului si structura dorita. Valoarea exacta a consumului se"
    // Note  : PDF: consum specific 3,5-4,5 kg/m². Valoare medie 4,0 kg/m². Strat de ~1,8 mm conform indicațiilor de aplicare. kgPerM2PerMm = 4,0/1,8 ≈ 2,22. Ambalare 25 kg → 25/4,0 = 6,25 m²/găleată. Interval: min 25/4,5=5,56 m², max 25/3,5=7,14 m².
    consumption: {
      kgPerM2Standard:     4,
      kgPerM2PerMm:        2.22,
      thicknessStandardMm: 1.8,
      thicknessMinMm:      1.8,
      thicknessMaxMm:      1.8,
      m2PerPackage:        6.25,
      packageDescription:  'găleată 25 kg',
      packageSize:         25,
      packageUnit:         'kg',
      kgPerM3:             null,
      unitsPerM2:          null,
      kgPerUnit:           null,
    },
  }
] as const
