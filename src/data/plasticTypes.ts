export interface PlasticType {
  id: number;
  name: string;
  code: string;
  starName: string;
  commonUse: string;
  impact: string;
  pollutionFact: string;
  recyclingRate: string;
  pledge: string;
  pledgeFact: string;
  position: { x: number; y: number };
  shellShape: string;
}

export const plasticTypes: PlasticType[] = [
  {
    id: 1,
    name: "Polyethylene Terephthalate",
    code: "PET/PETE",
    starName: "Polaris",
    commonUse: "Water bottles, food containers, polyester clothing",
    impact: "Takes 450+ years to decompose. Releases microplastics into air and water.",
    pollutionFact: "PET microfibers from synthetic clothing contribute to atmospheric haze, scattering starlight.",
    recyclingRate: "Only 29% recycled globally",
    pledge: "Use a reusable bottle for a week",
    pledgeFact: "One reusable bottle can save ~150 plastic bottles per year.",
    position: { x: 50, y: 15 },
    shellShape: "bottle",
  },
  {
    id: 2,
    name: "High-Density Polyethylene",
    code: "HDPE",
    starName: "Kochab",
    commonUse: "Milk jugs, shampoo bottles, shopping bags",
    impact: "Releases harmful chemicals when exposed to UV light.",
    pollutionFact: "HDPE particles become airborne, adding to light-scattering pollution layers.",
    recyclingRate: "About 30% recycled",
    pledge: "Bring reusable bags for grocery shopping",
    pledgeFact: "A single reusable bag replaces 500+ plastic bags in its lifetime.",
    position: { x: 42, y: 28 },
    shellShape: "jug",
  },
  {
    id: 3,
    name: "Polyvinyl Chloride",
    code: "PVC",
    starName: "Pherkad",
    commonUse: "Pipes, window frames, credit cards, medical tubing",
    impact: "Most hazardous plastic. Releases dioxins when burned.",
    pollutionFact: "Burning PVC releases dense smoke that creates persistent smog layers.",
    recyclingRate: "Less than 1% recycled",
    pledge: "Choose PVC-free products when possible",
    pledgeFact: "Avoiding PVC reduces demand for one of the most toxic plastics.",
    position: { x: 38, y: 42 },
    shellShape: "pipe",
  },
  {
    id: 4,
    name: "Low-Density Polyethylene",
    code: "LDPE",
    starName: "Yildun",
    commonUse: "Plastic wrap, squeezable bottles, grocery bags",
    impact: "Lightweight fragments travel vast distances through atmosphere.",
    pollutionFact: "LDPE particles remain suspended in air, creating a veil that dims starlight.",
    recyclingRate: "About 6% recycled",
    pledge: "Skip the plastic wrap, use beeswax wraps",
    pledgeFact: "Beeswax wraps last a year and replace hundreds of plastic wrap uses.",
    position: { x: 55, y: 38 },
    shellShape: "wrap",
  },
  {
    id: 5,
    name: "Polypropylene",
    code: "PP",
    starName: "Urodelus",
    commonUse: "Yogurt containers, bottle caps, straws, diapers",
    impact: "Breaks into microplastics that contaminate soil and water.",
    pollutionFact: "PP microplastics become airborne, contributing to atmospheric pollution.",
    recyclingRate: "Less than 5% recycled",
    pledge: "Say no to plastic straws",
    pledgeFact: "One person skipping straws saves ~500 straws per year.",
    position: { x: 62, y: 52 },
    shellShape: "straw",
  },
  {
    id: 6,
    name: "Polystyrene",
    code: "PS",
    starName: "Ahfa al Farkadain",
    commonUse: "Styrofoam, disposable cups, packing peanuts, insulation",
    impact: "Extremely difficult to recycle. Toxic when burned.",
    pollutionFact: "Burning polystyrene releases black carbon, blocking starlight at the source.",
    recyclingRate: "Less than 1% recycled",
    pledge: "Refuse styrofoam containers",
    pledgeFact: "Styrofoam never fully degrades—every piece ever made still exists.",
    position: { x: 48, y: 62 },
    shellShape: "cup",
  },
  {
    id: 7,
    name: "Other Plastics",
    code: "OTHER",
    starName: "Alifa al Farkadain",
    commonUse: "Baby bottles, CDs, sunglasses, electronics",
    impact: "Often contains BPA and other harmful chemicals.",
    pollutionFact: "Complex plastics create the most persistent atmospheric pollutants.",
    recyclingRate: "Rarely recycled",
    pledge: "Choose products with simple, recyclable materials",
    pledgeFact: "Simpler plastics are 10x more likely to actually get recycled.",
    position: { x: 35, y: 58 },
    shellShape: "disc",
  },
];

export const constellationLines = [
  [0, 1], // Polaris to Kochab
  [1, 2], // Kochab to Pherkad
  [2, 6], // Pherkad to Alifa
  [6, 5], // Alifa to Ahfa
  [5, 4], // Ahfa to Urodelus
  [4, 3], // Urodelus to Yildun
];