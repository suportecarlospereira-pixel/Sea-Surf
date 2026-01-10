import React, { useState } from 'react';
import { Database, Loader2, Check } from 'lucide-react';
import { INITIAL_CATALOG } from '../data/seedCatalog';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export const SeedCatalogButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [count, setCount] = useState(0);

  const handleSeed = async () => {
    if (!window.confirm(`Isso vai adicionar ${INITIAL_CATALOG.length} produtos do catálogo ao seu banco de dados. Continuar?`)) return;

    setLoading(true);
    let addedCount = 0;

    try {
      const productsRef = collection(db, 'products');

      for (const item of INITIAL_CATALOG) {
        // 1. Verifica se já existe um produto com essa referência para não duplicar
        const q = query(productsRef, where("reference", "==", item.reference));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // 2. Se não existe, adiciona
          await addDoc(productsRef, {
            ...item,
            imageUrl: "https://via.placeholder.com/400x600?text=" + item.reference, // Placeholder até você subir as fotos
            createdAt: new Date()
          });
          addedCount++;
        }
      }

      setCount(addedCount);
      setStatus('success');
      alert(`Importação concluída! ${addedCount} novos produtos adicionados.`);
      window.location.reload(); // Recarrega para mostrar os novos itens
    } catch (error) {
      console.error("Erro na importação:", error);
      setStatus('error');
      alert("Erro ao importar catálogo. Veja o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSeed}
      disabled={loading || status === 'success'}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
    >
      {loading ? (
        <><Loader2 className="animate-spin" size={16} /> Importando Catálogo...</>
      ) : status === 'success' ? (
        <><Check size={16} /> Importado ({count} novos)</>
      ) : (
        <><Database size={16} /> Importar Catálogo 2026</>
      )}
    </button>
  );
};
