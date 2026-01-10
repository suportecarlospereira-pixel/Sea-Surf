import { Product } from "../types";

export const INITIAL_CATALOG: Omit<Product, "id" | "imageUrl">[] = [
  // =================================================================
  // ARQUIVO: CAT. INV. INF. JUV. MASC. 26.pdf
  // =================================================================
  {
    reference: "08.008074",
    name: "Jaqueta Bebê Pelúcia Interna",
    price: 39.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta bebê com pelúcia por dentro. Tamanhos 1/2/3.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Preto", "Marsh", "Variadas"]
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
    description: "Conjunto bebê poliéster.",
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
    availableColors: ["New York", "23", "Variadas"]
  },
  {
    reference: "08.008076",
    name: "Conjunto Bebê Pelúcia",
    price: 39.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Conjunto bebê peluciado.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Variadas"]
  },
  {
    reference: "08.008077",
    name: "Conjunto Bebê Pelúcia",
    price: 39.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Conjunto bebê peluciado.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Variadas"]
  },
  {
    reference: "08.008078",
    name: "Conjunto Bebê Dry Fit",
    price: 39.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Conjunto bebê Dry Fit não faz bolinha.",
    availableSizes: ["1", "2", "3"],
    availableColors: ["Variadas"]
  },
  // -- Fim do catálogo (Páginas finais) --
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
    reference: "06.006118",
    name: "Jaqueta Juvenil Sem Pelo",
    price: 74.90,
    unitsPerBox: 18,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Jaqueta juvenil.",
    availableSizes: ["12", "14", "16"],
    availableColors: ["BK", "Variadas"]
  },
  {
    reference: "06.006120",
    name: "Casaco Moletom Juvenil",
    price: 49.90,
    unitsPerBox: 24,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Casaco de moletom juvenil.",
    availableSizes: ["12", "14", "16"],
    availableColors: ["New York City", "Variadas"]
  },
  {
    reference: "06.006122",
    name: "Teddy Juvenil",
    price: 59.90,
    unitsPerBox: 18,
    category: "CAT. INV. INF. JUV. MASC. 26",
    description: "Casaco Teddy Juvenil.",
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


  // =================================================================
  // ARQUIVO: CAT. INV. MASC. 26.pdf
  // =================================================================
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
    availableColors: ["Preto", "Marinho", "Chumbo", "Mescla"]
  },
  {
    reference: "02.002970",
    name: "Suéter Masc Gola Alta Zíper",
    price: 34.90,
    unitsPerBox: 30,
    category: "CAT. INV. MASC. 26",
    description: "Suéter com gola mais alta e zíper.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Marinho", "Mescla"]
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
    reference: "02.002984",
    name: "Blusa Masc Trabalhada Gola Redonda",
    price: 49.90,
    unitsPerBox: 24,
    category: "CAT. INV. MASC. 26",
    description: "Blusa masculina trabalhada.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  // -- Fim do catálogo --
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
    availableColors: ["Preto", "Chumbo", "Marinho"]
  },
  {
    reference: "02.002946",
    name: "Calça Masc Dry Fit Plus Size",
    price: 34.90,
    unitsPerBox: 30,
    category: "CAT. INV. MASC. 26",
    description: "Calça Dry Fit Plus Size.",
    availableSizes: ["G1", "G2", "G3"],
    availableColors: ["Marinho", "Variadas"]
  },
  {
    reference: "9200075",
    name: "Calça Masc c/ Elastano",
    price: 0,
    unitsPerBox: 0,
    category: "CAT. INV. MASC. 26",
    description: "Calça masculina com elastano.",
    availableSizes: ["38", "40", "42", "44", "46", "48"],
    availableColors: ["Variadas"]
  },
  {
    reference: "9200076",
    name: "Calça Masc c/ Elastano Plus Size",
    price: 0,
    unitsPerBox: 0,
    category: "CAT. INV. MASC. 26",
    description: "Calça masculina com elastano tamanho especial.",
    availableSizes: ["50", "52", "54"],
    availableColors: ["Variadas"]
  },
  {
    reference: "9200110",
    name: "Calça Masc Sarja",
    price: 0,
    unitsPerBox: 0,
    category: "CAT. INV. MASC. 26",
    description: "Calça masculina sarja.",
    availableSizes: ["38", "40", "42", "44", "46", "48"],
    availableColors: ["Variadas"]
  },


  // =================================================================
  // ARQUIVO: CAT. INV. FEM. 26.pdf
  // =================================================================
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
    availableColors: ["Preto", "Marrom"]
  },
  {
    reference: "01.002299",
    name: "Jaqueta P.U Clássica",
    price: 99.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U modelo clássico.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Café"]
  },
  {
    reference: "01.002300",
    name: "Jaqueta P.U",
    price: 99.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Caqui"]
  },
  {
    reference: "01.002301",
    name: "Jaqueta P.U Básica",
    price: 89.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U básica.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Café"]
  },
  {
    reference: "01.002302",
    name: "Jaqueta P.U",
    price: 89.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto"]
  },
  {
    reference: "01.002303",
    name: "Jaqueta P.U",
    price: 89.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Jaqueta P.U.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },
  // -- Fim do catálogo --
  {
    reference: "01.002273",
    name: "Conjunto c/ Faixa",
    price: 62.90,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Conjunto feminino com faixa.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Marinho", "Azul Claro", "Verde"]
  },
  {
    reference: "01.002252",
    name: "Conjunto Fem Liso",
    price: 62.90,
    unitsPerBox: 36,
    category: "CAT. INV. FEM. 26",
    description: "Conjunto feminino liso.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Preto", "Verde", "Rosa"]
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
  {
    reference: "01.002341",
    name: "Conjunto c/ Faixa",
    price: 0,
    unitsPerBox: 0,
    category: "CAT. INV. FEM. 26",
    description: "Conjunto feminino com faixa.",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Variadas"]
  },


  // =================================================================
  // ARQUIVO: CAT. INV. MODAL FEM. 26.pdf
  // =================================================================
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
    availableColors: ["Branco", "Vermelho", "Café", "Preto"]
  },
  {
    reference: "01.002277",
    name: "Blusa Modal",
    price: 34.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa em tecido modal 30% poliéster.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Branco", "Caqui", "Areia"]
  },
  {
    reference: "01.002289",
    name: "Blusa Modal Com Gola",
    price: 32.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal com detalhe na gola.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Branco", "Café", "Cinza"]
  },
  {
    reference: "01.002285",
    name: "Blusa Modal Com Gola",
    price: 32.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal com gola.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Branco", "Azul", "Areia"]
  },
  {
    reference: "01.002262",
    name: "Blusa Modal",
    price: 42.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal diferenciada.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Branco", "Areia", "Cinza"]
  },
  // -- Fim do catálogo --
  {
    reference: "01.002294",
    name: "Casaco Modal Com Touca",
    price: 39.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Casaco modal com capuz.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Marinho", "Areia"]
  },
  {
    reference: "01.002274",
    name: "Blusa Modal",
    price: 32.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal básica.",
    availableSizes: ["U"],
    availableColors: ["Variadas"]
  },
  {
    reference: "01.002267",
    name: "Blusa Modal",
    price: 32.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Café", "Bege"]
  },
  {
    reference: "01.002292",
    name: "Blusa Modal Meio Zíper",
    price: 32.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal com meio zíper.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Branco", "Cinza", "Marrom"]
  },
  {
    reference: "01.002281",
    name: "Casaco Modal De Botão",
    price: 34.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Casaco modal com botões.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Azul Claro", "Café", "Areia"]
  },
  {
    reference: "01.002288",
    name: "Blusa Modal",
    price: 32.90,
    unitsPerBox: 0,
    category: "CAT. INV. MODAL FEM. 26",
    description: "Blusa modal.",
    availableSizes: ["U"],
    availableColors: ["Preto", "Branco", "Amarelo", "Caqui", "Cereja"]
  }
];
