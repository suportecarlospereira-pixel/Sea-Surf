import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { uploadImage, updateProductInDb } from '../services/productService';

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
      // Remove a extensão do arquivo para pegar a referência (ex: "01.002296.jpg" -> "01.002296")
      const referenceCode = file.name.split('.').slice(0, -1).join('.').trim(); // Lida com pontos no nome
      
      // Tenta encontrar um produto que tenha EXATAMENTE essa referência
      // Normalizamos para lowercase para evitar erros de digitação
      const product = products.find(p => p.reference.toLowerCase().trim() === referenceCode.toLowerCase().trim());

      if (product) {
        try {
          newLogs.push(`🔄 Enviando imagem para: ${product.name} (Ref: ${referenceCode})...`);
          
          // 1. Upload da Imagem
          const imageUrl = await uploadImage(file);
          
          // 2. Atualizar Produto no Banco
          await updateProductInDb({ ...product, imageUrl });
          
          newLogs.push(`✅ Sucesso: ${product.reference} atualizado.`);
          successCount++;
        } catch (error) {
          console.error(error);
          newLogs.push(`❌ Erro ao atualizar ${referenceCode}: Falha no upload.`);
        }
      } else {
        newLogs.push(`⚠️ Ignorado: Não encontrei produto com referência "${referenceCode}" (Arquivo: ${file.name})`);
      }
    }

    newLogs.push(`🏁 Concluído! ${successCount} produtos atualizados.`);
    setLogs(prev => [...prev, ...newLogs]);
    setIsProcessing(false);
    if (successCount > 0) onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-brand-navy p-4 flex justify-between items-center text-white">
          <h3 className="font-serif font-bold text-lg flex items-center gap-2">
            <Upload size={20} className="text-brand-gold" /> Upload em Massa Inteligente
          </h3>
          <button onClick={onClose} disabled={isProcessing} className="hover:bg-white/20 p-1 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-grow overflow-y-auto space-y-6">
          
          {!isProcessing && logs.length === 0 && (
            <div className="text-center space-y-4">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm text-left border border-blue-100">
                <p className="font-bold flex items-center gap-2 mb-2">
                  <AlertCircle size={16} /> Como funciona:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>O nome do arquivo da imagem deve ser <strong>IGUAL</strong> à Referência do produto.</li>
                  <li>Exemplo: Se a referência é <code>01.002296</code>, o arquivo deve ser <code>01.002296.jpg</code>.</li>
                  <li>Você pode selecionar centenas de fotos de uma vez.</li>
                </ul>
              </div>

              <label className="block mt-8 cursor-pointer group">
                <div className="border-3 border-dashed border-gray-300 rounded-xl p-10 group-hover:border-brand-navy group-hover:bg-brand-navy/5 transition-all">
                  <Upload size={48} className="mx-auto text-gray-400 group-hover:text-brand-navy mb-4" />
                  <span className="text-lg font-bold text-gray-600 group-hover:text-brand-navy">Clique para selecionar imagens</span>
                  <p className="text-sm text-gray-400 mt-2">Suporta JPG, PNG, WEBP</p>
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFiles} 
                  className="hidden" 
                />
              </label>
            </div>
          )}

          {/* Logs Terminal */}
          {(isProcessing || logs.length > 0) && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs h-64 overflow-y-auto shadow-inner">
              {logs.map((log, i) => (
                <div key={i} className={`mb-1 ${log.includes('❌') ? 'text-red-400' : log.includes('⚠️') ? 'text-yellow-400' : ''}`}>
                  {log}
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-center gap-2 mt-2 text-white animate-pulse">
                  <Loader2 size={12} className="animate-spin" /> Processando...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
