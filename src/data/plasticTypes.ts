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
  color: string;
}

// Accurate Ursa Minor (Little Dipper) positions
// The constellation looks like a small ladle/dipper
// Polaris is at the end of the handle (the North Star)
export const plasticTypes: PlasticType[] = [
  {
    id: 1,
    name: "Polyethylene Terephthalate",
    code: "PET",
    starName: "Polaris ⭐",
    commonUse: "Water bottles, food containers, polyester clothing",
    impact: "Takes 450+ years to decompose!",
    pollutionFact: "Tiny plastic fibers from your clothes float in the air and scatter starlight!",
    recyclingRate: "Only 29% gets recycled",
    pledge: "Use a reusable bottle for a week",
    pledgeFact: "One reusable bottle saves ~150 plastic bottles per year!",
    position: { x: 50, y: 10 }, // Polaris - top of handle (North Star)
    color: "#60a5fa", // Blue
  },
  {
    id: 2,
    name: "High-Density Polyethylene", 
    code: "HDPE",
    starName: "Yildun",
    commonUse: "Milk jugs, shampoo bottles, shopping bags",
    impact: "Releases harmful chemicals in sunlight!",
    pollutionFact: "These plastic bits float up into the sky and make it hazy!",
    recyclingRate: "About 30% recycled",
    pledge: "Bring reusable bags for shopping",
    pledgeFact: "One reusable bag replaces 500+ plastic bags!",
    position: { x: 48, y: 25 }, // Second star on handle
    color: "#34d399", // Green
  },
  {
    id: 3,
    name: "Polyvinyl Chloride",
    code: "PVC",
    starName: "Epsilon UMi",
    commonUse: "Pipes, window frames, credit cards",
    impact: "Most dangerous plastic! Toxic when burned.",
    pollutionFact: "When burned, it creates thick smoke that blocks out stars!",
    recyclingRate: "Less than 1% recycled!",
    pledge: "Choose PVC-free products",
    pledgeFact: "Avoiding PVC helps stop toxic smoke!",
    position: { x: 45, y: 40 }, // Middle of handle
    color: "#f472b6", // Pink
  },
  {
    id: 4,
    name: "Low-Density Polyethylene",
    code: "LDPE",
    starName: "Zeta UMi",
    commonUse: "Plastic wrap, squeezable bottles, grocery bags",
    impact: "Super light - floats everywhere in the air!",
    pollutionFact: "These tiny particles float like dust and dim the starlight!",
    recyclingRate: "Only 6% recycled",
    pledge: "Use beeswax wraps instead of plastic wrap",
    pledgeFact: "Beeswax wraps last a whole year!",
    position: { x: 40, y: 55 }, // Connecting handle to bowl
    color: "#fbbf24", // Yellow
  },
  {
    id: 5,
    name: "Polypropylene",
    code: "PP",
    starName: "Eta UMi",
    commonUse: "Yogurt cups, bottle caps, straws",
    impact: "Breaks into microplastics in water and soil!",
    pollutionFact: "Microplastics rise into the air and scatter light!",
    recyclingRate: "Less than 5% recycled",
    pledge: "Say no to plastic straws",
    pledgeFact: "You can save ~500 straws per year!",
    position: { x: 55, y: 65 }, // Bowl - bottom right
    color: "#fb923c", // Orange
  },
  {
    id: 6,
    name: "Polystyrene",
    code: "PS",
    starName: "Pherkad",
    commonUse: "Styrofoam cups, packing peanuts",
    impact: "Almost impossible to recycle! Never goes away.",
    pollutionFact: "Burning styrofoam makes black smoke that blocks stars!",
    recyclingRate: "Less than 1% recycled!",
    pledge: "Refuse styrofoam containers",
    pledgeFact: "Every piece of styrofoam EVER made still exists!",
    position: { x: 70, y: 60 }, // Bowl - right side
    color: "#e879f9", // Purple
  },
  {
    id: 7,
    name: "Other Plastics",
    code: "OTHER",
    starName: "Kochab",
    commonUse: "Baby bottles, CDs, sunglasses, electronics",
    impact: "Contains harmful chemicals like BPA!",
    pollutionFact: "Complex plastics create the longest-lasting pollution!",
    recyclingRate: "Almost never recycled",
    pledge: "Choose simple, recyclable materials",
    pledgeFact: "Simple plastics are 10x more likely to be recycled!",
    position: { x: 72, y: 45 }, // Bowl - top right
    color: "#22d3ee", // Cyan
  },
];

// Lines connecting stars to form the Little Dipper shape
// Handle: 1 -> 2 -> 3 -> 4
// Bowl: 4 -> 5 -> 6 -> 7 -> 4
export const constellationLines = [
  [0, 1], // Polaris to Yildun (handle)
  [1, 2], // Yildun to Epsilon (handle)
  [2, 3], // Epsilon to Zeta (handle to bowl)
  [3, 4], // Zeta to Eta (bowl bottom)
  [4, 5], // Eta to Pherkad (bowl right)
  [5, 6], // Pherkad to Kochab (bowl top)
  [6, 3], // Kochab back to Zeta (close the bowl)
];