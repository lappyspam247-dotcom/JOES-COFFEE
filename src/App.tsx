import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  ArrowRight, 
  ChevronRight,
  MessageSquare, 
  Mail, 
  Phone, 
  Plus, 
  Check, 
  Clock, 
  MapPin, 
  Sparkles, 
  Heart,
  Calendar,
  Users,
  Utensils,
  Award
} from 'lucide-react';
import { MenuItem, HostingOption, CartItem } from './types';

// Crisp, high-end Unsplash images for editorial coffee shop aesthetic
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'esp-1',
    name: 'Signature Latte Art',
    category: 'Espresso',
    price: '$5.50',
    description: 'Rich double shot espresso paired with velvety micro-foamed oat milk.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller'
  },
  {
    id: 'esp-2',
    name: 'Madagascar Vanilla Bean Latte',
    category: 'Espresso',
    price: '$6.25',
    description: 'House-made vanilla pod syrup infused into espresso and silky steamed milk.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'esp-3',
    name: 'Cortado Traditional',
    category: 'Espresso',
    price: '$4.75',
    description: 'Equal parts bold espresso and warm steamed milk for the purest balance.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mat-1',
    name: 'Kyoto Ceremonial Iced Matcha',
    category: 'Matcha',
    price: '$6.50',
    description: 'First-harvest Uji matcha whisked fresh over artisan ice and macadamia milk.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    badge: 'Staff Pick'
  },
  {
    id: 'mat-2',
    name: 'Strawberry Cloud Matcha',
    category: 'Matcha',
    price: '$7.00',
    description: 'Layered fresh strawberry puree topped with vibrant green matcha foam.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cb-1',
    name: '24-Hour Steeping Cold Brew',
    category: 'Cold Brew',
    price: '$5.25',
    description: 'Single-origin Ethiopian beans steeped slowly for ultra-smooth chocolate notes.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cb-2',
    name: 'Salted Caramel Cream Cold Brew',
    category: 'Cold Brew',
    price: '$6.50',
    description: 'Bold cold brew crowned with thick sea salt caramel sweet cream.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular'
  },
  {
    id: 'pas-1',
    name: 'Artisanal Butter Croissant',
    category: 'Pastries',
    price: '$4.50',
    description: 'Baked fresh every morning. Flaky, golden layers with authentic French butter.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pas-2',
    name: 'Cardamom Cinnamon Bun',
    category: 'Pastries',
    price: '$5.00',
    description: 'Twisted brioche dough spiced with freshly ground cardamom and Ceylon cinnamon.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pas-3',
    name: 'Almond Frangipane Tart',
    category: 'Pastries',
    price: '$5.75',
    description: 'Crisp pastry shell filled with rich almond cream and toasted sliced almonds.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
  }
];

const HOSTING_OPTIONS: HostingOption[] = [
  {
    id: 'host-1',
    title: 'Private Events',
    description: 'Intimate evening takeovers of our sunlit cafe space. Perfect for book launches, birthday dinners, and corporate mixers up to 50 guests.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80',
    ctaText: 'Book Room'
  },
  {
    id: 'host-2',
    title: 'Off-site Catering',
    description: 'Bring the Joe’s Coffee ritual to your office or studio. Full espresso bar setups, dedicated craft baristas, and fresh pastry platters.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
    ctaText: 'Get a Quote'
  },
  {
    id: 'host-3',
    title: 'Custom Menus',
    description: 'Work directly with our head roaster and pastry chef to design bespoke signature beverages and branded treats tailored to your celebration.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    ctaText: 'Get a Quote'
  }
];

