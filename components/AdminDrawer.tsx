import React, { useState, useRef, useMemo } from 'react';
import { Product } from '../types';
import { X, Upload, Plus, Save, Trash2, Edit, Search, Tag, CheckSquare, Hash, Loader2 } from 'lucide-react';
import { uploadImage, addProductToDb, updateProductInDb, deleteProductFromDb } from '../services/productService';
import { BulkUploadModal } from './BulkUploadModal';
import { SeedCatalogButton } from './SeedCatalogButton';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onRenameCategory: (oldName: string, newName: string) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({ 
  isOpen, 
  onClose, 
  products,
  onAddProduct, 
  onUpdateProduct,
  onDeleteProduct,
  onRenameCategory
}) => {
  const [mode, setMode] = useState<'create' | 'edit' | 'categories'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    reference: '',
    price: 0,
    description: '',
    category: 'Geral',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Várias'],
    imageUrl: '',
    unitsPerBox: 12
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uniqueCategories = useMemo(() => {
      return Array.from(new Set(products.map(p => p.category))).sort();
  }, [products]);

  const resetForm = () => {
    setFormData({
        name: '',
        reference: '',
        price: 0,
        description: '',
        category: 'Geral',
        availableSizes: ['P', 'M', 'G', 'GG'],
        availableColors: ['Várias'],
        imageUrl: '',
        unitsPerBox: 12
    });
    setEditingId(null);
    setImageFile(null);
  };

  const handleSelectProductToEdit = (product: Product) => {
      setEditingId(product.id);
      setFormData({ ...product });
      setImageFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Criar preview local
      setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.reference) return;

    setIsSaving(true);

    try {
      let finalImageUrl = formData.imageUrl || 'https://via.placeholder.com/400x600?text=Sem+Foto';

      // Se houver um novo arquivo, faz upload para o Firebase Storage
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const productData = {
        name: formData.name!,
        reference: formData.reference!,
        price: Number(formData.price) || 0,
        description: formData.description || '',
        category: formData.category || 'Geral',
        imageUrl: finalImageUrl,
        availableSizes: typeof formData.availableSizes === 'string' ? (formData.availableSizes as string).split(',') : formData.availableSizes!,
        availableColors: typeof formData.availableColors === 'string' ? (formData.availableColors as string).split(',') : formData.availableColors!,
        unitsPerBox: Number(formData.unitsPerBox) || 12
      };

      if (mode === 'create') {
          const newProduct = await addProductToDb(productData);
          onAddProduct(newProduct);
          alert("Produto adicionado com sucesso!");
          resetForm();
      } else {
          const updatedProduct = { ...productData, id: editingId! };
          await updateProductInDb(updatedProduct);
          onUpdateProduct(updatedProduct);
          alert("Produto atualizado com sucesso!");
          resetForm();
          setMode('edit'); // Voltar para lista
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar o produto. Verifique o console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;
    if (window.confirm("Tem certeza que deseja excluir este produto do catálogo?")) {
      setIsSaving(true);
      try {
        await deleteProductFromDb(editingId);
        onDeleteProduct(editingId);
        resetForm();
      } catch (error) {
        alert("Erro ao excluir.");
      } finally {
        setIsSaving(false);
      }
    }
  }

  const handleStartRenameCategory = (catName: string) => {
      setEditingCategory(catName);
      setNewCategoryName(catName);
  };

  const handleSaveRenameCategory = () => {
      if (editingCategory && newCategoryName) {
          onRenameCategory(editingCategory, newCategoryName);
          setEditingCategory(null);
          setNewCategoryName('');
      }
  };

  const filteredEditList = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white z-[60] shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-brand-navy text-white p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                    {mode === 'categories' ? <Tag size={20} className="text-brand-gold" /> : (mode === 'create' ? <Plus size={20} className="text-brand-gold" /> : <Edit size={20} className="text-brand-gold" />)}
                </div>
                <div>
                    <h2 className="font-serif text-xl font-bold">Gestão Sea Surf</h2>
                    <p className="text-xs text-gray-300">
                        {mode === 'create' && 'Cadastrar novo item'}
                        {mode === 'edit' && 'Editar item existente'}
                        {mode === 'categories' && 'Gerenciar Categorias'}
                    </p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
            </button>
          </div>

          <div className="flex bg-brand-navy/50 p-1 rounded-lg gap-1">
              <button 
                onClick={() => { setMode('create'); resetForm(); }}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${mode === 'create' ? 'bg-brand-gold text-brand-navy shadow-sm' : 'text-gray-300 hover:text-white'}`}
              >
                  Novo
              </button>
              <button 
                onClick={() => { setMode('edit'); resetForm(); }}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${mode === 'edit' ? 'bg-brand-gold text-brand-navy shadow-sm' : 'text-gray-300 hover:text-white'}`}
              >
                  Editar
              </button>
              <button 
                onClick={() => { setMode('categories'); resetForm(); }}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${mode === 'categories' ? 'bg-brand-gold text-brand-navy shadow-sm' : 'text-gray-300 hover:text-white'}`}
              >
                  Categorias
              </button>
              <button 
                onClick={() => setIsBulkOpen(true)}
                className="flex-1 py-2 text-xs font-medium rounded-md transition-all text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center gap-1"
                title="Upload em Massa"
              >
                  <Upload size={14} /> Em Massa
              </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto bg-gray-50">
          
          {mode === 'categories' && (
              <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-500 mb-4">Renomeie as categorias abaixo. A alteração afetará todos os produtos vinculados.</p>
                  {uniqueCategories.map(cat => (
                      <div key={cat} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                          {editingCategory === cat ? (
                              <div className="flex items-center gap-2 w-full">
                                  <input 
                                    type="text" 
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="flex-grow p-2 border border-brand-gold rounded focus:outline-none text-sm"
                                    autoFocus
                                  />
                                  <button onClick={handleSaveRenameCategory} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200">
                                      <CheckSquare size={18} />
                                  </button>
                                  <button onClick={() => setEditingCategory(null)} className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                                      <X size={18} />
                                  </button>
                              </div>
                          ) : (
                              <>
                                  <span className="font-medium text-gray-700">{cat}</span>
                                  <button 
                                    onClick={() => handleStartRenameCategory(cat)}
                                    className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded transition-colors"
                                  >
                                      <Edit size={16} />
                                  </button>
                              </>
                          )}
                      </div>
                  ))}
              </div>
          )}
          {/* Área de Ferramentas Avançadas */}
<div className="mt-6 border-t border-gray-100 pt-6">
    <p className="text-xs font-bold text-gray-400 uppercase mb-3 text-center">Ferramentas de Banco de Dados</p>
    <SeedCatalogButton />
</div>

          {mode === 'edit' && !editingId && (
              <div className="p-6">
                  <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Buscar por nome ou referência..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-brand-navy"
                      />
                  </div>
                  <div className="space-y-2">
                      {filteredEditList.map(product => (
                          <div 
                            key={product.id}
                            onClick={() => handleSelectProductToEdit(product)}
                            className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-3 cursor-pointer hover:border-brand-gold hover:shadow-sm transition-all group"
                          >
                              <img src={product.imageUrl} alt="" className="w-12 h-12 object-cover rounded bg-gray-100" />
                              <div className="flex-grow">
                                  <p className="text-xs font-bold text-gray-500">{product.reference}</p>
                                  <h4 className="text-sm font-semibold text-gray-800 group-hover:text-brand-navy">{product.name}</h4>
                              </div>
                              <Edit size={16} className="text-gray-300 group-hover:text-brand-gold" />
                          </div>
                      ))}
                      {filteredEditList.length === 0 && (
                          <p className="text-center text-gray-400 text-sm py-4">Nenhum produto encontrado.</p>
                      )}
                  </div>
              </div>
          )}

          { (mode === 'create' || (mode === 'edit' && editingId)) && (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                
                {mode === 'edit' && (
                    <button 
                        type="button" 
                        onClick={() => { setEditingId(null); resetForm(); }}
                        className="text-xs text-brand-navy underline mb-2"
                    >
                        &larr; Voltar para lista
                    </button>
                )}

                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Foto do Produto</label>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold hover:bg-brand-gold/5 transition-all group relative overflow-hidden bg-white"
                >
                    {formData.imageUrl ? (
                    <img src={formData.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                    <>
                        <div className="bg-gray-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <Upload size={24} className="text-gray-500 group-hover:text-brand-gold" />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Clique para enviar foto</p>
                    </>
                    )}
                    <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                    />
                </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase">Referência</label>
                      <input 
                      type="text" 
                      required
                      placeholder="Ex: 01.002296"
                      value={formData.reference}
                      onChange={e => setFormData({...formData, reference: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold/50 outline-none transition-all text-sm font-mono"
                      />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase">Peças/Caixa</label>
                      <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input 
                          type="number" 
                          required
                          placeholder="Ex: 120"
                          value={formData.unitsPerBox || ''}
                          onChange={e => setFormData({...formData, unitsPerBox: parseInt(e.target.value)})}
                          className="w-full pl-9 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold/50 outline-none transition-all text-sm font-bold text-brand-navy"
                          />
                      </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase">Preço Unitário (R$)</label>
                      <input 
                      type="number" 
                      required
                      step="0.01"
                      placeholder="0,00"
                      value={formData.price || ''}
                      onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold/50 outline-none transition-all text-sm"
                      />
                  </div>
                </div>

                <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase">Nome do Modelo</label>
                <input 
                    type="text" 
                    required
                    placeholder="Ex: Jaqueta P.U Macio"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold/50 outline-none transition-all text-sm"
                />
                </div>

                <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase">Categoria</label>
                <input 
                    type="text" 
                    list="categories-list"
                    placeholder="Ex: Jaquetas"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold/50 outline-none transition-all text-sm"
                />
                <datalist id="categories-list">
                    {uniqueCategories.map(cat => (
                        <option key={cat} value={cat} />
                    ))}
                </datalist>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase">Descrição</label>
                    <textarea 
                        rows={3}
                        placeholder="Detalhes do produto..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold/50 outline-none transition-all text-sm"
                    />
                </div>

                <div className="flex flex-col gap-3 pt-4">
                    <button 
                    type="submit"
                    disabled={isSaving}
                    className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-navy/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                    {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    {mode === 'create' ? 'Adicionar ao Catálogo' : 'Salvar Alterações'}
                    </button>
                    
                    {mode === 'edit' && (
                        <button 
                            type="button"
                            onClick={handleDelete}
                            disabled={isSaving}
                            className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                        >
                            <Trash2 size={16} />
                            Excluir Produto
                        </button>
                    )}
                </div>

            </form>
          )}
        </div>
      </div>

      <BulkUploadModal 
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        products={products}
        onSuccess={() => {
           alert("Importação em massa finalizada!");
           window.location.reload();
        }}
      />
    </>
  );
};
