import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from './firebase';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

// --- Buscar Produtos ---
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    // Tenta ordenar, se falhar (por falta de índice), pega normal
    const q = query(productsRef); 
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};

// --- Atualizar Produto (Existente) ---
export const updateProductInDb = async (product: Product): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, product.id);
    // Remove o ID do objeto antes de salvar para não duplicar dado
    const { id, ...data } = product; 
    await updateDoc(productRef, data);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};

// --- Adicionar Produto (NOVO - Usado no Upload em Massa) ---
export const addProductToDb = async (productData: Omit<Product, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

// --- Upload de Imagem ---
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Cria um nome único para o arquivo para evitar sobrescrita acidental
    const uniqueName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `products/${uniqueName}`);
    
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw error;
  }
};

// --- Deletar Produto (Opcional, mas útil ter) ---
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};
