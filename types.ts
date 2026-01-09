export interface Product {
  id: string;
  reference: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  availableSizes: string[];
  availableColors: string[];
  unitsPerBox: number; // New field: Number of individual pieces inside one box
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number; // Represents number of BOXES
}

export type Order = CartItem[];

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}