import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, MessageCircle } from 'lucide-react';
import { InquiryModalState } from '../types';

interface VisitingDateModalProps {
  modalState: InquiryModalState;
  onClose: () => void;
}

export const VisitingDateModal: React.FC<VisitingDateModalProps> = ({
  modalState,
  onClose,
}) => {
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
        });
      }
    } catch {
      // fallback
    }
    return dateString;
  };

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [customNote, setCustomNote] = useState<string>('');

  const PET_OPTIONS = [
    { id: 'DOG', label: 'DOG / PUPPY', queryName: 'Dog / Puppy' },
    { id: 'CAT', label: 'CAT / KITTEN', queryName: 'Cat / Kitten' },
    { id: 'BIRD', label: 'BIRD', queryName: 'Bird' },
    { id: 'RABBIT', label: 'RABBIT', queryName: 'Rabbit' },
    { id: 'FISH', label: 'FISH', queryName: 'Fish' },
    { id: 'OTHER', label: 'OTHER PET', queryName: 'Pet' },
  ];

  const detectInitialPet = (title: string, category?: string): string => {
    const t = `${title} ${category || ''}`.toLowerCase();
    if (t.includes('cat') || t.includes('kitten') || t.includes('feline')) return 'CAT';
    if (t.includes('bird') || t.includes('avian')) return 'BIRD';
    if (t.includes('rabbit') || t.includes('hay')) return 'RABBIT';
    if (t.includes('fish') || t.includes('aquarium')) return 'FISH';
    return 'DOG';
  };

  const availablePetOptions = React.useMemo(() => {
    if (modalState.applicablePets && modalState.applicablePets.length > 0) {
      return PET_OPTIONS.filter((p) => modalState.applicablePets!.includes(p.id));
    }
    return PET_OPTIONS;
  }, [modalState.applicablePets]);

  const [selectedPet, setSelectedPet] = useState<string>(() => {
    if (modalState.applicablePets && modalState.applicablePets.length > 0) {
      return modalState.applicablePets[0];
    }
    return detectInitialPet(modalState.title, modalState.category);
  });
  const [customPetName, setCustomPetName] = useState<string>('');

  // Update initial pet selection whenever a new card/service is clicked
  React.useEffect(() => {
    if (modalState.isOpen) {
      if (modalState.applicablePets && modalState.applicablePets.length > 0) {
        setSelectedPet(modalState.applicablePets[0]);
      } else {
        setSelectedPet(detectInitialPet(modalState.title, modalState.category));
      }
      setCustomPetName('');
    }
  }, [modalState.isOpen, modalState.title, modalState.category, modalState.applicablePets]);

  const getPresetLabel = () => {
    if (selectedDate === todayStr) return 'Today';
    if (selectedDate === tomorrowStr) return 'Tomorrow';
    if (selectedDate === inTwoDaysStr) return 'In 2 Days';
    return formatDateDisplay(selectedDate);
  };

  const getChosenPetText = () => {
    if (selectedPet === 'OTHER' && customPetName.trim()) {
      return customPetName.trim();
    }
    const found = PET_OPTIONS.find((p) => p.id === selectedPet);
    return found ? found.queryName : 'Pet';
  };

  const getWhatsAppUrl = () => {
    let message = '';
    const dateText = getPresetLabel() === selectedDate ? selectedDate : `${getPresetLabel()} (${selectedDate})`;
    const petText = getChosenPetText();

    if (modalState.type === 'store') {
      message = `Hello Pets World Pets Care! I want to check if *${modalState.title}* is currently available for my *${petText}* at your Kankarbagh Pet Store. I am available to visit on *${dateText}*. If it is out of stock, please arrange/restock it specially for me at zero extra charge.`;
    } else if (modalState.type === 'clinic') {
      message = `Hello Doctor at Pets World Pets Care! I would like to inquire about *${modalState.title}* for my *${petText}* at your Kankarbagh Clinic. I am available to visit on *${dateText}*. Please confirm the slot, or let me know if any special vaccine/medicine needs to be arranged for my pet at zero extra charge.`;
    } else {
      const noteAddon = customNote.trim() ? ` My requirement: ${customNote.trim()}.` : '';
      message = `Hello Pets World Pets Care! I would like to request a special item or veterinary arrangement for my *${petText}*.${noteAddon} I am available to visit on *${dateText}*. Please arrange it specially for me at zero extra charge.`;
    }

    return `https://api.whatsapp.com/send?phone=918271046719&text=${encodeURIComponent(message)}`;
  };

  if (!modalState.isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[410px] max-h-[75vh] sm:max-h-[80vh] overflow-y-auto overscroll-contain modal-scrollbar p-5 sm:p-6 rounded-[24px] sm:rounded-[28px] liquid-glass text-center mx-auto flex flex-col items-center text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Sticky at top right so it remains accessible */}
        <div className="w-full flex justify-end sticky top-0 z-20 -mt-1 -mr-1">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-white/70 hover:text-white bg-black/20 hover:bg-white/10 backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Small-Caps Category Kicker */}
        <span className="small-caps-clean text-[9px] md:text-[10px] text-white/70 mb-1.5">
          {modalState.type === 'store'
            ? 'PET STORE INQUIRY & SPECIAL REFILL REQUEST'
            : modalState.type === 'clinic'
            ? 'VETERINARY CLINIC CONSULTATION INQUIRY'
            : 'SPECIAL OWNER ARRANGEMENT (ZERO EXTRA CHARGE)'}
        </span>

        {/* Item or Service Title in Font 1: Playfair Roman */}
        <h3 className="font-serif-display text-xl sm:text-2xl text-white my-1.5 px-2 leading-snug">
          {modalState.title}
        </h3>

        {modalState.highlight && (
          <p className="font-serif-italic text-base sm:text-lg text-white/85 mb-2.5">
            {modalState.highlight}
          </p>
        )}

        {/* Informational Zero-Extra-Charge Assurance */}
        <div className="w-full my-3 py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl">
          <p className="small-caps-clean text-[9px] sm:text-[10px] text-white/90 leading-relaxed">
            NO NAME REQUIRED • 1-TAP WHATSAPP CONSULTATION
            <br />
            <span className="text-white/60 text-[8px] sm:text-[9px]">
              IF OUT OF STOCK OR SPECIAL VACCINE NEEDED, WE REFILL EXCLUSIVELY FOR YOU AT ZERO EXTRA CHARGE
            </span>
          </p>
        </div>

        {/* Custom note field only for general special request */}
        {modalState.type === 'special' && (
          <div className="w-full my-2 text-center">
            <label className="block small-caps-clean text-[9px] text-white/70 mb-1.5">
              DESCRIBE YOUR PET ITEM OR SERVICE NEEDED (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="e.g. Royal Canin Renal Dog Food 2kg / Kitten Deworming"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full px-4 py-2.5 text-center text-[16px] sm:text-xs text-white placeholder-white/40 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-white/50"
            />
          </div>
        )}

        {/* Step 1: Choose Your Pet Option */}
        <div className="w-full my-3 flex flex-col items-center">
          <label className="small-caps-clean text-[10px] md:text-[11px] text-white/80 mb-2 flex items-center justify-center gap-1.5">
            {availablePetOptions.length === 1
              ? 'SUITABLE PET FOR THIS ITEM'
              : 'CHOOSE YOUR PET FOR CUSTOMIZED INQUIRY'}
          </label>

          {/* Render ONLY pets for which this item/service is made for */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2">
            {availablePetOptions.map((pet) => {
              const isSelected = selectedPet === pet.id;
              return (
                <button
                  key={pet.id}
                  type="button"
                  onClick={() => setSelectedPet(pet.id)}
                  className={`small-caps-clean px-3 py-1.5 text-[9px] sm:text-[9.5px] rounded-xl border transition-all cursor-pointer ${
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

          {availablePetOptions.length === 1 && (
            <span className="small-caps-clean text-[8px] text-white/50 mb-1">
              THIS CARE ESSENTIAL IS EXCLUSIVELY FORMULATED FOR {availablePetOptions[0].label}
            </span>
          )}

          {/* Optional write-in for OTHER pet */}
          {selectedPet === 'OTHER' && (
            <div className="w-full max-w-xs mt-1 mb-2">
              <input
                type="text"
                placeholder="SPECIFY PET TYPE (E.G. TURTLE, HAMSTER)"
                value={customPetName}
                onChange={(e) => setCustomPetName(e.target.value)}
                className="w-full px-3 py-1.5 text-center text-[16px] sm:text-xs text-white placeholder-white/40 bg-white/5 border border-white/25 rounded-xl focus:outline-none focus:border-white/60 small-caps-clean"
              />
            </div>
          )}
        </div>

        {/* Step 2: Available Visiting Date */}
        <div className="w-full my-3 flex flex-col items-center">
          <label className="small-caps-clean text-[10px] md:text-[11px] text-white/80 mb-3 flex items-center justify-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-white/80" />
            SELECT YOUR AVAILABLE VISITING DATE
          </label>

          {/* Quick Date Pills (functional state selectors) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setSelectedDate(todayStr)}
              className={`small-caps-clean px-3.5 py-1.5 text-[9.5px] rounded-xl border transition-all ${
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
              className={`small-caps-clean px-3.5 py-1.5 text-[9.5px] rounded-xl border transition-all ${
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
              className={`small-caps-clean px-3.5 py-1.5 text-[9.5px] rounded-xl border transition-all ${
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
              className="px-4 py-2 text-[16px] sm:text-xs text-center text-white bg-white/5 border border-white/25 rounded-xl cursor-pointer focus:outline-none focus:border-white/60"
            />
          </div>
          <span className="small-caps-clean text-[9px] text-white/60 mt-2">
            CHOSEN PET: {getChosenPetText().toUpperCase()} • VISITING DATE: {formatDateDisplay(selectedDate)}
          </span>
        </div>

        {/* WhatsApp Action Link - Native anchor tag with target="_blank" to prevent iframe blocking */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-2.5 py-3 px-5 rounded-xl liquid-glass-interactive text-white flex items-center justify-center gap-2 group cursor-pointer no-underline"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="small-caps-clean text-[9.5px] sm:text-[10px] text-white tracking-[0.22em]">
            CONSULT ON WHATSAPP (+91 82710 46719)
          </span>
        </a>

        <span className="small-caps-clean text-[8px] text-white/40 mt-3">
          INSTANT ROUTING TO CHIEF VETERINARIAN & STORE DIRECTOR
        </span>
      </div>
    </div>
  );
};
