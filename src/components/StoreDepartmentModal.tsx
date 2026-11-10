import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, MessageCircle, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { STORE_CATEGORIES, ALL_STORE_PRODUCTS, StoreCategory, StoreProduct } from '../data/storeProducts';

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}

interface StoreDepartmentModalProps {
  isOpen: boolean;
  initialCategoryId: string | null;
  initialViewMode?: 'browse' | 'checkout';
  cart: Record<string, CartItem>;
  onUpdateQuantity: (product: StoreProduct, delta: number) => void;
  onClearCart: () => void;
  onClose: () => void;
}

export const StoreDepartmentModal: React.FC<StoreDepartmentModalProps> = ({
  isOpen,
  initialCategoryId,
  initialViewMode = 'browse',
  cart,
  onUpdateQuantity,
  onClearCart,
  onClose,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'browse' | 'checkout'>(initialViewMode);

  // Sync category on reopen
  useEffect(() => {
    if (initialCategoryId) {
      setActiveCategoryId(initialCategoryId);
    }
    setViewMode(initialViewMode);
  }, [initialCategoryId, initialViewMode, isOpen]);

  // Cart calculations
  const cartEntries = Object.values(cart).filter((item) => item.quantity > 0);
  const cartTotalCount = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cartEntries.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Date selection
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  const inTwoDaysObj = new Date();
  inTwoDaysObj.setDate(inTwoDaysObj.getDate() + 2);
  const inTwoDaysStr = inTwoDaysObj.toISOString().split('T')[0];

  const formatDateDisplay = (dateString: string) => {
    try {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).toUpperCase();
      }
    } catch {
      // fallback
    }
    return dateString;
  };

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const getPresetLabel = () => {
    if (selectedDate === todayStr) return 'TODAY';
    if (selectedDate === tomorrowStr) return 'TOMORROW';
    if (selectedDate === inTwoDaysStr) return 'IN 2 DAYS';
    return formatDateDisplay(selectedDate);
  };

  // Filter products by category & search
  const filteredProducts = useMemo(() => {
    let baseList =
      activeCategoryId === 'all'
        ? ALL_STORE_PRODUCTS
        : STORE_CATEGORIES.find((c) => c.id === activeCategoryId)?.products || ALL_STORE_PRODUCTS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      baseList = baseList.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.size && p.size.toLowerCase().includes(q))
      );
    }
    return baseList;
  }, [activeCategoryId, searchQuery]);

  // Generate customized WhatsApp order message
  const generateWhatsAppMessage = () => {
    const dateText = getPresetLabel() === selectedDate ? selectedDate : `${getPresetLabel()} (${formatDateDisplay(selectedDate)})`;

    let itemsList = cartEntries
      .map((entry) => `• *${entry.quantity}x ${entry.product.name}* — ₹${entry.product.price * entry.quantity}`)
      .join('\n');

    if (!itemsList) {
      itemsList = '• *(Inquiring about store catalog items)*';
    }

    const message = `Hello Pets World Pets Care!
I would like to order / check availability for the following items at your Kankarbagh Pet Store:

${itemsList}

*Estimated Total: ₹${cartTotalPrice}*
*Available Visiting / Pickup Date:* ${dateText}

If any item is out of stock, please arrange/restock it specially for me at zero extra charge. Thank you!`;

    return `https://api.whatsapp.com/send?phone=918271046719&text=${encodeURIComponent(message)}`;
  };

  const currentCategoryObj = STORE_CATEGORIES.find((c) => c.id === activeCategoryId);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Bright, luminous, frosted glass modal container */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[88vh] overflow-hidden rounded-[26px] sm:rounded-[30px] bg-gradient-to-b from-slate-800/95 via-slate-900/95 to-slate-950/98 backdrop-blur-3xl text-white shadow-[0_25px_80px_rgba(0,0,0,0.65),inset_0_1px_3px_rgba(255,255,255,0.6)] flex flex-col border-2 border-white/35"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Atmospheric animal wallpaper in modal - bright & vibrant */}
        {currentCategoryObj?.image && (
          <div className="absolute inset-0 rounded-[26px] sm:rounded-[30px] overflow-hidden pointer-events-none -z-10">
            <img
              src={currentCategoryObj.image}
              alt=""
              className="w-full h-full object-cover blur-[1.5px] scale-102 opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          </div>
        )}

        {/* Top Header Bar - Brightened */}
        <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between shrink-0 bg-white/[0.12] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {viewMode === 'checkout' && (
              <button
                type="button"
                onClick={() => setViewMode('browse')}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                title="Back to products"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <span className="small-caps-clean text-[9px] text-white/80 font-medium block">
                {viewMode === 'browse'
                  ? currentCategoryObj
                    ? `${currentCategoryObj.departmentNum} · ${currentCategoryObj.tag}`
                    : 'ALL 7 DEPARTMENTS · 91+ STORE ESSENTIALS'
                  : 'ORDER SUMMARY & WHATSAPP CHECKOUT'}
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl text-white leading-tight drop-shadow-sm font-medium">
                {viewMode === 'browse'
                  ? currentCategoryObj
                    ? currentCategoryObj.title
                    : 'Store Catalog & Refill'
                  : 'Review Your Selected Items'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartTotalCount > 0 && viewMode === 'browse' && (
              <button
                type="button"
                onClick={() => setViewMode('checkout')}
                className="hidden sm:flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-emerald-500/30 border border-emerald-300 text-emerald-200 hover:bg-emerald-500/40 transition-all cursor-pointer font-medium shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="small-caps-clean text-[9.5px]">
                  {cartTotalCount} · ₹{cartTotalPrice}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/25 border border-white/20 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: BROWSE PRODUCTS */}
        {viewMode === 'browse' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Search Bar & Category Switcher Pills - Brightened Container */}
            <div className="p-3.5 sm:p-4 border-b border-white/20 shrink-0 space-y-3 bg-white/[0.08] backdrop-blur-md">
              {/* Search input with 16px text-size on mobile to permanently eliminate iOS Safari zoom */}
              <div className="relative">
                <Search className="w-4 h-4 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="SEARCH SHAMPOOS, CHEWS, ROYAL CANIN, BARKSON, DROOLS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 sm:py-2.5 bg-white/15 hover:bg-white/20 border-2 border-white/30 focus:border-white focus:bg-white/25 rounded-xl text-[16px] sm:text-xs text-white placeholder-white/60 focus:outline-none small-caps-clean tracking-wider shadow-inner transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills (Horizontal Scrollable) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                <button
                  type="button"
                  onClick={() => setActiveCategoryId('all')}
                  className={`small-caps-clean px-3.5 py-1.5 rounded-full text-[8.5px] tracking-[0.2em] whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    activeCategoryId === 'all'
                      ? 'border-2 border-white bg-white text-slate-950 font-bold shadow-md'
                      : 'border border-white/30 bg-white/15 text-white/90 hover:bg-white/25 hover:text-white'
                  }`}
                >
                  ALL 91+ ITEMS
                </button>
                {STORE_CATEGORIES.map((cat) => {
                  const isSelected = activeCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={`small-caps-clean px-3.5 py-1.5 rounded-full text-[8.5px] tracking-[0.2em] whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-2 border-white bg-white text-slate-950 font-bold shadow-md'
                          : 'border border-white/30 bg-white/15 text-white/90 hover:bg-white/25 hover:text-white'
                      }`}
                    >
                      {cat.title} ({cat.itemCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Product List with Bright Frosted Cards */}
            <div className="flex-1 overflow-y-auto overscroll-contain modal-scrollbar p-3 sm:p-5 space-y-2.5 bg-black/10">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-white/60 flex flex-col items-center">
                  <Search className="w-8 h-8 opacity-50 mb-2" />
                  <span className="small-caps-clean text-[10px] font-medium">NO PRODUCTS MATCH YOUR SEARCH</span>
                  <p className="text-[10px] text-white/50 mt-1">Try another brand name or clear your search query.</p>
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const qty = cart[product.id]?.quantity || 0;
                  return (
                    <div
                      key={product.id}
                      className="p-3.5 sm:p-4 rounded-2xl border border-white/25 bg-white/[0.12] hover:bg-white/[0.20] backdrop-blur-md transition-all flex items-center justify-between gap-3 shadow-md"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="small-caps-clean text-[9px] text-emerald-200 font-mono tracking-wider bg-emerald-500/25 border border-emerald-300 px-2 py-0.5 rounded font-bold shadow-sm">
                            ₹{product.price}
                          </span>
                          {product.size && (
                            <span className="small-caps-clean text-[8px] text-white/80 border border-white/25 bg-white/10 px-2 py-0.5 rounded font-medium">
                              {product.size}
                            </span>
                          )}
                          {product.brand && (
                            <span className="small-caps-clean text-[7.5px] text-white/60 hidden sm:inline">
                              {product.brand}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif-display text-sm sm:text-base text-white font-medium leading-snug truncate drop-shadow-sm">
                          {product.name}
                        </h4>
                      </div>

                      {/* Add Button or Quantity Counter */}
                      <div className="shrink-0">
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product, 1)}
                            className="py-1.5 px-3.5 rounded-xl border-2 border-white/40 bg-white/20 hover:bg-white/35 hover:border-white text-white transition-all cursor-pointer flex items-center gap-1.5 group shadow-sm font-semibold"
                          >
                            <Plus className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                            <span className="small-caps-clean text-[9px] tracking-[0.2em]">ADD</span>
                          </button>
                        ) : (
                          <div className="flex items-center rounded-xl border-2 border-white/40 bg-white/30 overflow-hidden shadow-md">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product, -1)}
                              className="p-1.5 hover:bg-white/25 text-white transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="small-caps-clean text-[10px] text-white font-mono px-2.5 min-w-[22px] text-center font-bold">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product, 1)}
                              className="p-1.5 hover:bg-white/25 text-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sticky Bottom Cart Bar - Brightened */}
            {cartTotalCount > 0 && (
              <div className="p-3.5 sm:p-4 border-t border-white/25 bg-slate-900/95 backdrop-blur-2xl shrink-0 flex items-center justify-between gap-3 shadow-2xl">
                <div className="flex flex-col">
                  <span className="small-caps-clean text-[8.5px] text-white/80 font-medium">
                    {cartTotalCount} {cartTotalCount === 1 ? 'ITEM' : 'ITEMS'} SELECTED
                  </span>
                  <span className="font-serif-display text-xl sm:text-2xl text-emerald-300 font-bold leading-none drop-shadow-sm">
                    ₹{cartTotalPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode('checkout')}
                  className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-2 cursor-pointer shadow-xl border border-emerald-300 transition-all"
                >
                  <span className="small-caps-clean text-[9.5px] sm:text-[10px] tracking-[0.2em] font-bold">
                    PROCEED TO DATE & INQUIRY
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW MODE 2: CHECKOUT & INQUIRY STEP */}
        {viewMode === 'checkout' && (
          <div className="flex-1 overflow-y-auto overscroll-contain modal-scrollbar p-4 sm:p-6 space-y-4 bg-black/10">
            {/* Order Summary Box - Brightened */}
            <div className="p-4 sm:p-5 rounded-2xl border border-white/25 bg-white/[0.12] backdrop-blur-md shadow-md">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/15 mb-3">
                <span className="small-caps-clean text-[10px] text-white flex items-center gap-1.5 font-semibold">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                  YOUR STORE BASKET ({cartTotalCount})
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setViewMode('browse')}
                    className="small-caps-clean text-[9px] text-emerald-300 hover:text-emerald-200 underline cursor-pointer font-medium"
                  >
                    + ADD MORE ITEMS
                  </button>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="small-caps-clean text-[8.5px] text-rose-300 hover:text-rose-200 flex items-center gap-1 cursor-pointer font-medium"
                    title="Clear Cart"
                  >
                    <Trash2 className="w-3 h-3" />
                    CLEAR
                  </button>
                </div>
              </div>

              {cartEntries.length === 0 ? (
                <div className="text-center py-6 text-white/60">
                  <span className="small-caps-clean text-[9.5px]">YOUR BASKET IS CURRENTLY EMPTY</span>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('browse')}
                      className="small-caps-clean text-[9.5px] text-emerald-300 underline cursor-pointer font-medium"
                    >
                      BROWSE OUR 91+ STORE ITEMS
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-48 overflow-y-auto modal-scrollbar pr-1">
                  {cartEntries.map((entry) => (
                    <div
                      key={entry.product.id}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-white/10 last:border-b-0"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-white font-medium truncate block text-[11px] drop-shadow-sm">
                          {entry.quantity}x {entry.product.name}
                        </span>
                        <span className="small-caps-clean text-[8px] text-white/60">
                          ₹{entry.product.price} EACH
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="small-caps-clean text-[10.5px] text-emerald-300 font-mono font-bold">
                          ₹{entry.product.price * entry.quantity}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(entry.product, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center bg-white/20 hover:bg-white/30 text-white text-[10px] cursor-pointer"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(entry.product, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center bg-white/20 hover:bg-white/30 text-white text-[10px] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total Row */}
              <div className="pt-3 mt-3 border-t border-white/15 flex items-center justify-between">
                <span className="small-caps-clean text-[10.5px] text-white/90 font-medium">
                  ESTIMATED STORE TOTAL
                </span>
                <span className="font-serif-display text-2xl text-emerald-300 font-bold drop-shadow-sm">
                  ₹{cartTotalPrice}
                </span>
              </div>
            </div>

            {/* Select Visiting Date - Brightened */}
            <div className="p-4 sm:p-5 rounded-2xl border border-white/25 bg-white/[0.12] backdrop-blur-md shadow-md text-center">
              <label className="small-caps-clean text-[10px] text-white mb-2.5 block flex items-center justify-center gap-1.5 font-semibold">
                <CalendarIcon className="w-3.5 h-3.5 text-emerald-300" />
                SELECT YOUR AVAILABLE VISITING / PICKUP DATE
              </label>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setSelectedDate(todayStr)}
                  className={`small-caps-clean px-4 py-2 text-[9.5px] rounded-xl border-2 transition-all cursor-pointer ${
                    selectedDate === todayStr
                      ? 'border-white bg-white text-slate-950 font-bold shadow-md'
                      : 'border-white/30 bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  TODAY
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate(tomorrowStr)}
                  className={`small-caps-clean px-4 py-2 text-[9.5px] rounded-xl border-2 transition-all cursor-pointer ${
                    selectedDate === tomorrowStr
                      ? 'border-white bg-white text-slate-950 font-bold shadow-md'
                      : 'border-white/30 bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  TOMORROW
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate(inTwoDaysStr)}
                  className={`small-caps-clean px-4 py-2 text-[9.5px] rounded-xl border-2 transition-all cursor-pointer ${
                    selectedDate === inTwoDaysStr
                      ? 'border-white bg-white text-slate-950 font-bold shadow-md'
                      : 'border-white/30 bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  IN 2 DAYS
                </button>
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="date"
                  value={selectedDate}
                  min={todayStr}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 text-[16px] sm:text-xs text-center text-white bg-white/15 border-2 border-white/30 rounded-xl cursor-pointer focus:outline-none focus:border-white small-caps-clean font-medium shadow-inner"
                />
              </div>

              <span className="small-caps-clean text-[9.5px] text-white/80 mt-2.5 block font-medium">
                VISITING / PICKUP DATE: {formatDateDisplay(selectedDate)}
              </span>
            </div>

            {/* 1-Tap Automated WhatsApp Inquiry Button - High Contrast & Vibrant */}
            <div className="pt-2">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 group cursor-pointer no-underline shadow-2xl transition-all border-2 border-emerald-300 font-bold"
              >
                <MessageCircle className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                <span className="small-caps-clean text-[10px] sm:text-[11px] text-slate-950 tracking-[0.22em] font-bold">
                  ORDER / INQUIRE ON WHATSAPP (+91 82710 46719)
                </span>
              </a>
              <span className="small-caps-clean text-[8.5px] text-white/60 text-center block mt-2">
                INSTANT ROUTING TO CHIEF VETERINARIAN & STORE DIRECTOR
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
