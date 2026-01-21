import React, { useState, useMemo, useEffect } from 'react';
import { CartItem, Product } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AdminDrawer } from './components/AdminDrawer';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast'; // Importe o Toast
import { ShoppingBag, Search, Settings, Loader2, Menu, X, Filter } from 'lucide-react';
import { fetchProducts } from './services/productService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helpers
  const addToast = (text: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro", error);
        addToast("Erro ao carregar catálogo. Verifique sua conexão.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const currentCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Todos', ...Array.from(cats).sort()];
  }, [products]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    
    // Feedback visual "premium"
    addToast(`${item.product.name} adicionado à sacola.`, "success");
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    addToast("Item removido.", "info");
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map((item, i) => i === index ? { ...item, quantity: newQuantity } : item));
  };

  // Callbacks Admin com Toast
  const handleAddProduct = (newProduct: Product) => {
      setProducts(prev => [newProduct, ...prev]);
      addToast("Produto criado com sucesso!", "success");
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setCartItems(prev => prev.map(item => 
        item.productId === updatedProduct.id ? { ...item, product: updatedProduct } : item
      ));
      addToast("Produto atualizado.", "success");
  };

  const handleDeleteProduct = (productId: string) => {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      addToast("Produto removido do catálogo.", "info");
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
      const updatedProducts = products.map(p => 
          p.category === oldName ? { ...p, category: newName.trim() } : p
      );
      setProducts(updatedProducts);
      if (selectedCategory === oldName) setSelectedCategory(newName.trim());
      addToast(`Categoria renomeada para ${newName}`, "success");
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.reference.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-gray-800 pb-20 selection:bg-brand-gold selection:text-brand-navy">
      
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header Premium */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <div className="w-10 h-10 bg-brand-navy text-white flex items-center justify-center font-serif text-xl font-bold rounded-lg shadow-lg group-hover:bg-brand-gold transition-colors">
               S
             </div>
             <div className="flex flex-col">
               <h1 className="font-serif text-2xl font-bold text-brand-navy tracking-tight leading-none group-hover:text-brand-gold transition-colors">Sea Surf</h1>
               <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">Concept Store</span>
             </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="p-2.5 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-all active:scale-95"
                  title="Acesso Administrativo"
                >
                  <Settings size={20} />
                </button>

                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 bg-brand-navy text-white rounded-full transition-all hover:shadow-lg hover:shadow-brand-navy/30 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-navy text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-scaleIn">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
          </div>
        </div>
      </header>

      {/* Hero Section Cinematic */}
      <section className="relative bg-brand-navy text-white py-20 md:py-32 px-4 overflow-hidden">
        {/* Background Abstract Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'}}></div>
        
        <div className="container mx-auto max-w-5xl text-center relative z-10 animate-fadeIn">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
             <span className="text-brand-gold uppercase tracking-widest text-[10px] font-bold">Coleção Inverno 2026</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Elegância que <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Desafia o Comum.</span>
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-10 font-light text-lg md:text-xl leading-relaxed">
            Curadoria exclusiva para lojistas que buscam excelência em cada detalhe.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <div className="relative group w-full md:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-gold transition-colors" />
                <input 
                  type="text" 
                  placeholder="O que você procura hoje?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-full border border-white/10 bg-white/10 text-white placeholder-gray-400 backdrop-blur-md focus:bg-white focus:text-brand-navy focus:border-white outline-none transition-all shadow-lg"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Categories Sticky Bar */}
      <div className="sticky top-20 z-30 bg-[#F9F9F7]/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto py-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max">
                {currentCategories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => {
                        setSelectedCategory(cat);
                        window.scrollTo({top: 400, behavior: 'smooth'});
                    }}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedCategory === cat 
                        ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/20 scale-105' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-navy hover:text-brand-navy'
                    }`}
                >
                    {cat}
                </button>
                ))}
            </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
             <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-brand-navy border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
             </div>
             <p className="text-gray-400 font-medium animate-pulse">Carregando coleção...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm mx-auto max-w-2xl">
            <Filter size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum item encontrado</h3>
            <p className="text-gray-500 mb-6">Tente ajustar sua busca ou filtros.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('Todos');}}
              className="text-brand-navy underline font-bold hover:text-brand-gold transition-colors"
            >
              Ver todo o catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Drawers */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <AdminDrawer 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onRenameCategory={handleRenameCategory}
      />
    </div>
  );
};

export default App;
