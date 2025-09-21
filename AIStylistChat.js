import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Heart, ShoppingBag, Star, Sparkles, Camera, Mic, Filter, Shuffle } from 'lucide-react';

const AIStylistChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI Fashion Stylist. I can help you with outfit suggestions, styling advice, and personalized recommendations. What are you looking to style today?",
      timestamp: new Date(),
      quickReplies: [
        "Casual weekend look",
        "Office professional attire", 
        "Date night outfit",
        "Party wear suggestions"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Static vibe board data with more products
  const vibeBoard = {
    totalItems: 24,
    categories: {
      "Dresses": [
        {
          name: "Elegant Midi Dress",
          brand: "Zara",
          price: "₹3,499",
          originalPrice: "₹4,999",
          discount: "30% OFF",
          rating: "4.2 (156)",
          tag: "AI Pick",
          match: 92,
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop"
        },
        {
          name: "Floral Summer Dress",
          brand: "H&M",
          price: "₹2,299",
          originalPrice: "₹2,999",
          discount: "23% OFF",
          rating: "4.3 (289)",
          tag: "Trending",
          match: 88,
          image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop"
        },
        {
          name: "Black Wrap Dress",
          brand: "Mango",
          price: "₹4,199",
          originalPrice: "₹5,499",
          discount: "24% OFF",
          rating: "4.5 (412)",
          tag: "New Arrival",
          match: 91,
          image: "https://images.unsplash.com/photo-1566479179817-c5d6aee82f14?w=400&h=600&fit=crop"
        },
        {
          name: "Bohemian Maxi Dress",
          brand: "Free People",
          price: "₹5,999",
          originalPrice: "₹7,999",
          discount: "25% OFF",
          rating: "4.4 (203)",
          tag: "Luxury",
          match: 89,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
        }
      ],
      "Tops": [
        {
          name: "Oversized Cotton T-Shirt",
          brand: "H&M",
          price: "₹899",
          originalPrice: "₹1,299",
          discount: "20% OFF",
          rating: "4.2 (856)",
          tag: "AI Pick",
          match: 89,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop"
        },
        {
          name: "Striped Long Sleeve Top",
          brand: "Zara",
          price: "₹1,299",
          originalPrice: "₹1,699",
          discount: "24% OFF",
          rating: "4.4 (623)",
          tag: "Trending",
          match: 85,
          image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400&h=600&fit=crop"
        },
        {
          name: "Silk Blouse",
          brand: "COS",
          price: "₹3,899",
          originalPrice: "₹4,999",
          discount: "22% OFF",
          rating: "4.6 (341)",
          tag: "AI Pick",
          match: 93,
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop"
        },
        {
          name: "Cropped Cardigan",
          brand: "Uniqlo",
          price: "₹1,699",
          originalPrice: "₹2,199",
          discount: "23% OFF",
          rating: "4.1 (278)",
          tag: "New Arrival",
          match: 86,
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop"
        }
      ],
      "Bottoms": [
        {
          name: "High-Waist Mom Jeans",
          brand: "Levi's",
          price: "₹2,499",
          originalPrice: "₹2,999",
          discount: "15% OFF",
          rating: "4.5 (1,203)",
          tag: "AI Pick",
          match: 90,
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop"
        },
        {
          name: "Wide-Leg Trousers",
          brand: "Zara",
          price: "₹2,199",
          originalPrice: "₹2,899",
          discount: "24% OFF",
          rating: "4.3 (567)",
          tag: "Trending",
          match: 87,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
        },
        {
          name: "Pleated Midi Skirt",
          brand: "H&M",
          price: "₹1,299",
          originalPrice: "₹1,799",
          discount: "28% OFF",
          rating: "4.2 (423)",
          tag: "New Arrival",
          match: 84,
          image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=600&fit=crop"
        },
        {
          name: "Leather Mini Skirt",
          brand: "Mango",
          price: "₹3,299",
          originalPrice: "₹4,199",
          discount: "21% OFF",
          rating: "4.4 (312)",
          tag: "Trending",
          match: 88,
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop"
        }
      ],
      "Shoes": [
        {
          name: "White Canvas Sneakers",
          brand: "Nike",
          price: "₹1,999",
          originalPrice: "₹2,499",
          discount: "20% OFF",
          rating: "4.3 (967)",
          tag: "New Arrival",
          match: 87,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop"
        },
        {
          name: "Black Ankle Boots",
          brand: "Zara",
          price: "₹3,499",
          originalPrice: "₹4,299",
          discount: "19% OFF",
          rating: "4.4 (645)",
          tag: "AI Pick",
          match: 91,
          image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=600&fit=crop"
        },
        {
          name: "Block Heel Sandals",
          brand: "Mango",
          price: "₹2,799",
          originalPrice: "₹3,499",
          discount: "20% OFF",
          rating: "4.1 (321)",
          tag: "Trending",
          match: 83,
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop"
        },
        {
          name: "Platform Loafers",
          brand: "Dr. Martens",
          price: "₹8,999",
          originalPrice: "₹11,499",
          discount: "22% OFF",
          rating: "4.6 (428)",
          tag: "Luxury",
          match: 85,
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop"
        }
      ],
      "Accessories": [
        {
          name: "Crossbody Canvas Bag",
          brand: "Accessorize",
          price: "₹1,599",
          originalPrice: "₹2,199",
          discount: "27% OFF",
          rating: "4.1 (445)",
          tag: "Trending",
          match: 83,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop"
        },
        {
          name: "Gold Chain Necklace",
          brand: "Pandora",
          price: "₹4,999",
          originalPrice: "₹6,499",
          discount: "23% OFF",
          rating: "4.6 (789)",
          tag: "AI Pick",
          match: 89,
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop"
        },
        {
          name: "Silk Scarf",
          brand: "Hermès",
          price: "₹12,999",
          originalPrice: "₹15,999",
          discount: "19% OFF",
          rating: "4.8 (234)",
          tag: "Luxury",
          match: 94,
          image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=600&fit=crop"
        },
        {
          name: "Leather Belt",
          brand: "Coach",
          price: "₹6,799",
          originalPrice: "₹8,499",
          discount: "20% OFF",
          rating: "4.4 (156)",
          tag: "New Arrival",
          match: 86,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop"
        }
      ]
    }
  };

  // Complete your look data
  const completeYourLook = [
    {
      name: "Elegant Midi Dress",
      brand: "Zara",
      price: "₹3,499",
      originalPrice: "₹4,999",
      discount: "30% OFF",
      rating: "4.2 (156)",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop"
    },
    {
      name: "Professional Blazer",
      brand: "Mango",
      price: "₹4,299",
      originalPrice: "₹5,999",
      discount: "28% OFF",
      rating: "4.2 (156)",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
    },
    {
      name: "Oversized Hoodie",
      brand: "Stussy",
      price: "₹2,799",
      originalPrice: "₹3,499",
      discount: "20% OFF",
      rating: "4.2 (156)",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop"
    },
    {
      name: "Denim Jacket",
      brand: "Levi's",
      price: "₹3,999",
      originalPrice: "₹5,299",
      discount: "25% OFF",
      rating: "4.5 (324)",
      tag: "Classic",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop"
    },
    {
      name: "Knit Sweater",
      brand: "Uniqlo",
      price: "₹2,299",
      originalPrice: "₹2,899",
      discount: "21% OFF",
      rating: "4.3 (267)",
      tag: "Cozy",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop"
    }
  ];

  const filterOptions = ['All', 'Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories'];

  // Generate mock response based on user query
  const generateMockResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    let theme = 'casual';
    
    if (lowerQuery.includes('office') || lowerQuery.includes('work') || lowerQuery.includes('professional')) {
      theme = 'office';
    } else if (lowerQuery.includes('party') || lowerQuery.includes('night') || lowerQuery.includes('celebration')) {
      theme = 'party';
    }

    const responses = {
      casual: {
        chatbot_reply: "Perfect! For a casual look, I'd recommend going with comfortable yet stylish pieces. Think relaxed fits, breathable fabrics, and versatile items you can mix and match. Check out the curated selections below!",
        trend_board: null,
        complete_your_look: null
      },
      office: {
        chatbot_reply: "Great choice! For office wear, we want to create a polished, professional look that's both comfortable and confidence-boosting. I've highlighted some sophisticated pieces in the sections below.",
        trend_board: null,
        complete_your_look: null
      },
      party: {
        chatbot_reply: "Time to shine! For party wear, we want to create a look that's glamorous, fun, and makes you feel amazing. Check out the statement pieces I've curated in the style board below.",
        trend_board: null,
        complete_your_look: null
      }
    };

    return responses[theme] || responses.casual;
  };

  // Simulate AI Stylist Response
  const generateStylistResponse = async (userQuery) => {
    setIsTyping(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI response
    const mockResponse = generateMockResponse(userQuery);
    
    const botMessage = {
      id: Date.now(),
      type: 'bot',
      content: mockResponse.chatbot_reply,
      timestamp: new Date(),
      quickReplies: ["Show more options", "Different style", "Budget-friendly options", "Add to wishlist"]
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    await generateStylistResponse(message);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const VibeBoardCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group relative">
      <div className="relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
          {product.tag}
        </div>
        {product.match && (
          <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold">
            {product.match}
          </div>
        )}
        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white px-3 py-1 rounded-full text-xs font-medium hover:opacity-80"
                style={{backgroundColor: '#E35E7E'}}>
          Add to Moodboard
        </button>
      </div>
      
      <div className="p-4">
        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
        <p className="text-gray-500 text-xs mb-2">{product.brand}</p>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(parseFloat(product.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{product.rating}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-gray-900 font-bold text-sm">{product.price}</p>
          {product.originalPrice && (
            <>
              <p className="text-gray-500 text-xs line-through">{product.originalPrice}</p>
              <p className="text-green-600 text-xs font-medium">{product.discount}</p>
            </>
          )}
        </div>
        <button 
          style={{backgroundColor: '#E35E7E'}}
          className="w-full text-white py-2 rounded text-sm font-medium hover:opacity-80"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const CompleteYourLookCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group relative">
      <div className="relative">
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-yellow-400 rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
          {item.tag}
        </div>
        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white px-3 py-1 rounded-full text-xs font-medium hover:opacity-80"
                style={{backgroundColor: '#E35E7E'}}>
          Add to Moodboard
        </button>
      </div>
      
      <div className="p-3">
        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
        <p className="text-gray-500 text-xs mb-1">{item.brand}</p>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(parseFloat(item.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{item.rating}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-gray-900 font-bold text-sm">{item.price}</p>
          <p className="text-gray-500 text-xs line-through">{item.originalPrice}</p>
          <p className="text-green-600 text-xs font-medium">{item.discount}</p>
        </div>
        <button 
          style={{backgroundColor: '#E35E7E'}}
          className="w-full text-white py-2 rounded text-xs font-medium hover:opacity-80"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const getFilteredProducts = () => {
    if (activeFilter === 'All') {
      return Object.entries(vibeBoard.categories).reduce((acc, [category, products]) => {
        return [...acc, ...products.map(p => ({...p, category}))];
      }, []);
    }
    return vibeBoard.categories[activeFilter] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#E35E7E'}}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">AI Fashion Stylist</h1>
              <p className="text-sm text-gray-500">Your personal styling assistant</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Mic className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        
        {/* Chat Section - Now at the top */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Chat Messages */}
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-3 max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'bg-gray-600' : ''
                    }`} style={message.type === 'bot' ? {backgroundColor: '#E35E7E'} : {}}>
                      {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    
                    <div className={`rounded-lg px-4 py-3 ${
                      message.type === 'user' 
                        ? 'bg-gray-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {/* Quick Replies */}
                      {message.quickReplies && message.type === 'bot' && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 text-xs rounded-full border transition-colors"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-400 mt-2">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{backgroundColor: '#E35E7E'}}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t px-4 py-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me about outfits, styling, or fashion advice..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                style={{backgroundColor: inputMessage.trim() ? '#E35E7E' : '#9CA3AF'}}
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Suggested Prompts */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => handleQuickReply("Show me trendy winter outfits")}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-full transition-colors"
              >
                Winter trends
              </button>
              <button
                onClick={() => handleQuickReply("Help me style for a date")}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-full transition-colors"
              >
                Date outfit
              </button>
              <button
                onClick={() => handleQuickReply("Professional work attire ideas")}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-full transition-colors"
              >
                Work attire
              </button>
            </div>
          </div>
        </div>

        {/* AI-Curated Vibe Board Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your AI-Curated Style Board</h2>
              <p className="text-gray-500">{vibeBoard.totalItems} perfectly matched pieces curated just for you</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={activeFilter === filter ? {backgroundColor: '#E35E7E'} : {}}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFilteredProducts().map((product, index) => (
              <VibeBoardCard key={index} product={product} />
            ))}
          </div>
        </div>

        {/* Complete Your Look Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Look</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">Mix & Match</span>
            </div>
            <button 
              style={{backgroundColor: '#E35E7E'}}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80"
            >
              <Shuffle className="w-4 h-4" />
              Generate Outfits
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {completeYourLook.map((item, index) => (
              <CompleteYourLookCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStylistChat;