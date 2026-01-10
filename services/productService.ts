import { db, storage } from "./firebase";
import { 
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "../types";

const PRODUCTS_COLLECTION = "products";

// Buscar todos os produtos
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};

// Salvar imagem no Storage
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw error;
  }
};

// Adicionar produto
export const addProductToDb = async (product: Omit<Product, "id">): Promise<Product> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
    return { ...product, id: docRef.id };
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
};

// Atualizar produto
export const updateProductInDb = async (product: Product): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, product.id);
    // Remove o ID do objeto antes de enviar para não duplicar dados
    const { id, ...data } = product;
    await updateDoc(productRef, data);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};

// Deletar produto
export const deleteProductFromDb = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};
