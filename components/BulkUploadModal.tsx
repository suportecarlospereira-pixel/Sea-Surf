import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Product } from '../types';
// ADICIONAMOS addProductToDb AQUI
import { uploadImage, updateProductInDb, addProductToDb } from '../services/productService';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSuccess: () => void;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose, products, onSuccess }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsProcessing(true);
    setLogs([]);
    const files = Array.from(e.target.files);
    const newLogs: string[] = [];
    let successCount = 0;

    newLogs.push(`📂 Iniciando processamento de ${files.length} imagens...`);

    for (const file of files) {
      // Pega o nome do arquivo sem a extensão para usar como referência
      // Exemplo: "01.002296.jpg" vira "01.002296"
      const referenceCode = file.name.split('.').slice(0, -1).join('.').trim();
      
      try {
        // 1. Upload da Imagem
        newLogs.push(`⬆️ Uploading: ${file.name}...`);
        const imageUrl = await uploadImage(file);

        // 2. Verifica se o produto já existe
        const existingProduct = products.find(p => 
          p.reference.toLowerCase().trim() === referenceCode.toLowerCase().trim()
        );

        if (existingProduct) {
          // --- CENÁRIO A: Produto Existe (Atualiza imagem) ---
          newLogs.push(`🔄 Produto encontrado (${existingProduct.name}). Atualizando foto...`);
          await updateProductInDb({ 
            ...existingProduct, 
            imageUrl: imageUrl 
          });
          newLogs.push(`✅ Foto atualizada para: ${referenceCode}`);
        } else {
          // --- CENÁRIO B: Produto Novo (Cria do zero) ---
          newLogs.push(`✨ Produto não encontrado. Criando novo: ${referenceCode}...`);
          
          const newProductData: Omit<Product, 'id'> = {
            name: referenceCode, // Usa o nome do arquivo como nome do produto
            reference: referenceCode,
            imageUrl: imageUrl,
            price: 0, // Preço padrão (você pode editar depois)
            description: 'Produto importado via upload em massa.',
            category: 'Importados', // Categoria padrão para facilitar a busca
            availableSizes: ['P', 'M', 'G', 'GG'], // Grade padrão
            availableColors: ['Variadas'],
            unitsPerBox: 12
          };

          await addProductToDb(newProductData);
          newLogs.push(`✅ Produto criado com sucesso: ${referenceCode}`);
        }

        successCount++;
        // Atualiza o log visualmente a cada passo
        setLogs([...newLogs]);

      } catch (error) {
        console.error(error);
        newLogs.push(`❌ Erro ao processar ${file.name}`);
        setLogs([...newLogs]);
      }
    }

    newLogs.push(`🏁 Processo finalizado! ${successCount} de ${files.length} imagens processadas.`);
    setLogs([...newLogs]);
    setIsProcessing(false);
    
    // Aguarda um pouco e fecha/atualiza
    setTimeout(() => {
      onSuccess(); // Recarrega os produtos no App
      // onClose(); // Opcional: fechar automaticamente
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Upload className="text-brand-gold" /> Upload em Massa
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Arraste suas fotos. Se o produto não existir, ele será criado automaticamente.
            </p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isProcessing}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex-grow overflow-y-auto">
          {!isProcessing && logs.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative group">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFiles}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="bg-brand-navy/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Upload size={40} className="text-brand-navy" />
              </div>
              <h3 className="font-bold text-lg text-brand-navy mb-2">Clique para selecionar imagens</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Selecione todas as fotos do seu catálogo. O nome do arquivo será usado como Referência.
              </p>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-green-400 h-96 overflow-y-auto shadow-inner">
              {logs.map((log, i) => (
                <div key={i} className="mb-2 border-b border-gray-800 pb-1 last:border-0">
                  {log}
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-center gap-2 text-brand-gold mt-4 animate-pulse">
                  <Loader2 className="animate-spin" size={16} /> Processando próxima imagem...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
