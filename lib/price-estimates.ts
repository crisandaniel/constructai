// Prețuri estimative RON per sac/unitate — piața românească 2026
// Sursa: estimări manuale bazate pe prețuri cunoscute
// Se vor actualiza automat din devizele salvate în DB

export interface PriceEstimate {
  minRON: number
  maxRON: number
  unit: string
}

// Cheia = material ID din MATERIALS_KB
// Fallback pe categorie dacă nu există ID specific
export const PRICE_BY_MATERIAL: Record<string, PriceEstimate> = {
  // Adezivi
  'baudeman-adf27':           { minRON: 28,  maxRON: 38,  unit: 'sac 25kg' },
  'mapei-keraflex-extra-s1':  { minRON: 55,  maxRON: 75,  unit: 'sac 25kg' },

  // Tencuieli
  'baumit-mpa35':             { minRON: 22,  maxRON: 30,  unit: 'sac 25kg' },
  'baumit-mpa-m':             { minRON: 20,  maxRON: 28,  unit: 'sac 25kg' },

  // Glet / finisaje
  'baumit-feinputz':          { minRON: 35,  maxRON: 50,  unit: 'sac 25kg' },
  'baumit-glattputz':         { minRON: 32,  maxRON: 45,  unit: 'sac 25kg' },

  // Șapă
  'baumit-nivello':           { minRON: 38,  maxRON: 55,  unit: 'sac 25kg' },
}

// Fallback pe categorie
export const PRICE_BY_CATEGORY: Record<string, PriceEstimate> = {
  'Adezivi':             { minRON: 28,  maxRON: 75,  unit: 'sac 25kg' },
  'Tencuieli':           { minRON: 18,  maxRON: 35,  unit: 'sac 25kg' },
  'Finisaje':            { minRON: 30,  maxRON: 55,  unit: 'sac 25kg' },
  'Amorse Grunduri':     { minRON: 40,  maxRON: 80,  unit: 'bidon 10L' },
  'Sapa':                { minRON: 30,  maxRON: 55,  unit: 'sac 25kg' },
}

// Prețuri manoperă estimative RON/m²
export const MANOPERA_BY_WORK: Record<string, { minRON: number; maxRON: number }> = {
  tencuiala:  { minRON: 25,  maxRON: 45  },
  glet:       { minRON: 15,  maxRON: 30  },
  lavabil:    { minRON: 8,   maxRON: 18  },
  faianta:    { minRON: 35,  maxRON: 65  },
  gresie:     { minRON: 30,  maxRON: 60  },
  sapa:       { minRON: 20,  maxRON: 40  },
}

export function getPriceEstimate(materialId: string | null, category: string): PriceEstimate | null {
  if (materialId && PRICE_BY_MATERIAL[materialId]) return PRICE_BY_MATERIAL[materialId]
  if (PRICE_BY_CATEGORY[category]) return PRICE_BY_CATEGORY[category]
  return null
}