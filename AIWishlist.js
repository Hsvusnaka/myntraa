import React, { useState, useEffect } from 'react';
import { Heart, Star, Share2, User, Search, ShoppingBag, Users, Plus, Copy, Send, X } from 'lucide-react';

const AIWishlist = () => {
  const [activeTab, setActiveTab] = useState('blend');
  const [likedItems, setLikedItems] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [notification, setNotification] = useState(null);

  // Backend handles all AI logic now

  // Show custom notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const response = await fetch('http://localhost:4000/api/v1/products');
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data && data.products && Array.isArray(data.products)) {
          // Products now come with AI-assigned likedBy from backend
          const transformedProducts = data.products.map((product, index) => ({
            _id: product._id || product.id || index + 1,
            name: product.name || product.description || 'Unknown Product',
            brand: product.brand || 'Fashion Brand',
            price: typeof product.price === 'string' ? 
              parseInt(product.price.replace('₹', '').replace(',', '')) : 
              (typeof product.price === 'number' ? product.price : 0),
            category: product.category || 'Fashion',
            image: product.image || '',
            likedBy: product.likedBy || ["You"] // Backend provides AI-assigned likedBy
          }));
          
          console.log('AI-Enhanced Products:', transformedProducts);
          setProducts(transformedProducts);
          
          // Update liked items based on AI analysis
          const newLikedItems = new Set();
          transformedProducts.forEach(product => {
            if (product.likedBy.includes("You")) {
              newLikedItems.add(product._id);
            }
          });
          setLikedItems(newLikedItems);
        } else {
          console.error('Invalid data structure:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleLike = async (productId) => {
    try {
      const newLikedItems = new Set(likedItems);
      if (newLikedItems.has(productId)) {
        newLikedItems.delete(productId);
      } else {
        newLikedItems.add(productId);
      }
      setLikedItems(newLikedItems);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleViewProduct = (productId) => {
    showNotification(`Viewing product ID: ${productId}`);
    console.log('Viewing product:', productId);
    // window.location.href = `/product/${productId}`;
  };

  const handleRemoveProduct = (productId) => {
    setProducts(prev => prev.filter(product => product._id !== productId));
    setLikedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
    showNotification('Item removed from wishlist');
  };

  const handleInviteFriend = async () => {
    try {
      showNotification('Email sent successfully!');
      setFriendEmail('');
      setShowInviteModal(false);
    } catch (error) {
      showNotification('Failed to send invitation', 'error');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification('Link copied to clipboard!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && friendEmail.trim()) {
      handleInviteFriend();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-gray-600">Loading your wishlist...</div>
          <div className="mt-2 text-sm text-gray-400">AI is analyzing product compatibility...</div>
        </div>
      </div>
    );
  }

  const perfectMatches = products.filter(p => p.likedBy.includes("You") && p.likedBy.includes("Sarah"));
  const yourUniqueItems = products.filter(p => p.likedBy.includes("You") && !p.likedBy.includes("Sarah"));
  const sarahsDiscoveries = products.filter(p => p.likedBy.includes("Sarah") && !p.likedBy.includes("You"));
  const totalItems = products.filter(p => p.likedBy.includes("You")).length;
  const sharedItems = perfectMatches;

  const ProductCard = ({ product, showUser = false, size = "normal" }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${size === "large" ? "w-80" : "w-64"} relative group flex-shrink-0`}>
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full object-cover ${size === "large" ? "h-80" : "h-64"}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
        {showUser && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            {product.likedBy.includes("You") ? "You" : "Sarah M."}
          </div>
        )}
        {perfectMatches.includes(product) && (
          <div style={{backgroundColor: '#E35E7E'}} className="absolute top-3 left-3 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1">
            <Heart className="w-3 h-3 fill-current" />
            Match!
          </div>
        )}
        <button
          onClick={() => toggleLike(product._id)}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart 
            style={{color: likedItems.has(product._id) ? '#E35E7E' : '#9CA3AF'}}
            className={`w-4 h-4 ${likedItems.has(product._id) ? 'fill-current' : ''} transition-colors`}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-gray-900 text-sm leading-tight">{product.name}</h3>
            <p className="text-gray-500 text-xs">{product.brand}</p>
          </div>
          <p className="text-gray-600 text-xs font-medium">{product.category}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">
            ₹{typeof product.price === 'string' ? product.price : product.price.toLocaleString()}
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => handleViewProduct(product._id)}
              style={{backgroundColor: '#E35E7E'}} 
              className="hover:opacity-80 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              View
            </button>
            <button 
              onClick={() => handleRemoveProduct(product._id)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const InviteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Invite Friends to Your AI Blend</h3>
          <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <label htmlFor="friend-email" className="block text-sm font-medium text-gray-700 mb-2">
            Friend's Email Address
          </label>
          <input
            id="friend-email"
            type="email"
            placeholder="Enter friend's email"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors"
            autoFocus
            autoComplete="email"
            spellCheck="false"
          />
        </div>
        
        <button
          onClick={handleInviteFriend}
          disabled={!friendEmail.trim()}
          style={{backgroundColor: friendEmail.trim() ? '#E35E7E' : '#9CA3AF'}}
          className="w-full text-white py-3 rounded-lg font-medium hover:opacity-80 transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          Send AI-Powered Invite
        </button>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">AI Compatibility Preview</h4>
          <div className="text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <span>sarah.m@email.com</span>
              <span className="text-green-600 text-xs">92% compatible</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Based on style preferences</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'blend':
        return (
          <>
            {/* Perfect Match Section */}
            {perfectMatches.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart style={{color: '#E35E7E'}} className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Perfect Matches!</h2>
                    <p className="text-gray-500">Items you both will love</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-4" style={{width: 'max-content'}}>
                    {perfectMatches.map(product => (
                      <ProductCard key={product._id} product={product} size="large" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Your Unique Picks & Sarah's Discoveries */}
            <div className="grid grid-cols-2 gap-12">
              {/* Your Unique Picks */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Your Unique Picks</h2>
                    <p className="text-gray-500">{yourUniqueItems.length} items only you have</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-12">
                  {yourUniqueItems.map(product => (
                    <ProductCard key={product._id} product={product} showUser={true} />
                  ))}
                </div>
              </div>

              {/* Sarah's AI Discoveries */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Sarah's AI Discoveries</h2>
                    <p className="text-gray-500">{sarahsDiscoveries.length} items AI picked for her</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-12">
                  {sarahsDiscoveries.map(product => (
                    <ProductCard key={product._id} product={product} showUser={true} />
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      
      case 'wishlist':
        return (
          <div className="grid grid-cols-4 gap-6">
            {products.filter(p => p.likedBy.includes("You")).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        );
      
      case 'shared':
        return (
          <div className="grid grid-cols-4 gap-6">
            {sharedItems.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Title and Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wishlist Blend</h1>
            <p className="text-gray-500 mt-1">Share and discover items with friends</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowInviteModal(true)}
              style={{backgroundColor: '#E35E7E'}}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium hover:opacity-80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Invite Friends
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center space-x-8 mb-6">
            <button
              onClick={() => setActiveTab('blend')}
              style={{
                backgroundColor: activeTab === 'blend' ? '#E35E7E' : '#9CA3AF'
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-white shadow-lg"
            >
              <Users className="w-4 h-4" />
              Blend View
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              style={{
                backgroundColor: activeTab === 'wishlist' ? '#E35E7E' : '#9CA3AF'
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-white shadow-lg"
            >
              <Heart className="w-4 h-4" />
              My Wishlist
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              style={{
                backgroundColor: activeTab === 'shared' ? '#E35E7E' : '#9CA3AF'
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-white shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              AI Matches
            </button>
          </div>

          {/* Stats Dashboard */}
          {activeTab === 'blend' && (
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart style={{color: '#E35E7E'}} className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{perfectMatches.length}</div>
                <div className="text-gray-500 font-medium">Shared Favorites</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
                <div className="text-gray-500 font-medium">Active Blends</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{totalItems}</div>
                <div className="text-gray-500 font-medium">Total Items</div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Invite Modal */}
      {showInviteModal && <InviteModal />}

      {/* Custom Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <X className="w-5 h-5" />
            )}
            {notification.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIWishlist;