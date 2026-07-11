import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Button } from '@/components/ui';
import { Idol } from '@/data/idols';
import { rarities } from '@/data/rarities';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface IdolDetailModalProps {
  idol: Idol | null;
  onClose: () => void;
  isOpen: boolean;
}

export const IdolDetailModal: React.FC<IdolDetailModalProps> = ({ idol, onClose, isOpen }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !idol) {
    return null;
  }

  const rarityInfo = rarities[idol.rarity];

  return (
    <div 
      data-cy="idol-detail-modal"
      className="fixed inset-0 bg-retro-brown/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="retro-panel max-w-3xl w-full max-h-[92dvh] sm:max-h-[90vh] overflow-hidden animate-scaleIn rounded-t-2xl rounded-b-none sm:rounded-xl">
        <div className="bg-retro-yellow px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b-3 border-retro-brown gap-3">
          <div>
            <h2 className="text-xl font-bungee text-retro-brown">{idol.stageName}</h2>
            <p className="text-sm text-retro-navy">{idol.group}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-retro-brown bg-retro-cream hover:bg-retro-mint transition-colors"
            aria-label="Close modal"
          >
            <X className="size-5 text-retro-brown" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92dvh-8rem)] sm:max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="relative aspect-[3/4] md:aspect-auto md:h-80 lg:h-96 w-full rounded-xl overflow-hidden border-3 border-retro-brown">
              <OptimizedImage
                src={idol.image}
                alt={`${idol.name} from ${idol.group}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="retro-panel-inset p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-retro-brown">Idol Information</h3>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border-2 ${rarityInfo.borderColor} ${rarityInfo.bgColor} ${rarityInfo.textColor}`}>
                  {rarityInfo.name}
                </span>
              </div>
              
              <dl className="space-y-3">
                {[
                  { label: 'Full Name', value: idol.name },
                  { label: 'Stage Name', value: idol.stageName },
                  { label: 'Group', value: idol.group },
                  { label: 'Birthdate', value: idol.birthdate },
                  { label: 'Birthplace', value: idol.birthplace },
                  { label: 'Position', value: idol.position },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-retro-navy/60">{label}</dt>
                    <dd className="font-semibold text-retro-brown">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          
          {idol.quote && (
            <div className="mt-5 p-4 bg-retro-yellow/25 border-2 border-dashed border-retro-brown rounded-xl">
              <p className="italic text-retro-brown text-center">&ldquo;{idol.quote}&rdquo;</p>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t-2 border-retro-brown bg-retro-cream/80 flex justify-end">
          <Button
            data-cy="close-modal-button"
            onClick={onClose}
            variant="retro"
            size="sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};