export default function App() {
  // Navigation & UI States
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Cart & Modals
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<{
    type: 'order' | 'customize' | 'inquire' | 'contact' | null;
    data?: any;
  }>({ type: null });

  // Customization state inside modal
  const [selectedSize, setSelectedSize] = useState<string>('Regular (12oz)');
  const [selectedMilk, setSelectedMilk] = useState<string>('Whole Milk');
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast notification auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Filtered menu calculation
  const filteredMenu = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const categories = ['All', 'Espresso', 'Matcha', 'Cold Brew', 'Pastries'];

  // Cart helper functions
  const addToCart = (item: MenuItem, milk = 'Whole Milk', size = 'Regular') => {
    setCart(prev => {
      const existingIdx = prev.findIndex(ci => ci.id === item.id && ci.selectedMilk === milk && ci.selectedSize === size);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += itemQuantity;
        return copy;
      }
      return [...prev, { ...item, quantity: itemQuantity, selectedMilk: milk, selectedSize: size }];
    });
    setToastMessage(`Added "${item.name}" to your order.`);
    setActiveModal({ type: null });
    setItemQuantity(1);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
  };

  const totalCartPrice = cart.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace('$', ''));
    return acc + (numericPrice * item.quantity);
  }, 0);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const triggerModal = (type: 'order' | 'customize' | 'inquire' | 'contact', data?: any) => {
    setItemQuantity(1);
    setSelectedMilk('Whole Milk');
    setSelectedSize('Regular (12oz)');
    setActiveModal({ type, data });
  };

  return (
    <div className="min-h-screen bg-[#EDE8DC] text-[#1A110B] font-sans flex flex-col relative overflow-x-hidden">
      
      {/* =====================================================================
          TOAST BANNER NOTIFICATION
      ====================================================================== */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1A110B] text-[#EDE8DC] px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-medium border border-[#C8B69E]/30 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-[#C8B69E] shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
          1. STICKY NAVIGATION BAR (Glassmorphism / Solid Cream)
      ====================================================================== */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#EDE8DC]/85 backdrop-blur-md shadow-sm py-4 border-b border-[#1A110B]/10' 
          : 'bg-[#EDE8DC] py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Minimalist Typography Logo */}
          <a href="#" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#1A110B] flex items-center gap-2 group">
            <span>Joe's Coffee</span>
            <span className="w-2 h-2 rounded-full bg-[#1A110B] inline-block group-hover:scale-150 transition-transform duration-300"></span>
          </a>

          {/* Center/Right: Nav Links with Dimming & Underline Out From Center */}
          <nav 
            className="hidden lg:flex items-center gap-9 font-medium text-sm tracking-wide uppercase"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {['Our Story', 'Menu', 'Events', 'Contact'].map((link) => {
              const href = `#${link.toLowerCase().replace(' ', '-')}`;
              const isHovered = hoveredNav === link;
              const isOtherHovered = hoveredNav !== null && hoveredNav !== link;

              return (
                <a
                  key={link}
                  href={href}
                  onMouseEnter={() => setHoveredNav(link)}
                  className={`nav-link py-1 transition-opacity duration-300 ${
                    isOtherHovered ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  {link}
                </a>
              );
            })}
          </nav>

          {/* Far Right: Order Now CTA Button & Cart Icon */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#1A110B]/5 transition-colors duration-200 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#1A110B]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1A110B] text-[#EDE8DC] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Pill-shaped Filled CTA Button */}
            <button
              onClick={() => triggerModal('order')}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A110B] text-[#EDE8DC] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#342418] hover:scale-[1.03] hover:shadow-[0_10px_20px_rgba(26,17,11,0.15)] active:scale-95 cursor-pointer"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#1A110B]/5 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MOBILE DRAWER MENU
      ====================================================================== */}
      <div className={`fixed inset-0 z-30 bg-[#1A110B]/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#EDE8DC] shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-8 border-b border-[#1A110B]/10">
              <span className="font-serif text-2xl font-bold">Joe's Coffee</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-[#1A110B]/5 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 mt-8">
              {['Our Story', 'Menu', 'Events', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl hover:text-[#C8B69E] transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#1A110B]/10 flex flex-col gap-4">
            <button
              onClick={() => { setIsMobileMenuOpen(false); triggerModal('order'); }}
              className="w-full py-4 rounded-full bg-[#1A110B] text-[#EDE8DC] font-medium text-center flex items-center justify-center gap-2"
            >
              <span>Order Online Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-center text-[#1A110B]/60 font-mono">
              OPEN DAILY: 6:30 AM — 8:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. HERO SECTION
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" id="our-story">
        
        {/* Left Column: Huge Serif Header & Subtext */}
        <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A110B]/5 border border-[#1A110B]/10 text-xs font-mono mb-6 tracking-widest uppercase">
            <Award className="w-3.5 h-3.5 text-[#1A110B]" />
            <span>Artisanal Roastery & Cafe</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1A110B] leading-[0.96] mb-6">
            Joe's <br className="hidden sm:inline" />Coffee.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#1A110B]/80 font-normal leading-relaxed max-w-2xl mb-10">
            Handcrafted espresso drinks and freshly baked pastries in a warm, welcoming atmosphere. Find your new favorite ritual, early up to late down.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
            {/* Filled CTA */}
            <button
              onClick={() => triggerModal('order')}
              className="flex-1 sm:flex-initial px-8 py-4 rounded-full bg-[#1A110B] text-[#EDE8DC] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#342418] hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(26,17,11,0.18)] active:scale-95 text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Order Now</span>
              <Coffee className="w-4 h-4" />
            </button>

            {/* Outline CTA */}
            <a
              href="#menu"
              className="flex-1 sm:flex-initial px-8 py-4 rounded-full border-2 border-[#1A110B] text-[#1A110B] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#1A110B] hover:text-[#EDE8DC] hover:scale-[1.03] active:scale-95 text-center cursor-pointer inline-block"
            >
              Our Menu
            </a>
          </div>

          {/* Trust / Atmosphere info below */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-[#1A110B]/15 w-full">
            <div>
              <div className="font-serif text-2xl font-bold">100%</div>
              <div className="text-xs text-[#1A110B]/70 font-medium uppercase tracking-wider mt-1">Direct Trade</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold">4.9 ★</div>
              <div className="text-xs text-[#1A110B]/70 font-medium uppercase tracking-wider mt-1">Community Love</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold">Daily</div>
              <div className="text-xs text-[#1A110B]/70 font-medium uppercase tracking-wider mt-1">Baked Fresh</div>
            </div>
          </div>
        </div>

        {/* Right Column: Large Vertically-Oriented Styled Image Container */}
        <div className="lg:col-span-5 relative group">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#1A110B]/10">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80" 
              alt="Joe's Coffee Minimalist Counter"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/40 via-transparent to-transparent opacity-60"></div>
            
            {/* Floating badge inside hero photo */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#EDE8DC]/90 backdrop-blur-md border border-[#1A110B]/10 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A110B] text-[#EDE8DC] flex items-center justify-center font-serif font-bold text-lg">
                  J
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#1A110B]/70">Current Roasting</div>
                  <div className="font-serif font-bold text-sm">Ethiopia Yirgacheffe G1</div>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></div>
            </div>
          </div>

          {/* Decorative graphic backdrop offset */}
          <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl border-2 border-[#1A110B]/20 -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        </div>

      </section>

      {/* =====================================================================
          3. CONCEPT DIVIDER SECTION
      ====================================================================== */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden my-12 flex items-center justify-center">
        {/* Background Coffee Scene */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80" 
            alt="Barista Coffee Scene" 
            className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05]"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-[#C8B69E] text-xs font-mono uppercase tracking-[0.3em] mb-4">Crafted With Intention</span>
          
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#EDE8DC] font-bold tracking-tight mb-8 max-w-2xl leading-tight">
            What are you in the mood for?
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#our-story"
              className="px-7 py-3.5 rounded-full bg-[#EDE8DC] text-[#1A110B] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#C8B69E] hover:scale-105 shadow-xl"
            >
              Our Story
            </a>
            <a
              href="#menu"
              className="px-7 py-3.5 rounded-full border-2 border-[#EDE8DC] text-[#EDE8DC] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#EDE8DC] hover:text-[#1A110B] hover:scale-105 backdrop-blur-sm"
            >
              Our Menu
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. THE INTERACTIVE MENU GRID
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 scroll-mt-24" id="menu">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1A110B]/15 pb-8 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1A110B]/60">Hand-selected Beans & Ingredients</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1A110B] mt-2">
              Our Menu
            </h2>
          </div>

          {/* Horizontal Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#1A110B] text-[#EDE8DC] shadow-md scale-105'
                      : 'bg-[#1A110B]/5 text-[#1A110B]/70 hover:bg-[#1A110B]/10 hover:text-[#1A110B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Structured Card Grid (3 or 4 columns) with Zoom on Image & Slight Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[400px]">
          {filteredMenu.map((item) => (
            <div 
              key={item.id}
              className="group flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container: 1:1 or 4:5 with Mandatory Zoom */}
                <div className="relative aspect-square rounded-[12px] overflow-hidden bg-[#1A110B]/5 mb-4 shadow-sm border border-[#1A110B]/5 cursor-pointer"
                     onClick={() => triggerModal('customize', item)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-[1.06] filter group-hover:brightness-[1.03]"
                  />
                  
                  {/* Category Badge / Tag */}
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#1A110B] text-[#EDE8DC] text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                      {item.badge}
                    </span>
                  )}

                  {/* Quick Add Overlay Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#1A110B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#EDE8DC] text-[#1A110B] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Plus className="w-3.5 h-3.5" /> Quick Order
                    </span>
                  </div>
                </div>

                {/* Title & Price/Add Element Directly Beneath */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 
                    onClick={() => triggerModal('customize', item)}
                    className="font-serif font-bold text-lg text-[#1A110B] leading-snug group-hover:text-[#8C7662] transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  <span className="font-mono font-bold text-base text-[#1A110B] shrink-0 bg-[#1A110B]/5 px-2.5 py-0.5 rounded">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs text-[#1A110B]/70 leading-relaxed line-clamp-2 mb-4 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Action row */}
              <div className="pt-3 border-t border-[#1A110B]/10 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-[#1A110B]/50">{item.category}</span>
                <button
                  onClick={() => triggerModal('customize', item)}
                  className="text-xs font-semibold text-[#1A110B] hover:text-[#8C7662] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Customize</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Note */}
        <div className="mt-16 p-6 rounded-2xl bg-[#1A110B]/5 border border-[#1A110B]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Utensils className="w-5 h-5 text-[#1A110B] shrink-0 hidden sm:block" />
            <div>
              <div className="font-serif font-bold text-sm">Dietary Accommodations</div>
              <div className="text-xs text-[#1A110B]/70 mt-0.5">We proudly offer organic Oat, Macadamia, Almond, and Soy milk alternatives at no extra charge.</div>
            </div>
          </div>
          <button 
            onClick={() => triggerModal('order')} 
            className="text-xs font-bold uppercase tracking-wider underline hover:text-[#8C7662] whitespace-nowrap cursor-pointer"
          >
            Download Full PDF Menu
          </button>
        </div>

      </section>

      {/* =====================================================================
          5. "HOST IT AT JOE'S" SECTION
      ====================================================================== */}
      <section className="bg-[#E5DFCE] py-24 border-y border-[#1A110B]/10" id="events">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#1A110B]/60">Community & Gatherings</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1A110B] mt-3 mb-4">
              Host It at Joe's
            </h2>
            <p className="text-base sm:text-lg text-[#1A110B]/80 font-normal">
              Private Events, Catering, and Custom Menus.
            </p>
          </div>

          {/* 3 Equal-Width Columns featuring Image + Desc + Button */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {HOSTING_OPTIONS.map((option) => (
              <div 
                key={option.id}
                className="group bg-[#EDE8DC] rounded-2xl p-6 shadow-md border border-[#1A110B]/10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div>
                  {/* Image Container with Overflow Hidden & Mandatory Hover Zoom */}
                  <div className="relative aspect-[16/10] rounded-[12px] overflow-hidden mb-6 bg-[#1A110B]/10">
                    <img 
                      src={option.image} 
                      alt={option.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-[1.06] filter group-hover:brightness-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/50 via-transparent to-transparent opacity-40"></div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1A110B] mb-3">
                    {option.title}
                  </h3>

                  <p className="text-sm text-[#1A110B]/75 leading-relaxed mb-8 font-normal">
                    {option.description}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => triggerModal('inquire', option)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#1A110B] text-[#EDE8DC] font-medium text-sm transition-all duration-300 hover:bg-[#342418] hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{option.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE INVISIBLE HOVER CANVAS (8 Hidden Moments)
      ====================================================================== */}
      <section className="relative w-full h-[480px] sm:h-[560px] bg-[#EDE8DC] border-t border-[#1A110B]/10 overflow-hidden select-none">
        
        {/* Background Watermark / Prompt */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-4">
          <div className="p-3 rounded-full bg-[#1A110B]/5 mb-3 animate-bounce">
            <Sparkles className="w-5 h-5 text-[#1A110B]/40" />
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1A110B]/15 uppercase text-center max-w-xl leading-tight">
            Hover Canvas to Reveal Moments
          </h3>
          <span className="font-mono text-[11px] text-[#1A110B]/40 uppercase tracking-[0.25em] mt-3">
            (Invisible Interactive Space — Glide Cursor Across)
          </span>
        </div>

        {/* 8 Invisible Hover Trigger Cells Grid */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 grid-rows-2 z-10 w-full h-full">
          {[
            { img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80', label: 'Velvety Crema', rot: '-5deg', xOffset: 'translate-x-2' },
            { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', label: 'Warm Cardamom Bun', rot: '4deg', xOffset: '-translate-x-2' },
            { img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80', label: 'Ceremonial Matcha', rot: '-3deg', xOffset: 'translate-x-1' },
            { img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80', label: '24hr Steeping', rot: '6deg', xOffset: '-translate-x-1' },
            { img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', label: 'Sunlit Counter', rot: '5deg', xOffset: 'translate-x-3' },
            { img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', label: 'Vanilla Pod Syrup', rot: '-6deg', xOffset: '-translate-x-2' },
            { img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', label: 'Barista Craft', rot: '3deg', xOffset: 'translate-x-1' },
            { img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80', label: 'Evening Takeover', rot: '-4deg', xOffset: '-translate-x-3' }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="relative w-full h-full group/cell flex items-center justify-center cursor-crosshair p-2 sm:p-4"
            >
              {/* Floating Polaroid Card */}
              <div 
                className={`w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(26,17,11,0.25)] border-4 border-[#EDE8DC] bg-[#1A110B] opacity-0 scale-75 translate-y-6 group-hover/cell:opacity-100 group-hover/cell:scale-100 group-hover/cell:translate-y-0 group-hover/cell:z-30 transition-all duration-500 pointer-events-none ${item.xOffset}`}
                style={{ transform: `rotate(${item.rot})` }}
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#EDE8DC]/95 text-[#1A110B] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =====================================================================
          6. FOOTER SECTION WITH COMMUNICATION MODULES
      ====================================================================== */}
      <footer className="bg-[#1A110B] text-[#EDE8DC] pt-20 pb-12 overflow-hidden relative" id="contact">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Bold Container Titled "SPEAK WITH ONE OF OUR EXPERTS" */}
          <div className="mb-16 border-b border-[#EDE8DC]/20 pb-16">
            <div className="max-w-xl mb-10">
              <span className="text-[#C8B69E] text-xs font-mono tracking-[0.25em] uppercase">Always Connected</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-[#EDE8DC]">
                SPEAK WITH ONE OF OUR EXPERTS
              </h3>
              <p className="text-sm text-[#EDE8DC]/70 mt-3">
                Whether you're curious about our wholesale bean programs, booking a private tasting, or just want to say hello.
              </p>
            </div>

            {/* Three Prominent Clickable Communication Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Module 1: Message */}
              <div 
                onClick={() => triggerModal('contact', { channel: 'Live Chat / Message' })}
                className="group p-8 rounded-2xl bg-[#EDE8DC]/5 border border-[#EDE8DC]/15 transition-all duration-300 hover:bg-[#2C1D13] hover:border-[#C8B69E] cursor-pointer flex flex-col items-start justify-between min-h-[160px]"
              >
                <div className="p-3 rounded-xl bg-[#EDE8DC]/10 text-[#C8B69E] transform transition-transform duration-300 group-hover:-translate-y-1">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#EDE8DC]/50 uppercase tracking-wider mb-1">Instant Chat</div>
                  <div className="font-serif text-xl font-bold text-[#EDE8DC] group-hover:text-[#C8B69E] transition-colors flex items-center gap-2">
                    <span>Message Us</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
              </div>

              {/* Module 2: Email */}
              <a 
                href="mailto:hello@joescoffee.example"
                className="group p-8 rounded-2xl bg-[#EDE8DC]/5 border border-[#EDE8DC]/15 transition-all duration-300 hover:bg-[#2C1D13] hover:border-[#C8B69E] cursor-pointer flex flex-col items-start justify-between min-h-[160px] block"
              >
                <div className="p-3 rounded-xl bg-[#EDE8DC]/10 text-[#C8B69E] transform transition-transform duration-300 group-hover:-translate-y-1">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#EDE8DC]/50 uppercase tracking-wider mb-1">Direct Inquiries</div>
                  <div className="font-serif text-xl font-bold text-[#EDE8DC] group-hover:text-[#C8B69E] transition-colors flex items-center gap-2">
                    <span>Email Studio</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
              </a>

              {/* Module 3: Call */}
              <a 
                href="tel:+1800555COFFEE"
                className="group p-8 rounded-2xl bg-[#EDE8DC]/5 border border-[#EDE8DC]/15 transition-all duration-300 hover:bg-[#2C1D13] hover:border-[#C8B69E] cursor-pointer flex flex-col items-start justify-between min-h-[160px] block"
              >
                <div className="p-3 rounded-xl bg-[#EDE8DC]/10 text-[#C8B69E] transform transition-transform duration-300 group-hover:-translate-y-1">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#EDE8DC]/50 uppercase tracking-wider mb-1">Roastery Desk</div>
                  <div className="font-serif text-xl font-bold text-[#EDE8DC] group-hover:text-[#C8B69E] transition-colors flex items-center gap-2">
                    <span>Call Roastery</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Locations & Hours Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 text-xs text-[#EDE8DC]/70 font-mono">
            <div>
              <div className="text-[#EDE8DC] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans text-sm">
                <MapPin className="w-4 h-4 text-[#C8B69E]" /> Flagship Cafe
              </div>
              <p>442 Mercer Street</p>
              <p>SoHo, New York, NY 10012</p>
            </div>
            <div>
              <div className="text-[#EDE8DC] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans text-sm">
                <Clock className="w-4 h-4 text-[#C8B69E]" /> Operating Hours
              </div>
              <p>Mon — Fri: 6:30am - 8:00pm</p>
              <p>Sat — Sun: 7:30am - 7:00pm</p>
            </div>
            <div>
              <div className="text-[#EDE8DC] font-bold uppercase tracking-wider mb-2 font-sans text-sm">Ritual Perks</div>
              <p>Joe's Rewards Club</p>
              <p>Wholesale Subscriptions</p>
            </div>
            <div>
              <div className="text-[#EDE8DC] font-bold uppercase tracking-wider mb-2 font-sans text-sm">Socials</div>
              <div className="flex gap-4 mt-1">
                <a href="#" className="hover:text-[#C8B69E] underline">Instagram</a>
                <a href="#" className="hover:text-[#C8B69E] underline">Spotify Rituals</a>
                <a href="#" className="hover:text-[#C8B69E] underline">Substack</a>
              </div>
            </div>
          </div>

          {/* Massive Oversized Editorial Text Spanning the Base */}
          <div className="pt-8 text-center select-none overflow-hidden">
            <h2 className="font-serif text-[12vw] sm:text-[14vw] font-black tracking-tight leading-[0.8] text-[#EDE8DC]/12 whitespace-nowrap">
              Joe's Coffee
            </h2>
          </div>

          <div className="mt-8 pt-6 border-t border-[#EDE8DC]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EDE8DC]/50 gap-4">
            <div>© {new Date().getFullYear()} Joe's Coffee Roastery LLC. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#EDE8DC]">Privacy Policy</a>
              <a href="#" className="hover:text-[#EDE8DC]">Terms of Service</a>
              <a href="#" className="hover:text-[#EDE8DC]">Accessibility</a>
            </div>
          </div>

        </div>
      </footer>

      {/* =====================================================================
          7. MODAL OVERLAY PANELS (Order, Customize, Inquire, Contact)
      ====================================================================== */}
      {activeModal.type !== null && (
        <div className="fixed inset-0 z-50 bg-[#1A110B]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div 
            className="bg-[#EDE8DC] text-[#1A110B] rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-[#1A110B]/15 animate-scale-up flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-[#E5DFCE] border-b border-[#1A110B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-[#1A110B]" />
                <span className="font-serif font-bold text-xl">
                  {activeModal.type === 'customize' && 'Customize Your Drink'}
                  {activeModal.type === 'order' && 'Start Online Order'}
                  {activeModal.type === 'inquire' && `Inquire: ${activeModal.data?.title}`}
                  {activeModal.type === 'contact' && 'Expert Consultation'}
                </span>
              </div>
              <button 
                onClick={() => setActiveModal({ type: null })}
                className="p-2 rounded-full hover:bg-[#1A110B]/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* CUSTOMIZE DRINK MODAL */}
              {activeModal.type === 'customize' && activeModal.data && (
                <>
                  <div className="flex gap-4 items-center">
                    <img src={activeModal.data.image} alt={activeModal.data.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div>
                      <span className="text-xs font-mono uppercase text-[#1A110B]/60">{activeModal.data.category}</span>
                      <h4 className="font-serif font-bold text-2xl">{activeModal.data.name}</h4>
                      <div className="font-mono font-bold text-lg text-[#8C7662]">{activeModal.data.price}</div>
                    </div>
                  </div>

                  <p className="text-sm text-[#1A110B]/80">{activeModal.data.description}</p>

                  {/* Milk selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Select Milk Base</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Whole Milk', 'Oat Milk (+$0.00)', 'Macadamia Milk', 'Almond Milk'].map(milk => (
                        <button
                          key={milk}
                          type="button"
                          onClick={() => setSelectedMilk(milk)}
                          className={`p-3 rounded-xl text-left text-xs font-medium border cursor-pointer transition-all ${
                            selectedMilk === milk 
                              ? 'bg-[#1A110B] text-[#EDE8DC] border-[#1A110B]' 
                              : 'bg-white/50 border-[#1A110B]/15 hover:border-[#1A110B]/40'
                          }`}
                        >
                          {milk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold">Beverage Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Short (8oz)', 'Regular (12oz)', 'Large (16oz)'].map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 rounded-xl text-center text-xs font-medium border cursor-pointer transition-all ${
                            selectedSize === size 
                              ? 'bg-[#1A110B] text-[#EDE8DC] border-[#1A110B]' 
                              : 'bg-white/50 border-[#1A110B]/15 hover:border-[#1A110B]/40'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#1A110B]/10">
                    <span className="text-sm font-bold">Quantity</span>
                    <div className="flex items-center gap-3 bg-white/60 px-3 py-1 rounded-full border border-[#1A110B]/20">
                      <button 
                        type="button"
                        onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#1A110B]/10 font-bold"
                      >-</button>
                      <span className="font-mono font-bold w-6 text-center">{itemQuantity}</span>
                      <button 
                        type="button"
                        onClick={() => setItemQuantity(itemQuantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#1A110B]/10 font-bold"
                      >+</button>
                    </div>
                  </div>
                </>
              )}

              {/* QUICK ORDER MODAL */}
              {activeModal.type === 'order' && (
                <div className="space-y-4">
                  <p className="text-sm text-[#1A110B]/80">
                    Select your preferred pickup location or order delivery straight to your door.
                  </p>
                  <div className="p-4 rounded-2xl bg-white/60 border border-[#1A110B]/15 space-y-3">
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#8C7662]" /> SoHo Flagship (Mercer St)</span>
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Ready in ~6 mins</span>
                    </div>
                    <p className="text-xs text-[#1A110B]/60">Order ahead to skip the counter queue.</p>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-mono uppercase tracking-wider mb-1 font-bold">Your Name for Order</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alex" 
                      defaultValue="Guest Ritualist"
                      className="w-full p-3.5 rounded-xl bg-white border border-[#1A110B]/20 focus:outline-none focus:ring-2 focus:ring-[#1A110B] text-sm"
                    />
                  </div>
                </div>
              )}

              {/* EVENT INQUIRY MODAL */}
              {activeModal.type === 'inquire' && activeModal.data && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setToastMessage(`Your inquiry for "${activeModal.data.title}" has been sent! We will contact you shortly.`);
                  setActiveModal({ type: null });
                }} className="space-y-4">
                  <p className="text-sm text-[#1A110B]/80">
                    Please share a few details about your upcoming gathering and our event coordinator will reply within 24 hours.
                  </p>
                  
                  <div>
                    <label className="block text-xs font-mono uppercase mb-1 font-bold">Your Email</label>
                    <input required type="email" placeholder="alex@company.example" className="w-full p-3 rounded-xl bg-white border border-[#1A110B]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A110B]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase mb-1 font-bold">Estimated Guests</label>
                      <input required type="number" placeholder="25" className="w-full p-3 rounded-xl bg-white border border-[#1A110B]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A110B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase mb-1 font-bold">Target Date</label>
                      <input required type="date" className="w-full p-3 rounded-xl bg-white border border-[#1A110B]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A110B]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase mb-1 font-bold">Additional Notes / Requests</label>
                    <textarea rows={3} placeholder="Dietary restrictions, preferred espresso bar setup..." className="w-full p-3 rounded-xl bg-white border border-[#1A110B]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A110B]" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#1A110B] text-[#EDE8DC] font-semibold text-sm hover:bg-[#342418] transition-colors cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}

              {/* CONTACT MODAL */}
              {activeModal.type === 'contact' && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 bg-[#1A110B] text-[#EDE8DC] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-8 h-8 text-[#C8B69E]" />
                  </div>
                  <h4 className="font-serif font-bold text-2xl">Joe's Concierge Desk</h4>
                  <p className="text-sm text-[#1A110B]/80 max-w-sm mx-auto">
                    Our roastery experts are currently online. Start a live conversation or leave your number for a prompt callback.
                  </p>
                  <div className="pt-4 flex flex-col gap-2">
                    <button 
                      onClick={() => { setToastMessage("Connecting you to a certified barista..."); setActiveModal({ type: null }); }}
                      className="w-full py-3.5 rounded-full bg-[#1A110B] text-[#EDE8DC] font-medium text-sm hover:bg-[#342418] transition-colors cursor-pointer"
                    >
                      Start Live Chat Now
                    </button>
                    <button 
                      onClick={() => setActiveModal({ type: null })}
                      className="w-full py-3.5 rounded-full border border-[#1A110B] text-[#1A110B] font-medium text-sm hover:bg-[#1A110B]/5 transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Action for Customize or Order */}
            {(activeModal.type === 'customize' || activeModal.type === 'order') && (
              <div className="p-6 sm:p-8 bg-white border-t border-[#1A110B]/10 flex items-center justify-between gap-4">
                {activeModal.type === 'customize' && activeModal.data ? (
                  <>
                    <div>
                      <div className="text-xs text-[#1A110B]/60 font-mono">Total Item Price</div>
                      <div className="font-serif font-bold text-2xl">
                        ${(parseFloat(activeModal.data.price.replace('$', '')) * itemQuantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(activeModal.data, selectedMilk, selectedSize)}
                      className="flex-1 max-w-xs py-4 rounded-full bg-[#1A110B] text-[#EDE8DC] font-semibold text-sm hover:bg-[#342418] hover:scale-[1.02] active:scale-95 transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Order</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage("Order session initialized! Select items from the menu to build your cart.");
                      setActiveModal({ type: null });
                      window.location.hash = '#menu';
                    }}
                    className="w-full py-4 rounded-full bg-[#1A110B] text-[#EDE8DC] font-semibold text-sm hover:bg-[#342418] active:scale-95 transition-all shadow-xl cursor-pointer text-center"
                  >
                    Browse Menu & Add Items
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* =====================================================================
          8. CART DRAWER OVERLAY
      ====================================================================== */}
      <div className={`fixed inset-0 z-50 bg-[#1A110B]/70 backdrop-blur-sm transition-opacity duration-300 ${
        isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#EDE8DC] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          
          {/* Cart Drawer Header */}
          <div className="p-6 sm:p-8 bg-[#E5DFCE] border-b border-[#1A110B]/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1A110B]" />
              <span className="font-serif font-bold text-xl">Your Joe's Ritual</span>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#1A110B]/10 rounded-full cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Drawer Items List */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#1A110B]/60">
                <Coffee className="w-12 h-12 mb-4 opacity-40 animate-bounce" />
                <h5 className="font-serif font-bold text-xl text-[#1A110B]">Your cup is empty</h5>
                <p className="text-xs mt-1 max-w-xs">Explore handcrafted espresso and morning pastries from our menu.</p>
                <button
                  onClick={() => { setIsCartOpen(false); window.location.hash = '#menu'; }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#1A110B] text-[#EDE8DC] text-xs font-semibold uppercase tracking-wider hover:bg-[#342418] transition-colors cursor-pointer"
                >
                  View Menu
                </button>
              </div>
            ) : (
              cart.map((ci, idx) => (
                <div key={`${ci.id}-${idx}`} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 border border-[#1A110B]/10">
                  <img src={ci.image} alt={ci.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h6 className="font-serif font-bold text-sm truncate">{ci.name}</h6>
                    <div className="text-[11px] text-[#1A110B]/60 font-mono mt-0.5">{ci.selectedSize} • {ci.selectedMilk}</div>
                    <div className="text-xs font-bold font-mono mt-1 text-[#8C7662]">
                      {ci.price} x {ci.quantity}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="p-2 text-[#1A110B]/40 hover:text-red-700 transition-colors cursor-pointer"
                    title="Remove Item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Drawer Checkout Base */}
          {cart.length > 0 && (
            <div className="p-6 sm:p-8 bg-white border-t border-[#1A110B]/10 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#1A110B]/70">Subtotal</span>
                <span className="font-mono font-bold">${totalCartPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#1A110B]/70">Estimated Taxes</span>
                <span className="font-mono font-bold">${(totalCartPrice * 0.08875).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-[#1A110B]/10">
                <span>Total Due</span>
                <span className="font-serif text-2xl text-[#8C7662]">${(totalCartPrice * 1.08875).toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  setToastMessage("Order confirmed! Preparing your espresso at Joe's Coffee.");
                  setCart([]);
                  setIsCartOpen(false);
                }}
                className="w-full py-4 rounded-full bg-[#1A110B] text-[#EDE8DC] font-semibold text-sm hover:bg-[#342418] hover:scale-[1.01] active:scale-95 transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Complete Order & Pay</span>
                <Check className="w-4 h-4 text-[#C8B69E]" />
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
