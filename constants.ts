import { Product } from './types';

export const WHATSAPP_NUMBER = "5547996214129"; 

export const PRODUCTS: Product[] = [
  // --- INVERNO FEMININO 2026 ---
  {
    id: 'fem-001',
    reference: '01.002296',
    name: 'Jaqueta P.U Macio c/ Elastano',
    description: 'Jaqueta feminina em P.U macio com elastano, conforto extremo e corte acinturado.',
    price: 109.90,
    category: 'Inverno Fem 2026',
    imageUrl: 'https://images.unsplash.com/photo-1551028919-ac7fa7ea47ea?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Café', 'Marrom'],
    unitsPerBox: 0
  },
  {
    id: 'fem-002',
    reference: '01.002297',
    name: 'Jaqueta P.U c/ Forro',
    description: 'Jaqueta clássica em P.U com forro interno, ideal para dias mais frios.',
    price: 109.90,
    category: 'Inverno Fem 2026',
    imageUrl: 'https://images.unsplash.com/photo-1521223619409-112f68436270?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Café', 'Marrom'],
    unitsPerBox: 0
  },
  {
    id: 'fem-003',
    reference: '01.002348',
    name: 'Parka Fem Sarja',
    description: 'Parka feminina em sarja com capuz, cordão de ajuste na cintura.',
    price: 89.90,
    category: 'Inverno Fem 2026',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Verde Militar', 'Caqui'],
    unitsPerBox: 0
  },
  {
    id: 'fem-004',
    reference: '01.002331',
    name: 'Capa Fem (Corta Vento)',
    description: 'Estilo corta vento leve com pelinho por dentro. Muito confortável.',
    price: 44.90,
    category: 'Inverno Fem 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G'],
    availableColors: ['Preto', 'Caqui', 'Areia'],
    unitsPerBox: 0
  },
  {
    id: 'fem-005',
    reference: '01.002356',
    name: 'Casaco Fem Camurça',
    description: 'Casaco sofisticado com textura de camurça.',
    price: 99.90,
    category: 'Inverno Fem 2026',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Café', 'Camel'],
    unitsPerBox: 0
  },
  {
    id: 'fem-006',
    reference: '01.002313',
    name: 'Jaqueta Capuz Removível',
    description: 'Jaqueta puffer com capuz removível, sem pelo.',
    price: 59.90,
    category: 'Inverno Fem 2026',
    imageUrl: 'https://images.unsplash.com/photo-1545622966-bf7b8abe80f6?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Rosa', 'Azul'],
    unitsPerBox: 0
  },

  // --- INVERNO MODAL FEMININO ---
  {
    id: 'modal-001',
    reference: '01.002358',
    name: 'Térmica Feminina Básica',
    description: 'Blusa térmica essencial, 90% Poliéster 10% Elastano. P ao GG.',
    price: 14.90,
    category: 'Inverno Modal Fem',
    imageUrl: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Branco', 'Bege', 'Caqui'],
    unitsPerBox: 0
  },
  {
    id: 'modal-002',
    reference: '01.002272',
    name: 'Blusa Segunda Pele',
    description: 'Blusa manga longa segunda pele, gola O. Ref: 01.002272.',
    price: 22.90,
    category: 'Inverno Modal Fem',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['U'],
    availableColors: ['Preto', 'Branco', 'Bege', 'Vermelho'],
    unitsPerBox: 0
  },
  {
    id: 'modal-003',
    reference: '01.002289',
    name: 'Blusa Modal Com Gola',
    description: 'Blusa em tricô modal com gola polo elegante.',
    price: 32.90,
    category: 'Inverno Modal Fem',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['U'],
    availableColors: ['Preto', 'Branco', 'Café', 'Cinza'],
    unitsPerBox: 0
  },
  {
    id: 'modal-004',
    reference: '01.002276',
    name: 'Blusa Modal Trançada',
    description: 'Blusa modal com detalhes em trança frontal.',
    price: 42.90,
    category: 'Inverno Modal Fem',
    imageUrl: 'https://images.unsplash.com/photo-1596706066224-340d2d31da90?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['U'],
    availableColors: ['Azul Claro', 'Rosa', 'Bege'],
    unitsPerBox: 0
  },

  // --- INVERNO MASCULINO 2026 ---
  {
    id: 'masc-001',
    reference: '02.002968',
    name: 'Suéter Masc Tricô Gola Redonda',
    description: 'Suéter básico gola careca, acabamento premium.',
    price: 32.90,
    category: 'Inverno Masc 2026',
    imageUrl: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Marinho', 'Chumbo', 'Mescla'],
    unitsPerBox: 0
  },
  {
    id: 'masc-002',
    reference: '02.002983',
    name: 'Suéter Masc Trabalhado c/ Zíper',
    description: 'Suéter com trama trabalhada e zíper na gola.',
    price: 49.90,
    category: 'Inverno Masc 2026',
    imageUrl: 'https://images.unsplash.com/photo-1624623278313-a930126a11c3?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Preto', 'Marinho', 'Bege'],
    unitsPerBox: 0
  },
  {
    id: 'masc-003',
    reference: '02.002917',
    name: 'Jaqueta Masc Lã Batida',
    description: 'Jaqueta elegante estilo lã batida com botões.',
    price: 92.90,
    category: 'Inverno Masc 2026',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G'],
    availableColors: ['Preto', 'Café'],
    unitsPerBox: 0
  },
  {
    id: 'masc-004',
    reference: '02.003246',
    name: 'Jaqueta Masc P.U Forro Tecido',
    description: 'Jaqueta de couro sintético (P.U) com forro em tecido confortável.',
    price: 94.90,
    category: 'Inverno Masc 2026',
    imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G'],
    availableColors: ['Preto'],
    unitsPerBox: 0
  },
  {
    id: 'masc-005',
    reference: '02.002760',
    name: 'Casaco Moletom Com Zíper',
    description: 'Casaco de moletom com pelúcia por dentro e zíper.',
    price: 59.90,
    category: 'Inverno Masc 2026',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Marinho/Cinza', 'Preto/Cinza'],
    unitsPerBox: 0
  },

  // --- INVERNO INFANTO JUVENIL MASCULINO ---
  {
    id: 'inf-masc-001',
    reference: '08.008074',
    name: 'Jaqueta Bebê Pelúcia (1/2/3)',
    description: 'Jaqueta bebê tamanhos 1, 2 e 3 com pelúcia por dentro.',
    price: 39.90,
    category: 'Inverno Infanto Juv Masc',
    imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['1', '2', '3'],
    availableColors: ['Preto', 'Marinho', 'Caqui'],
    unitsPerBox: 0
  },
  {
    id: 'inf-masc-002',
    reference: '07.007178',
    name: 'Térmica Infantil (4-10)',
    description: 'Blusa térmica infantil poliéster com elastano.',
    price: 11.90,
    category: 'Inverno Infanto Juv Masc',
    imageUrl: 'https://images.unsplash.com/photo-1519238263496-636190548ace?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['4', '6', '8', '10'],
    availableColors: ['Preto', 'Marinho', 'Chumbo', 'Branco'],
    unitsPerBox: 0
  },
  {
    id: 'inf-masc-003',
    reference: '06.006151',
    name: 'Térmica Juvenil (12-16)',
    description: 'Blusa térmica juvenil poliéster com elastano.',
    price: 12.90,
    category: 'Inverno Infanto Juv Masc',
    imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['12', '14', '16'],
    availableColors: ['Preto', 'Branco', 'Bege', 'Caqui'],
    unitsPerBox: 0
  },
  {
    id: 'inf-masc-004',
    reference: '06.006145',
    name: 'Calça Juvenil Dry Fit',
    description: 'Calça juvenil tecido Dry Fit, não faz bolinha.',
    price: 22.90,
    category: 'Inverno Infanto Juv Masc',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['12', '14', '16'],
    availableColors: ['Preto', 'Marinho'],
    unitsPerBox: 0
  },
  {
    id: 'inf-masc-005',
    reference: '06.006138',
    name: 'Jaqueta Juvenil Sem Pelo',
    description: 'Jaqueta juvenil (12/14/16) sem pelo interno.',
    price: 74.90,
    category: 'Inverno Infanto Juv Masc',
    imageUrl: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['12', '14', '16'],
    availableColors: ['Preto', 'Marinho'],
    unitsPerBox: 0
  },

  // --- INVERNO INFANTO JUVENIL FEMININO ---
  {
    id: 'inf-fem-001',
    reference: '5005064',
    name: 'Casaco Tricô Bebê',
    description: 'Casaquinho de tricô delicado para bebê.',
    price: 25.90,
    category: 'Inverno Infanto Juv Fem',
    imageUrl: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['1', '2', '3'],
    availableColors: ['Rosa', 'Branco'],
    unitsPerBox: 0
  },
  {
    id: 'inf-fem-002',
    reference: '5005068',
    name: 'Moletom Liso Bebê',
    description: 'Conjunto de moletom liso quentinho.',
    price: 39.90,
    category: 'Inverno Infanto Juv Fem',
    imageUrl: 'https://images.unsplash.com/photo-1530281098228-3e98b0021c37?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['1', '2', '3'],
    availableColors: ['Pink', 'Rosa', 'Lilás'],
    unitsPerBox: 0
  },
  {
    id: 'inf-fem-003',
    reference: '05.005082',
    name: 'Jaqueta Fem Inf (1-3) Com Pelo',
    description: 'Jaqueta infantil feminina tamanhos 1 a 3 com forro de pelo.',
    price: 64.90,
    category: 'Inverno Infanto Juv Fem',
    imageUrl: 'https://images.unsplash.com/photo-1606411586523-242813df9736?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['1', '2', '3'],
    availableColors: ['Preto', 'Pink', 'Rosa'],
    unitsPerBox: 0
  },
  {
    id: 'inf-fem-004',
    reference: '04.004146',
    name: 'Blusa Fem Viscose (4-10)',
    description: 'Blusa feminina infantil em viscose (30% poliéster).',
    price: 26.90,
    category: 'Inverno Infanto Juv Fem',
    imageUrl: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['4', '6', '8', '10'],
    availableColors: ['Preto', 'Branco', 'Cinza', 'Caqui', 'Bege'],
    unitsPerBox: 0
  },
  {
    id: 'inf-fem-005',
    reference: '03.003164',
    name: 'Térmica Juvenil Fem (12-16)',
    description: 'Blusa térmica feminina juvenil poliéster com elastano.',
    price: 12.90,
    category: 'Inverno Infanto Juv Fem',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
    availableSizes: ['12', '14', '16'],
    availableColors: ['Preto', 'Branco', 'Bege', 'Caqui'],
    unitsPerBox: 0
  }
];

export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)));