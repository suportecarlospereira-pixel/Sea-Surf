import React, { useState } from 'react';
import { Database, Loader2, Check } from 'lucide-react';
// CORREÇÃO 1: Importar initialProducts (o nome correto que criamos no arquivo de dados)
import { initialProducts } from '../data/seedCatalog';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export const SeedCatalogButton: React.FC<{ onSeed?: () => void }> = ({ onSeed }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [count, setCount] = useState(0);

  const handleSeed = async () => {
    if (!window.confirm(`Isso vai adicionar ${initialProducts.length} produtos do catálogo ao seu banco de dados. Continuar?`)) return;

    setLoading(true);
    let addedCount = 0;

    try {
      const productsRef = collection(db, 'products');

      for (const item of initialProducts) {
        // Verifica se já existe um produto com essa referência para não duplicar
        const q = query(productsRef, where("reference", "==", item.reference));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(productsRef, {
            ...item,
            // CORREÇÃO 2: Usa a imagem que definimos no arquivo de dados (placehold.co),
            // em vez de tentar criar um link novo que estava quebrando.
            imageUrl: item.imageUrl, 
            createdAt: new Date()
          });
          addedCount++;
        }
      }

      setCount(addedCount);
      setStatus('success');
      alert(`Importação concluída! ${addedCount} novos produtos adicionados.`);
      
      // Chama a função de recarregar a tela, se ela existir
      if (onSeed) {
        onSeed();
      } else {
        window.location.reload();
      }
      
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
      className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
    >
      {loading ? (
        <><Loader2 className="animate-spin" size={16} /> Importando Catálogo...</>
      ) : status === 'success' ? (
        <><Check size={16} /> Sucesso ({count} add)</>
      ) : (
        <><Database size={16} /> Popular Banco de Dados</>
      )}
    </button>
  );
};
