import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Check, Calendar as CalendarIcon, MessageCircle } from 'lucide-react';
import { CLINIC_CATEGORIES, ClinicCategory } from '../data/clinicData';

interface ClinicCategoryModalProps {
  isOpen: boolean;
  initialCategoryId: string | null;
  onClose: () => void;
}

export const ClinicCategoryModal: React.FC<ClinicCategoryModalProps> = ({
  isOpen,
  initialCategoryId,
  onClose,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Pet Selection State
  const PET_OPTIONS = [
    { id: 'DOG', label: 'DOG / PUPPY', queryName: 'Dog / Puppy' },
    { id: 'CAT', label: 'CAT / KITTEN', queryName: 'Cat / Kitten' },
    { id: 'BIRD_SMALL', label: 'BIRD / SMALL PET', queryName: 'Bird / Small Pet' },
  ];
  const [selectedPet, setSelectedPet] = useState<string>('DOG');

  // Date Selection State
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

  // Sync category on modal reopen
  useEffect(() => {
    if (initialCategoryId) {
      setActiveCategoryId(initialCategoryId);
    }
    setSelectedServices([]);
    setSearchQuery('');
  }, [initialCategoryId, isOpen]);

  // Current category object
  const currentCategory = useMemo(() => {
    return CLINIC_CATEGORIES.find((c) => c.id === activeCategoryId);
  }, [activeCategoryId]);

  // Toggle sub-service selection
  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  // Filtered sub-services according to active category and search
  const visibleSubServices = useMemo(() => {
    let list: { name: string; categoryTitle: string }[] = [];

    if (activeCategoryId === 'all') {
      CLINIC_CATEGORIES.forEach((cat) => {
        cat.subServices.forEach((sub) => {
          list.push({ name: sub, categoryTitle: cat.title });
        });
      });
    } else if (currentCategory) {
      currentCategory.subServices.forEach((sub) => {
        list.push({ name: sub, categoryTitle: currentCategory.title });
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.categoryTitle.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategoryId, currentCategory, searchQuery]);

  const getChosenPetText = () => {
    const found = PET_OPTIONS.find((p) => p.id === selectedPet);
    return found ? found.queryName : 'Pet';
  };

  // Generate structured WhatsApp Inquiry URL
  const generateWhatsAppUrl = () => {
    const categoryName = currentCategory ? currentCategory.title : 'Veterinary Clinic Services';
    const dateText = getPresetLabel() === selectedDate ? selectedDate : `${getPresetLabel()} (${formatDateDisplay(selectedDate)})`;
    const petText = getChosenPetText();

    let servicesBlock = '';
    if (selectedServices.length > 0) {
      servicesBlock = `*Selected Clinical Services:*\n` + selectedServices.map((s) => `• ${s}`).join('\n');
    } else {
      servicesBlock = `*Selected Service:* General Consultation & Care for this Department`;
    }

    const message = `Hello Doctor at Pets World Pets Care!
I would like to book an appointment / inquire about *${categoryName}* for my *${petText}*.

${servicesBlock}

*Available Visiting Date:* ${dateText}
*Location:* Malahi Pakhri Chowk, 90 Feet Road, Kankarbagh

Please confirm the slot, or let me know if any special vaccine/medicine needs to be arranged for my pet at zero extra charge. Thank you!`;

    return `https://api.whatsapp.com/send?phone=918271046719&text=${encodeURIComponent(message)}`;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Centered Dark-Luxury Modal Box */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[26px] sm:rounded-[30px] bg-gradient-to-b from-slate-900/98 via-[#0b1019]/98 to-[#06090e]/98 backdrop-blur-3xl text-white shadow-[0_25px_80px_rgba(0,0,0,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] flex flex-col border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/15 flex items-center justify-between shrink-0 bg-white/[0.04] backdrop-blur-xl">
          <div>
            <span className="small-caps-clean text-[9px] text-white/70 tracking-[0.25em] font-medium block">
              PET CLINIC INQUIRY & APPOINTMENT REQUEST
            </span>
            <h3 className="font-serif-display text-xl sm:text-2xl text-white leading-tight drop-shadow-sm font-medium mt-0.5">
              {currentCategory ? currentCategory.title : 'All Clinical Departments'}
            </h3>
            {currentCategory && (
              <span className="font-serif-italic text-sm sm:text-base text-white/70 block mt-0.5">
                {currentCategory.subtitle}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain modal-scrollbar p-4 sm:p-6 space-y-5">

          {/* Sub-Services Selection Section */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <label className="small-caps-clean text-[10px] text-white/80 tracking-[0.2em] block">
                SELECT THE SPECIFIC SERVICE(S) YOU NEED:
              </label>
              {selectedServices.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedServices([])}
                  className="small-caps-clean text-[8.5px] text-white/50 hover:text-white underline cursor-pointer"
                >
                  CLEAR SELECTION ({selectedServices.length})
                </button>
              )}
            </div>

            {/* Quick Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="SEARCH PROCEDURES, VACCINES, SURGERIES, TESTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white/5 hover:bg-white/10 border border-white/20 focus:border-white/50 rounded-xl text-[16px] sm:text-xs text-white placeholder-white/40 focus:outline-none small-caps-clean tracking-wider transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sub-Services Interactive Pill List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto modal-scrollbar pr-1">
              {visibleSubServices.length === 0 ? (
                <div className="col-span-full py-6 text-center text-white/50 text-xs small-caps-clean">
                  NO PROCEDURES MATCH YOUR SEARCH
                </div>
              ) : (
                visibleSubServices.map((item) => {
                  const isChecked = selectedServices.includes(item.name);
                  return (
                    <div
                      key={item.name}
                      onClick={() => toggleService(item.name)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 text-left select-none ${
                        isChecked
                          ? 'border-emerald-400/80 bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-xs sm:text-[13px] text-white font-medium block leading-snug">
                          {item.name}
                        </span>
                        {activeCategoryId === 'all' && (
                          <span className="small-caps-clean text-[7.5px] text-white/50 tracking-wider block mt-0.5">
                            {item.categoryTitle}
                          </span>
                        )}
                      </div>

                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                            : 'border-white/30 bg-white/5'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {selectedServices.length === 0 && (
              <p className="small-caps-clean text-[8px] text-white/50 text-center tracking-[0.18em]">
                (DEFAULT: INQUIRING ABOUT GENERAL CONSULTATION FOR THIS DEPARTMENT)
              </p>
            )}
          </div>

          {/* Step 1: Choose Your Pet Option */}
          <div className="w-full flex flex-col items-center pt-2 border-t border-white/10">
            <label className="small-caps-clean text-[9.5px] sm:text-[10px] text-white/80 mb-2 tracking-[0.2em]">
              CHOOSE YOUR PET FOR CUSTOMIZED INQUIRY
            </label>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PET_OPTIONS.map((pet) => {
                const isSelected = selectedPet === pet.id;
                return (
                  <button
                    key={pet.id}
                    type="button"
                    onClick={() => setSelectedPet(pet.id)}
                    className={`small-caps-clean px-3.5 py-1.5 text-[9px] sm:text-[9.5px] rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white bg-white/20 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                        : 'border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40'
                    }`}
                  >
                    {pet.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Available Visiting Date */}
          <div className="w-full flex flex-col items-center pt-2 border-t border-white/10">
            <label className="small-caps-clean text-[9.5px] sm:text-[10px] text-white/80 mb-2 tracking-[0.2em] flex items-center justify-center gap-1.5">
              <CalendarIcon className="w-3 h-3 text-white/70" />
              SELECT YOUR AVAILABLE VISITING DATE
            </label>

            {/* Quick Date Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2.5">
              <button
                type="button"
                onClick={() => setSelectedDate(todayStr)}
                className={`small-caps-clean px-3.5 py-1.5 text-[9px] rounded-xl border transition-all cursor-pointer ${
                  selectedDate === todayStr
                    ? 'border-white bg-white/20 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40'
                }`}
              >
                TODAY
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate(tomorrowStr)}
                className={`small-caps-clean px-3.5 py-1.5 text-[9px] rounded-xl border transition-all cursor-pointer ${
                  selectedDate === tomorrowStr
                    ? 'border-white bg-white/20 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40'
                }`}
              >
                TOMORROW
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate(inTwoDaysStr)}
                className={`small-caps-clean px-3.5 py-1.5 text-[9px] rounded-xl border transition-all cursor-pointer ${
                  selectedDate === inTwoDaysStr
                    ? 'border-white bg-white/20 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40'
                }`}
              >
                IN 2 DAYS
              </button>
            </div>

            {/* Exact Date Picker Input */}
            <div className="relative flex items-center justify-center">
              <input
                type="date"
                value={selectedDate}
                min={todayStr}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-1.5 text-[16px] sm:text-xs text-center text-white bg-white/5 border border-white/20 rounded-xl cursor-pointer focus:outline-none focus:border-white/50"
              />
            </div>

            {/* Summary Micro-Text Line */}
            <span className="small-caps-clean text-[8.5px] sm:text-[9px] text-white/60 mt-2 text-center tracking-[0.18em]">
              CHOSEN PET: {getChosenPetText().toUpperCase()} • VISITING DATE: {formatDateDisplay(selectedDate)}
            </span>
          </div>
        </div>

        {/* 1-Tap WhatsApp Owner Inquiry Action Bar */}
        <div className="p-4 sm:p-5 border-t border-white/15 bg-white/[0.04] flex flex-col items-center justify-center shrink-0">
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl liquid-glass-interactive text-white flex items-center justify-center gap-2 group cursor-pointer no-underline border-white/30 hover:border-emerald-400"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="small-caps-clean text-[10px] sm:text-[10.5px] text-white tracking-[0.22em] font-medium">
              CONSULT ON WHATSAPP (+91 82710 46719)
            </span>
          </a>
          <span className="small-caps-clean text-[7.5px] sm:text-[8px] text-white/40 tracking-[0.2em] mt-2">
            INSTANT ROUTING TO CHIEF VETERINARIAN & STORE DIRECTOR
          </span>
        </div>
      </div>
    </div>
  );
};
