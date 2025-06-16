import React, { useState, useRef, useEffect } from 'react';
import { Sun, Wind, Zap, Droplets, Menu, X, Moon, MessageCircle, Trash2, Send, Home, Info, Bot } from 'lucide-react';
import "./styles.css";

// Router Hook Simulation
const useRouter = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  const navigate = (page) => {
    setCurrentPage(page);
  };
  
  return { currentPage, navigate };
};

// Navigation Component
const Navigation = ({ currentPage, navigate, darkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chatbot', label: 'Chatbot', icon: Bot },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <Zap />
            </div>
            <span>Green Genie</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`nav-button ${currentPage === id ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
            
            <button onClick={toggleDarkMode} className="nav-button">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="nav-mobile">
            <button onClick={toggleDarkMode} className="nav-button">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="nav-button">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="nav-mobile-menu">
            <div className="nav-mobile-items">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    navigate(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`nav-button ${currentPage === id ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page Component
const HomePage = ({ navigate, darkMode }) => {
  const renewableTypes = [
    {
      title: 'Solar Energy',
      icon: Sun,
      description: 'Harness the power of the sun with photovoltaic panels and solar thermal systems.',
      benefits: ['Clean & Renewable', 'Reduces Electricity Bills', 'Low Maintenance']
    },
    {
      title: 'Wind Energy',
      icon: Wind,
      description: 'Generate electricity using wind turbines that convert kinetic energy from wind.',
      benefits: ['Sustainable', 'Cost-Effective', 'Creates Jobs']
    },
    {
      title: 'Hydroelectric',
      icon: Droplets,
      description: 'Use flowing water to generate clean electricity through hydroelectric dams.',
      benefits: ['Reliable Power', 'Long Lifespan', 'Flood Control']
    },
    {
      title: 'Geothermal',
      icon: Zap,
      description: 'Tap into Earth\'s natural heat for heating, cooling, and electricity generation.',
      benefits: ['24/7 Availability', 'Small Footprint', 'Very Reliable']
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Power the Future with
              <span className="hero-title-highlight">Renewable Energy</span>
            </h1>
            <p className="hero-description">
              Discover how clean, sustainable energy sources can transform our world and create a better tomorrow for generations to come.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('chatbot')} className="btn-primary">
                <MessageCircle size={20} />
                <span>Ask Our Energy Assistant</span>
              </button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>

      {/* Renewable Energy Types */}
      <div className="renewable-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Types of Renewable Energy</h2>
            <p className="section-description">
              Explore the various clean energy sources that are revolutionizing how we power our world
            </p>
          </div>

          <div className="renewable-grid">
            {renewableTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="renewable-card">
                  <div className="renewable-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                  <div className="benefits-list">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="benefit-item">
                        <div className="benefit-dot"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Learn More?</h2>
            <p>
              Chat with our AI assistant to get personalized information about renewable energy solutions
            </p>
            <button onClick={() => navigate('chatbot')} className="btn-primary">
              <Bot size={20} />
              <span>Start Chatting Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chatbot Page Component
const ChatbotPage = ({ darkMode }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your renewable energy assistant. Ask me anything about solar, wind, hydro, or other clean energy topics!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Dummy responses for demonstration
  const getBotResponse = (userMessage) => {
    const responses = {
      solar: "Solar energy is one of the fastest-growing renewable energy sources! Solar panels convert sunlight into electricity using photovoltaic cells. They're becoming more affordable and efficient every year. Would you like to know about installation costs or benefits?",
      wind: "Wind energy harnesses the kinetic energy of moving air through wind turbines. Modern wind farms can generate massive amounts of clean electricity. Wind power is now one of the cheapest forms of electricity in many regions!",
      hydro: "Hydroelectric power uses flowing water to generate electricity. It's one of the oldest and most reliable renewable energy sources. Large dams can provide consistent power for decades, and small-scale hydro systems are great for rural communities.",
      cost: "The cost of renewable energy has dropped dramatically! Solar costs have fallen by over 80% in the past decade. Wind power is now competitive with fossil fuels in many markets. Plus, once installed, the 'fuel' (sun, wind, water) is free!",
      environment: "Renewable energy produces little to no greenhouse gas emissions during operation. This helps combat climate change, reduces air pollution, and protects our environment for future generations. Every kWh of clean energy makes a difference!",
      default: "That's a great question about renewable energy! I can help you learn about solar panels, wind turbines, hydroelectric power, costs, environmental benefits, and much more. What specific aspect interests you most?"
    };

    const message = userMessage.toLowerCase();
    
    if (message.includes('solar')) return responses.solar;
    if (message.includes('wind')) return responses.wind;
    if (message.includes('hydro') || message.includes('water')) return responses.hydro;
    if (message.includes('cost') || message.includes('price') || message.includes('cheap')) return responses.cost;
    if (message.includes('environment') || message.includes('climate') || message.includes('pollution')) return responses.environment;
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Hello! I\'m your renewable energy assistant. Ask me anything about solar, wind, hydro, or other clean energy topics!',
        timestamp: new Date()
      }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <h1>Renewable Energy Chat Assistant</h1>
            <p>Get instant answers about clean energy solutions</p>
          </div>
          <button onClick={clearChat} className="btn-clear">
            <Trash2 size={16} />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="chat-area">
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  <p>{message.content}</p>
                  <p className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="typing-indicator">
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="input-area">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about renewable energy..."
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="btn-send"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="suggestions">
          <p>Quick Questions:</p>
          <div className="suggestions-grid">
            {[
              'How does solar energy work?',
              'Benefits of wind power',
              'Cost of renewable energy',
              'Environmental impact'
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="suggestion-btn"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = ({ darkMode }) => {
  const technologies = [
    { name: 'React.js', description: 'Frontend framework for building interactive user interfaces' },
    { name: 'Custom CSS', description: 'Handcrafted styles for responsive and modern design' },
    { name: 'Lucide React', description: 'Icon library for beautiful and consistent iconography' },
    { name: 'AI Integration', description: 'Ready for ChatGPT, Dialogflow, or custom AI APIs' }
  ];

  return (
    <div className="about-container">
      <div>
        {/* Header */}
        <div className="about-header">
          <h1>About Green Genie</h1>
          <p>
            Empowering communities with knowledge about renewable energy through intelligent conversations
          </p>
        </div>

        {/* Mission Section */}
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Climate change is one of the most pressing challenges of our time. The transition to renewable energy 
            is not just an environmental necessity, but an economic opportunity that can create jobs, reduce costs, 
            and improve quality of life for communities worldwide.
          </p>
          <p>
            Our platform aims to make renewable energy information accessible to everyone through an intelligent 
            chatbot that can answer questions, provide personalized recommendations, and help users understand 
            the benefits of clean energy solutions.
          </p>
        </div>

        {/* Technology Stack */}
        <div className="about-section">
          <h2>How It's Built</h2>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-card">
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="about-section">
          <h2>Key Features</h2>
          <div className="features-list">
            {[
              'Interactive chatbot for personalized renewable energy advice',
              'Comprehensive information about solar, wind, hydro, and geothermal energy',
              'Responsive design that works on all devices',
              'Dark mode support for comfortable viewing',
              'Ready for integration with advanced AI services',
              'Educational content to raise awareness about clean energy'
            ].map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-dot"></div>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Zap />
              </div>
              <span>Green Genie</span>
            </div>
            <p>
              Empowering communities with knowledge about renewable energy through intelligent conversations and educational resources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {['Solar Energy', 'Wind Power', 'Hydroelectric', 'Geothermal'].map((link, index) => (
                <li key={index}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              {['Energy Calculator', 'Installation Guide', 'Government Incentives', 'Environmental Impact'].map((resource, index) => (
                <li key={index}>
                  <a href="#">{resource}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>
            © {currentYear} Green Genie. All rights reserved. Built for a sustainable future.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { currentPage, navigate } = useRouter();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} darkMode={darkMode} />;
      case 'chatbot':
        return <ChatbotPage darkMode={darkMode} />;
      case 'about':
        return <AboutPage darkMode={darkMode} />;
      default:
        return <HomePage navigate={navigate} darkMode={darkMode} />;
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navigation 
        currentPage={currentPage} 
        navigate={navigate} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default App;