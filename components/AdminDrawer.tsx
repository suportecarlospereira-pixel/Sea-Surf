import React, { useState, useRef, useMemo } from 'react';
import { Product } from '../types';
import { 
  X, Upload, Plus, Save, Trash2, Edit, Search, Lock, Unlock, 
  Loader2, Image as ImageIcon, LayoutDashboard, TrendingUp, Package, Layers, AlertCircle 
} from 'lucide-react';
import { uploadImage, addProductToDb, updateProductInDb, deleteProductFromDb } from '../services/productService';

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
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Management State
  const [mode, setMode] = useState<'dashboard' | 'create' | 'edit' | 'categories'>('dashboard');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Category Management
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // Form State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    reference: '',
    price: 0,
    description: '',
    category: 'Inverno 2026',
    availableSizes: ['P', 'M', 'G', 'GG'],
    availableColors: ['Variadas'],
    imageUrl: '',
    unitsPerBox: 12
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived Data for Dashboard
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, p) => acc + p.price, 0); // Valor unitário somado
    const categoriesCount = new Set(products.map(p => p.category)).size;
    const missingImages = products.filter(p => !p.imageUrl || p.imageUrl.includes('placeholder')).length;
    return { totalProducts, totalValue, categoriesCount, missingImages };
  }, [products]);

  const uniqueCategories = useMemo(() => {
      const cats = new Set(products.map(p => p.category));
      return Array.from(cats).sort();
  }, [products]);

  // --- Auth Logic ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'lulaladrao') {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    resetForm();
    setMode('dashboard');
  };

  // --- Form Logic ---
  const resetForm = () => {
    setFormData({
        name: '',
        reference: '',
        price: 0,
        description: '',
        category: 'Inverno 2026',
        availableSizes: ['P', 'M', 'G', 'GG'],
        availableColors: ['Variadas'],
        imageUrl: '',
        unitsPerBox: 12
    });
    setEditingId(null);
    setImageFile(null);
    setPreviewUrl(null);
    setIsCreatingCategory(false);
  };

  const handleSelectProductToEdit = (product: Product) => {
      setEditingId(product.id);
      setFormData({ ...product });
      setPreviewUrl(product.imageUrl);
      setImageFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- Category Creation Logic ---
  const handleStartCreateCategory = () => {
      setIsCreatingCategory(true);
      setNewCategoryName('');
  };

  const handleConfirmCreateCategory = () => {
      if (!newCategoryName.trim()) return;
      
      // Prepara o formulário de criação de produto com a nova categoria já setada
      resetForm();
      setFormData(prev => ({ ...prev, category: newCategoryName.trim() }));
      setMode('create');
      setIsCreatingCategory(false);
      
      // Feedback visual (pode ser substituído por Toast no App principal, mas aqui usamos alert simples por enquanto)
      alert(`Categoria "${newCategoryName}" iniciada! Agora adicione o primeiro produto para ela aparecer no catálogo.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.reference) return;

    setIsSaving(true);

    try {
      let finalImageUrl = formData.imageUrl || '';

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
        availableSizes: typeof formData.availableSizes === 'string' ? (formData.availableSizes as string).split(',').map(s => s.trim()) : formData.availableSizes!,
        availableColors: typeof formData.availableColors === 'string' ? (formData.availableColors as string).split(',').map(s => s.trim()) : formData.availableColors!,
        unitsPerBox: Number(formData.unitsPerBox) || 0
      };

      if (mode === 'create') {
          const newProduct = await addProductToDb(productData);
          onAddProduct(newProduct);
          alert("Produto cadastrado com sucesso!");
          resetForm();
      } else {
          const updatedProduct = { ...productData, id: editingId! };
          await updateProductInDb(updatedProduct);
          onUpdateProduct(updatedProduct);
          alert("Produto atualizado com sucesso!");
          resetForm();
          setMode('edit'); 
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar. Verifique o console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;
    if (window.confirm("ATENÇÃO: Isso excluirá o produto permanentemente. Confirmar?")) {
      setIsSaving(true);
      try {
        await deleteProductFromDb(editingId);
        onDeleteProduct(editingId);
        resetForm();
        setMode('edit');
      } catch (error) {
        alert("Falha ao excluir.");
      } finally {
        setIsSaving(false);
      }
    }
  }

  const handleSaveRenameCategory = () => {
      if (editingCategory && newCategoryName && newCategoryName !== editingCategory) {
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
        <div className="bg-brand-navy text-white p-6 shadow-md flex justify-between items-center">
            <div>
                <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                    <Lock size={20} className="text-brand-gold" /> Admin Panel
                </h2>
                <p className="text-xs text-brand-gold uppercase tracking-wider">Sea Surf System v2.1</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto bg-gray-50 flex flex-col">
          
          {!isAuthenticated ? (
            // LOGIN SCREEN
            <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={32} className="text-brand-navy" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Acesso Restrito</h3>
                        <p className="text-sm text-gray-500">Digite a credencial de administrador.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input 
                                type="password" 
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Senha de acesso"
                                className={`w-full p-4 bg-gray-50 border rounded-xl outline-none transition-all text-center font-bold tracking-widest ${authError ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200 focus:border-brand-navy'}`}
                                autoFocus
                            />
                            {authError && <p className="text-xs text-red-500 text-center mt-2 font-bold">Acesso Negado</p>}
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        >
                            Entrar no Sistema
                        </button>
                    </form>
                </div>
            </div>
          ) : (
            // AUTHENTICATED CONTENT
            <>
                {/* Navigation Tabs */}
                <div className="flex bg-white p-2 shadow-sm gap-2 sticky top-0 z-10 overflow-x-auto no-scrollbar">
                     <button 
                        onClick={() => { setMode('dashboard'); resetForm(); }}
                        className={`flex-1 py-3 px-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'dashboard' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        <LayoutDashboard size={16} /> Dash
                    </button>
                    <button 
                        onClick={() => { setMode('create'); resetForm(); }}
                        className={`flex-1 py-3 px-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'create' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        <Plus size={16} /> Novo
                    </button>
                    <button 
                        onClick={() => { setMode('edit'); resetForm(); }}
                        className={`flex-1 py-3 px-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'edit' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        <Edit size={16} /> Editar
                    </button>
                    <button 
                        onClick={() => { setMode('categories'); resetForm(); }}
                        className={`flex-1 py-3 px-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'categories' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                         <Layers size={16} /> Cats
                    </button>
                </div>

                {/* DASHBOARD MODE */}
                {mode === 'dashboard' && (
                    <div className="p-6 space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 text-brand-gold mb-2">
                                    <Package size={20} />
                                    <span className="text-xs font-bold uppercase">Total Itens</span>
                                </div>
                                <p className="text-3xl font-serif font-bold text-brand-navy">{stats.totalProducts}</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 text-green-600 mb-2">
                                    <Layers size={20} />
                                    <span className="text-xs font-bold uppercase">Categorias</span>
                                </div>
                                <p className="text-3xl font-serif font-bold text-brand-navy">{stats.categoriesCount}</p>
                            </div>
                            <div className="col-span-2 bg-gradient-to-br from-brand-navy to-[#2a3f5f] p-6 rounded-2xl shadow-lg text-white">
                                <div className="flex items-center gap-2 text-brand-gold mb-2 opacity-80">
                                    <TrendingUp size={20} />
                                    <span className="text-xs font-bold uppercase">Valor Estimado (Showroom)</span>
                                </div>
                                <p className="text-4xl font-serif font-bold">R$ {stats.totalValue.toFixed(2).replace('.', ',')}</p>
                                <p className="text-xs text-gray-400 mt-2">*Soma do valor unitário de 1 peça de cada modelo.</p>
                            </div>
                        </div>

                        {stats.missingImages > 0 && (
                             <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                                <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-bold text-orange-800 text-sm">Atenção Necessária</h4>
                                    <p className="text-xs text-orange-700 mt-1">
                                        Existem {stats.missingImages} produtos sem foto ou com imagem provisória. Adicione fotos para melhorar as vendas.
                                    </p>
                                    <button 
                                        onClick={() => {setMode('edit'); setSearchTerm('');}} 
                                        className="mt-2 text-xs font-bold text-orange-600 underline"
                                    >
                                        Ir para edição
                                    </button>
                                </div>
                             </div>
                        )}
                    </div>
                )}

                {/* CATEGORIES MODE */}
                {mode === 'categories' && (
                    <div className="p-6 space-y-4">
                        
                        {/* New Category Creator */}
                        <div className="bg-brand-navy/5 border border-brand-navy/10 p-5 rounded-2xl mb-6">
                            {isCreatingCategory ? (
                                <div className="animate-fadeIn">
                                    <label className="text-xs font-bold text-brand-navy uppercase mb-2 block">Nome da Nova Categoria</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            placeholder="Ex: Verão 2027"
                                            className="flex-grow p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-navy outline-none text-sm"
                                            autoFocus
                                        />
                                        <button 
                                            onClick={handleConfirmCreateCategory}
                                            disabled={!newCategoryName.trim()}
                                            className="bg-brand-navy text-white px-4 rounded-xl font-bold disabled:opacity-50"
                                        >
                                            <Plus size={20} />
                                        </button>
                                        <button 
                                            onClick={() => setIsCreatingCategory(false)}
                                            className="bg-gray-200 text-gray-600 px-4 rounded-xl"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2 leading-tight">
                                        * Ao confirmar, você será redirecionado para cadastrar o primeiro produto desta categoria.
                                    </p>
                                </div>
                            ) : (
                                <button 
                                    onClick={handleStartCreateCategory}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-navy text-white rounded-xl font-bold shadow-md hover:bg-brand-gold hover:text-brand-navy transition-all"
                                >
                                    <Plus size={20} /> Criar Nova Categoria
                                </button>
                            )}
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Categorias Existentes</p>
                            {uniqueCategories.map(cat => (
                                <div key={cat} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
                                    {editingCategory === cat ? (
                                        <div className="flex items-center gap-2 w-full animate-fadeIn">
                                            <input 
                                                type="text" 
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                className="flex-grow p-2 border border-brand-gold rounded focus:outline-none text-sm font-bold text-brand-navy"
                                                autoFocus
                                            />
                                            <button onClick={handleSaveRenameCategory} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-sm">
                                                <Save size={18} />
                                            </button>
                                            <button onClick={() => setEditingCategory(null)} className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="font-bold text-gray-700">{cat}</span>
                                            <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => { setEditingCategory(cat); setNewCategoryName(cat); }}
                                                    className="p-2 text-gray-400 hover:text-brand-navy bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EDIT LIST MODE */}
                {mode === 'edit' && !editingId && (
                    <div className="p-6">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Buscar produto..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            {filteredEditList.map(product => (
                                <div 
                                    key={product.id}
                                    onClick={() => handleSelectProductToEdit(product)}
                                    className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-brand-navy hover:shadow-md transition-all group"
                                >
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 relative">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50"><ImageIcon size={20}/></div>
                                        )}
                                        {(!product.imageUrl || product.imageUrl.includes('placeholder')) && (
                                            <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">{product.reference}</p>
                                        <h4 className="font-bold text-gray-800 leading-tight group-hover:text-brand-navy line-clamp-1">{product.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">R$ {product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-full group-hover:bg-brand-navy group-hover:text-white transition-colors">
                                        <Edit size={16} />
                                    </div>
                                </div>
                            ))}
                            {filteredEditList.length === 0 && (
                                <div className="text-center py-10 opacity-50">
                                    <Search size={48} className="mx-auto mb-2" />
                                    <p>Nenhum produto encontrado.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CREATE / EDIT FORM */}
                { (mode === 'create' || (mode === 'edit' && editingId)) && (
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        
                        {mode === 'edit' && (
                            <button 
                                type="button" 
                                onClick={() => { setEditingId(null); resetForm(); }}
                                className="flex items-center gap-1 text-xs font-bold text-brand-navy uppercase tracking-wider hover:underline mb-4"
                            >
                                <X size={14}/> Cancelar Edição
                            </button>
                        )}

                        {/* Image Upload Area */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Imagem do Produto</label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-navy hover:bg-brand-navy/5 transition-all cursor-pointer overflow-hidden group bg-white shadow-sm"
                            >
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white font-bold flex items-center gap-2"><Upload size={20}/> Trocar Imagem</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                        <div className="bg-gray-100 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                            <Upload size={32} className="text-gray-500 group-hover:text-brand-navy" />
                                        </div>
                                        <span className="font-bold text-sm">Clique para enviar foto</span>
                                        <span className="text-xs opacity-70 mt-1">Recomendado: Formato Vertical</span>
                                    </div>
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

                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Referência</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Ex: 01.002"
                                    value={formData.reference}
                                    onChange={e => setFormData({...formData, reference: e.target.value})}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none font-mono text-sm"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Preço (R$)</label>
                                <input 
                                    type="number" 
                                    required
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.price || ''}
                                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none font-bold text-gray-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Nome do Modelo</label>
                            <input 
                                type="text" 
                                required
                                placeholder="Nome descritivo do produto"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none"
                            />
                        </div>

                        {/* Details */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Categoria</label>
                            <input 
                                type="text" 
                                list="categories-list"
                                required
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none font-bold text-brand-navy"
                            />
                            <datalist id="categories-list">
                                {uniqueCategories.map(cat => <option key={cat} value={cat} />)}
                            </datalist>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Peças/Caixa</label>
                                <input 
                                    type="number" 
                                    placeholder="Ex: 12"
                                    value={formData.unitsPerBox || ''}
                                    onChange={e => setFormData({...formData, unitsPerBox: parseInt(e.target.value)})}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none"
                                />
                            </div>
                             <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Tamanhos</label>
                                <input 
                                    type="text" 
                                    placeholder="P, M, G..."
                                    value={Array.isArray(formData.availableSizes) ? formData.availableSizes.join(', ') : formData.availableSizes}
                                    onChange={e => setFormData({...formData, availableSizes: e.target.value})}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Descrição Técnica</label>
                            <textarea 
                                rows={3}
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none resize-none"
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 space-y-3">
                            <button 
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-gold hover:text-brand-navy transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                {mode === 'create' ? 'Cadastrar Produto' : 'Salvar Alterações'}
                            </button>

                            {mode === 'edit' && (
                                <button 
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isSaving}
                                    className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} /> Excluir do Catálogo
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {/* Footer Logout */}
                <div className="p-4 border-t border-gray-200 mt-auto bg-white">
                    <button onClick={handleLogout} className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors uppercase font-bold tracking-widest">
                        Encerrar Sessão Segura
                    </button>
                </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
