import { Product } from "../types";

export const INITIAL_CATALOG: Omit<Product, "id" | "imageUrl">[] = [
  // --- CAT. INV. INF. JUV. MASC. 26 ---
  {
    reference: "08.008074",
    name: "Jaqueta Bebê Pelúcia Interna",
    price: 39.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta bebê com pelúcia por dentro. Tamanhos 1/2/3.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Preto", "Marsh"]
  },
  {
    reference: "08.008075",
    name: "Jaqueta Bebê Pelúcia",
    price: 48.90,
    unitsPerBox: 18,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta bebê peluciada. Tamanhos 1/2/3.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Variadas"]
  },
  {
    reference: "08.008073",
    name: "Conjunto Bebê Poliéster",
    price: 39.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Conjunto bebê poliéster. Tamanhos 1/2/3.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Variadas"]
  },
  {
    reference: "08.008068",
    name: "Conjunto Bebê Pelúcia",
    price: 42.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Conjunto bebê com pelúcia interna.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Variadas"]
  },
  {
    reference: "06.006138",
    name: "Jaqueta Juvenil Sem Pelo",
    price: 54.90,
    unitsPerBox: 18,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta juvenil sem forro de pelo.",
    availableSizes: ["12", "14", "16"],
    availableColors: ["Variadas"]
  },
  {
    reference: "06.006137",
    name: "Jaqueta Juvenil Sem Pelo",
    price: 62.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta juvenil leve.",
    availableSizes: ["12", "14", "16"],
    availableColors: ["Variadas"]
  },
  {
    reference: "06.006117",
    name: "Jaqueta Juvenil Colegial",
    price: 74.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta estilo colegial juvenil.",
    availableSizes: ["12", "14", "16"],
    availableColors: ["Variadas"]
  },
  {
    reference: "06.006139",
    name: "Jaqueta Juvenil Com Enchimento",
    price: 59.90,
    unitsPerBox: 18,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta juvenil puffer com enchimento.",
    availableSizes: ["12", "14", "16"],
    availableColors: ["Variadas"]
  },

  // --- CAT. INV. MASC. 26 ---
  {
    reference: "02.002968",
    name: "Suéter Masc Tricô Gola Redonda",
    price: 32.90,
    unitsPerBox: 36,
    category: "CAT. INV. MASC. 26",
    description: "Suéter masculino básico gola redonda.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Marinho", "Chumbo", "Mescla"]
  },
  {
    reference: "02.002969",
    name: "Suéter Masc Tricô Gola V",
    price: 32.90,
    unitsPerBox: 36,
    category: "CAT. INV. MASC. 26",
    description: "Suéter masculino gola V.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  {
    reference: "02.002970",
    name: "Suéter Masc Gola Alta Zíper",
    price: 34.90,
    unitsPerBox: 30,
    category: "CAT. INV. MASC. 26",
    description: "Suéter com gola mais alta e zíper.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  {
    reference: "02.002983",
    name: "Suéter Masc Trabalhado Zíper",
    price: 49.90,
    unitsPerBox: 24,
    category: "CAT. INV. MASC. 26",
    description: "Suéter trabalhado com zíper.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Marinho", "Bege"]
  },
  {
    reference: "02.002945",
    name: "Calça Masc Dry Fit Barra Reta",
    price: 29.90,
    unitsPerBox: 24,
    category: "CAT. INV. MASC. 26",
    description: "Calça Dry Fit que não faz bolinha, barra reta.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Marinho", "Mescla"]
  },
  {
    reference: "02.003248",
    name: "Calça Masc Poliéster Plus Size",
    price: 26.90,
    unitsPerBox: 24,
    category: "CAT. INV. MASC. 26",
    description: "Calça poliéster tamanho especial.",
    availableSizes: ["G1", "G2", "G3"],
    availableColors: ["Preto", "Chumbo", "Marinho"]
  },
  {
    reference: "02.002901",
    name: "Calça Masc Dry Plus Size",
    price: 39.90,
    unitsPerBox: 20,
    category: "CAT. INV. MASC. 26",
    description: "Calça Dry não faz bolinha Plus Size.",
    availableSizes: ["G1", "G2", "G3"],
    availableColors: ["Variadas"]
  },

  // --- CAT. INV. FEM. 26 ---
  {
    reference: "01.002296",
    name: "Jaqueta P.U Macio c/ Elastano",
    price: 109.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta feminina P.U macio com elastano.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Café", "Marrom"]
  },
  {
    reference: "01.002297",
    name: "Jaqueta P.U c/ Forro",
    price: 109.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U com forro interno.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002299",
    name: "Jaqueta P.U Clássica",
    price: 99.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U modelo clássico.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002301",
    name: "Jaqueta P.U Básica",
    price: 89.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U básica.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002252",
    name: "Conjunto Fem Liso",
    price: 62.90,
    unitsPerBox: 36,
    category: "CAT. INV. FEM. 26",
    description: "Conjunto feminino liso.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002253",
    name: "Conjunto Moletom Zíper e Capuz",
    price: 69.90,
    unitsPerBox: 18,
    category: "CAT. INV. FEM. 26",
    description: "Conjunto moletom com zíper e capuz.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Rosa", "Caqui"]
  },

  // --- CAT. INV. MODAL FEM. 26 ---
  {
    reference: "01.002358",
    name: "Térmica Feminina P ao GG",
    price: 14.90,
    unitsPerBox: 120,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa térmica feminina básica.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Branco", "Bege"]
  },
  {
    reference: "01.002272",
    name: "Blusa Segunda Pele",
    price: 22.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa segunda pele manga longa.",
    availableSizes: ["U"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002277",
    name: "Blusa Modal",
    price: 34.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa em tecido modal.",
    availableSizes: ["U"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002289",
    name: "Blusa Modal Com Gola",
    price: 32.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal com detalhe na gola.",
    availableSizes: ["U"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002294",
    name: "Casaco Modal Com Touca",
    price: 39.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Casaco modal com capuz.",
    availableSizes: ["U"],
    availableColors: ["Variadas"]
  }
];