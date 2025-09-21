import React, { useState, useRef, useEffect } from 'react';
import { Search, Edit, Grid, ZoomIn, ZoomOut, Save, Share, Download, Star, Sparkles, Eye, Layout, Instagram, Facebook, Twitter, Plus, X } from 'lucide-react';

const Canvas = () => {
  const [canvasItems, setCanvasItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Dresses');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedTab, setSelectedTab] = useState('Products');
  const [zoom, setZoom] = useState(100);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canvasId, setCanvasId] = useState(null);
  const canvasRef = useRef(null);

  const categories = ['Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories'];
  const styleFilters = ['elegant', 'formal', 'office', 'casual', 'summer', 'bohemian'];

  // Load products from backend when tab/category changes
  useEffect(() => {
    loadProducts();
  }, [selectedTab, selectedCategory, searchTerm, selectedStyle]);

  // Load AI suggestions when canvas items change
  useEffect(() => {
    if (canvasItems.length > 0) {
      loadAISuggestions();
    } else {
      setAiSuggestions([]);
    }
  }, [canvasItems]);

  // Load products from backend
  const loadProducts = async () => {
    try {
      const params = new URLSearchParams({
        tab: selectedTab,
        category: selectedCategory,
        search: searchTerm,
        style: selectedStyle,
        limit: 20
      });

      const response = await fetch(`http://localhost:4000/api/v1/canvas/products/sidebar?${params}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  // Load AI suggestions from backend
  const loadAISuggestions = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/canvas/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ canvasItems })
      });

      const data = await response.json();
      if (data.success) {
        setAiSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error loading AI suggestions:', error);
    }
  };

  // Save canvas to backend
  const saveCanvas = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/v1/canvas/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          canvasItems,
          zoom,
          selectedCategory,
          selectedStyle,
          selectedTab,
          title: 'My Style Canvas'
        })
      });

      const data = await response.json();
      if (data.success) {
        setCanvasId(data.canvasId);
        console.log('Canvas saved successfully!');
      }
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
    setLoading(false);
  };

  // Add item to canvas (drag & drop)
  const handleDragStart = (e, product) => {
    setDraggedItem(product);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (draggedItem) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newItem = {
        ...draggedItem,
        x: x - 50,
        y: y - 50,
        canvasId: Date.now()
      };
      
      // Update local state immediately (for instant UI response)
      setCanvasItems([...canvasItems, newItem]);
      setTotalValue(prev => prev + draggedItem.price);
      setDraggedItem(null);

      // Save to backend
      try {
        await fetch('http://localhost:4000/api/v1/canvas/item/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: draggedItem.id,
            x: newItem.x,
            y: newItem.y,
            canvasId: newItem.canvasId
          })
        });
      } catch (error) {
        console.error('Error adding item to canvas:', error);
      }
    }
  };

  // Remove item from canvas
  const removeFromCanvas = async (canvasItemId) => {
    const item = canvasItems.find(item => item.canvasId === canvasItemId);
    
    // Update local state immediately
    setCanvasItems(canvasItems.filter(item => item.canvasId !== canvasItemId));
    setTotalValue(prev => prev - item.price);

    // Remove from backend
    try {
      await fetch(`http://localhost:4000/api/v1/canvas/item/${canvasItemId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error removing item from canvas:', error);
    }
  };

  // Export canvas
  const exportCanvas = async () => {
    if (!canvasId) {
      alert('Please save your canvas first!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/canvas/${canvasId}/export`);
      const data = await response.json();

      if (data.success) {
        // Create downloadable image (simple implementation)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;
        
        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        
        // Add title
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText(data.exportData.title, 20, 40);
        
        // Add metadata
        ctx.font = '14px Arial';
        ctx.fillText(`${data.exportData.metadata.totalItems} items - ₹${data.exportData.metadata.totalValue.toLocaleString()}`, 20, 70);
        
        // Download the canvas
        const link = document.createElement('a');
        link.download = 'my-canvas.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Error exporting canvas:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = !selectedStyle || (product.styles && product.styles.includes(selectedStyle));
    return matchesSearch && matchesStyle;
  });

  const ProductCard = ({ product, isDraggable = true }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      draggable={isDraggable}
      onDragStart={(e) => isDraggable && handleDragStart(e, product)}
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
        {product.tags && product.tags.map((tag, idx) => (
          <span key={idx} className={`absolute top-1 left-1 text-xs px-1.5 py-0.5 rounded text-white font-medium ${
            tag === 'SALE' ? 'bg-red-500' : 
            tag === 'HOT' ? 'bg-orange-500' : 
            tag === 'NEW' ? 'bg-blue-500' : 
            'bg-purple-500'
          }`}>
            {tag}
          </span>
        ))}
        {product.rating && (
          <div className="absolute top-1 right-1 flex items-center text-yellow-400 text-xs">
            <Star className="w-3 h-3 fill-current" />
            <span className="ml-1 text-white font-medium">{product.rating}</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="font-medium text-gray-900 text-xs">{product.brand}</p>
        <p className="text-gray-600 text-xs truncate">{product.name}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="font-bold text-gray-900 text-sm">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        {product.styles && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.styles.map((style, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
                {style}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const CanvasItem = ({ item }) => (
    <div 
      className="absolute bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:border-pink-300 transition-colors group"
      style={{ left: item.x, top: item.y, width: '100px', height: '140px' }}
    >
      <button 
        onClick={() => removeFromCanvas(item.canvasId)}
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <X className="w-3 h-3" />
      </button>
      <img src={item.image} alt={item.name} className="w-full h-20 object-cover rounded-t-lg" />
      <div className="p-1">
        <p className="text-xs font-medium truncate">{item.brand}</p>
        <p className="text-xs text-gray-600 truncate">{item.name}</p>
        <p className="text-xs font-bold">₹{item.price.toLocaleString()}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" style={{color: '#E35E7E'}} />
            <h1 className="text-lg font-bold text-gray-900">Style Canvas</h1>
            <Edit className="w-4 h-4 text-gray-500" />
          </div>
          
          {/* Tabs */}
          <div className="flex gap-1 mb-4">
            <button 
              onClick={() => setSelectedTab('Products')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                selectedTab === 'Products' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-4 h-4" />
              Products
            </button>
            <button 
              onClick={() => setSelectedTab('Trending')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                selectedTab === 'Trending' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Trending
            </button>
            <button 
              onClick={() => setSelectedTab('Inspiration')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                selectedTab === 'Inspiration' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Inspiration
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedTab === 'Products' && (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Category Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedCategory === category 
                        ? 'text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={selectedCategory === category ? {backgroundColor: '#E35E7E'} : {}}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Style Filters */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Filter by style:</p>
                <div className="flex flex-wrap gap-1">
                  {styleFilters.map(style => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(selectedStyle === style ? '' : style)}
                      className={`px-2 py-1 rounded text-xs ${
                        selectedStyle === style 
                          ? 'bg-pink-100 text-pink-800 border border-pink-300' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {selectedTab === 'Trending' && (
            <div className="grid grid-cols-2 gap-3">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {selectedTab === 'Inspiration' && (
            <div className="space-y-4">
              <p className="text-center text-gray-500">Template functionality coming soon!</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Layout className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{zoom}%</span>
                <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="p-1 hover:bg-gray-100 rounded">
                  <ZoomIn className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={() => setZoom(Math.max(50, zoom - 25))} className="p-1 hover:bg-gray-100 rounded">
                  <ZoomOut className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Layout className="w-4 h-4" />
                Templates
              </button>
              <button 
                onClick={saveCanvas}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Share className="w-4 h-4" />
                  Share
                </button>
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50">
                      <Instagram className="w-4 h-4 text-pink-500" />
                      Share to Instagram
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50">
                      <Facebook className="w-4 h-4 text-blue-500" />
                      Share to Facebook
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50">
                      <Twitter className="w-4 h-4 text-blue-400" />
                      Share to Twitter
                    </button>
                  </div>
                )}
              </div>
              <button 
                onClick={exportCanvas}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90"
                style={{backgroundColor: '#E35E7E'}}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-50 relative overflow-hidden">
          <div 
            ref={canvasRef}
            className="w-full h-full relative bg-white mx-auto"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center',
              width: '800px',
              height: '600px',
              maxWidth: 'none'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {canvasItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Sparkles className="w-16 h-16 mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Create Your Style Story</h2>
                <p className="text-center max-w-md">
                  Drag products from the sidebar to start building your perfect outfit combination
                </p>
                <div className="flex gap-4 mt-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <Layout className="w-4 h-4" />
                    Use Template
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <Eye className="w-4 h-4" />
                    Get Inspired
                  </button>
                </div>
              </div>
            ) : (
              canvasItems.map(item => (
                <CanvasItem key={item.canvasId} item={item} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Stats & AI Suggestions */}
      <div className="w-80 bg-white shadow-lg border-l">
        <div className="p-4">
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Canvas Stats</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold" style={{color: '#E35E7E'}}>{canvasItems.length}</span>
              <span className="text-2xl font-bold" style={{color: '#E35E7E'}}>₹{totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Items</span>
              <span>Total Value</span>
            </div>
          </div>

          {aiSuggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" style={{color: '#E35E7E'}} />
                <h3 className="font-bold text-gray-900">AI Suggestions</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Complete your look with:</p>
              
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img src={suggestion.image} alt={suggestion.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{suggestion.name}</p>
                      <p className="text-sm font-bold">₹{suggestion.price.toLocaleString()}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-pink-500">
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Share & Export</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
                <Instagram className="w-4 h-4 text-pink-500" />
                Share to Instagram
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
                <Facebook className="w-4 h-4 text-blue-500" />
                Share to Facebook
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
                <Twitter className="w-4 h-4 text-blue-400" />
                Share to Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;