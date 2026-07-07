import { ReactNode } from 'react';

interface CollectionStatsBarProps {
  totalCards: number;
  uniqueCards: number;
  actions?: ReactNode;
}

export function CollectionStatsBar({
  totalCards,
  uniqueCards,
  actions,
}: CollectionStatsBarProps) {
  return (
    <div className="w-full mb-6 retro-panel p-4 sm:p-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-wide text-retro-teal">
          Collection Stats
        </p>
        <p className="text-lg font-bold text-retro-brown">
          {totalCards} cards{' '}
          <span className="text-retro-navy font-medium text-base">
            ({uniqueCards} unique)
          </span>
        </p>
      </div>
      {actions && (
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}