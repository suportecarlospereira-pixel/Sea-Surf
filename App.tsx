import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from './constants';
import { CartItem, Product } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AdminDrawer } from './components/AdminDrawer';
import { ShoppingBag, Search, Settings } from 'lucide-react';

const App: React.FC = () => {
  // Initialize products with constants, but allow state updates for dynamic additions
  const [products, setProducts] = useState<Product[]>([]);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data
  useEffect(() => {
    // Changed key to 'sea_surf_products_v1' to force new catalog load for the user with new branding
    const savedProducts = localStorage.getItem('sea_surf_products_v1');
    if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
    } else {
        setProducts(PRODUCTS);
    }
  }, []);

  // Update categories dynamically based on current products
  const currentCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Todos', ...Array.from(cats)];
  }, [products]);

  const handleAddToCart = (item: CartItem) => {
    // Check if box already exists in cart, if so, increment quantity by the specified amount
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map((item, i) => i === index ? { ...item, quantity: newQuantity } : item));
  };

  const handleAddProduct = (newProduct: Product) => {
      const updatedProducts = [newProduct, ...products];
      setProducts(updatedProducts);
      saveToStorage(updatedProducts);
      setIsAdminOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
      const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      setProducts(updatedProducts);
      saveToStorage(updatedProducts);
      // Update cart items if the product details changed
      setCartItems(prev => prev.map(item => 
        item.productId === updatedProduct.id ? { ...item, product: updatedProduct } : item
      ));
      alert("Produto atualizado com sucesso!");
      setIsAdminOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
      if (window.confirm("Tem certeza que deseja excluir este produto do catálogo?")) {
          const updatedProducts = products.filter(p => p.id !== productId);
          setProducts(updatedProducts);
          saveToStorage(updatedProducts);
          // Remove from cart if present
          setCartItems(prev => prev.filter(item => item.productId !== productId));
          alert("Produto removido.");
      }
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
      if (!newName.trim() || oldName === newName) return;
      
      const updatedProducts = products.map(p => 
          p.category === oldName ? { ...p, category: newName.trim() } : p
      );
      
      setProducts(updatedProducts);
      saveToStorage(updatedProducts);
      
      // If the user was viewing the old category, switch view to the new one
      if (selectedCategory === oldName) {
          setSelectedCategory(newName.trim());
      }
      alert(`Categoria "${oldName}" renomeada para "${newName}" com sucesso!`);
  };

  const saveToStorage = (data: Product[]) => {
      try {
        localStorage.setItem('sea_surf_products_v1', JSON.stringify(data));
      } catch (e) {
        console.warn("Storage full or error saving", e);
      }
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
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-gray-800 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-gold/10 transition-all">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
             {/* Logo / Brand Name */}
             <div className="w-10 h-10 bg-brand-navy text-white flex items-center justify-center font-serif text-xl font-bold rounded-sm">
               SS
             </div>
             <div>
               <h1 className="font-serif text-xl md:text-2xl font-bold text-brand-navy tracking-tight leading-none">Sea Surf</h1>
               <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">Representações</span>
             </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <button 
                onClick={() => setSelectedCategory('Todos')}
                className={`hover:text-brand-navy transition-colors ${selectedCategory === 'Todos' ? 'text-brand-navy font-bold' : ''}`}
              >
                Início
              </button>
              {currentCategories.slice(1, 4).map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`hover:text-brand-navy transition-colors ${selectedCategory === cat ? 'text-brand-navy font-bold' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
                {/* Admin Button */}
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-colors"
                  title="Gerenciar Catálogo"
                >
                  <Settings size={20} />
                </button>

                {/* Cart Button */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-brand-navy hover:bg-gray-100 rounded-full transition-colors group"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-brand-gold text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white transform group-hover:scale-110 transition-transform">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Coleção Inverno 2026</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Estilo que define <br className="hidden md:block"/>a sua essência.
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8 font-light text-lg">
            Peças exclusivas Sea Surf selecionadas para representantes que valorizam qualidade, corte e sofisticação.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="sticky top-20 z-20 bg-[#F9F9F7]/95 backdrop-blur px-4 py-4 border-b border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou referência..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy bg-white text-sm outline-none transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {currentCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado com esses critérios.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('Todos');}}
              className="mt-4 text-brand-navy underline font-medium"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Drawers & Modals */}
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