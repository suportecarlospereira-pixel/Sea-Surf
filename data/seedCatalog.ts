import { Product } from '../types';

// Função auxiliar para gerar URL de imagem confiável
const getPlaceholderImage = (text: string) => 
  `https://placehold.co/400x600/1e293b/FFF?text=${text}`;

export const initialProducts: Omit<Product, 'id'>[] = [
  {
    name: "Camiseta Basic Ocean",
    reference: "01.002281",
    imageUrl: getPlaceholderImage("Basic+Ocean"),
    price: 89.90,
    description: "Camiseta básica em algodão premium com toque macio.",
    category: "Camisetas",
    availableSizes: ["P", "M", "G", "GG"],
    availableColors: ["Azul Marinho", "Branco", "Preto"],
    unitsPerBox: 0
  },
  {
    name: "Bermuda Surf Pro",
    reference: "02.001150",
    imageUrl: getPlaceholderImage("Surf+Pro"),
    price: 129.90,
    description: "Bermuda água com tecnologia de secagem rápida.",
    category: "Bermudas",
    availableSizes: ["38", "40", "42", "44"],
    availableColors: ["Preto/Cinza", "Azul/Verde"],
    unitsPerBox: 0
  },
  {
    name: "Kit Meias Cano Baixo",
    reference: "03.005520",
    imageUrl: getPlaceholderImage("Kit+Meias"),
    price: 49.90,
    description: "Kit com 3 pares de meias cano baixo esportivas.",
    category: "Acessórios",
    availableSizes: ["38-42"],
    availableColors: ["Branco"],
    unitsPerBox: 12
  },
  {
    name: "Boné Snapback Sea",
    reference: "04.003310",
    imageUrl: getPlaceholderImage("Bone+Sea"),
    price: 79.90,
    description: "Boné estilo snapback com bordado em relevo.",
    category: "Acessórios",
    availableSizes: ["Único"],
    availableColors: ["Preto", "Azul"],
    unitsPerBox: 0
  }
];
