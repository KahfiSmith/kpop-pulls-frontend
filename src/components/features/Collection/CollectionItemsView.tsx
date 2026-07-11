'use client';

import { CollectionGrid, CollectionGridItem } from '@/components/features/Collection/CollectionGrid';
import { IdolCard } from '@/components/features/HomePage/IdolCard';
import { Button } from '@/components/ui';
import { CollectionItem } from '@/types/collection';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CollectionItemsViewProps {
  items: CollectionItem[];
  title: string;
  emptyTitle: string;
  emptyDescription: string;
  showEmptyCta?: boolean;
  onViewProfile: (item: CollectionItem) => void;
}

export function CollectionItemsView({
  items,
  title,
  emptyTitle,
  emptyDescription,
  showEmptyCta = false,
  onViewProfile,
}: CollectionItemsViewProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bungee text-retro-brown mb-5">{title}</h2>

      {items.length > 0 ? (
        <CollectionGrid>
          {items.map((item) => (
            <CollectionGridItem
              key={item.idol.id}
              data-cy={`collection-item-${item.idol.id}`}
            >
              <IdolCard
                name={item.idol.stageName}
                group={item.idol.group}
                birthdate={item.idol.birthdate}
                birthplace={item.idol.birthplace}
                position={item.idol.position}
                quote={item.idol.quote}
                imageSrc={item.idol.image}
                rarity={item.idol.rarity}
                countBadge={item.count}
                onViewProfile={() => onViewProfile(item)}
              />
            </CollectionGridItem>
          ))}
        </CollectionGrid>
      ) : (
        <div className="retro-panel py-12 px-6 text-center" data-cy="empty-collection">
          {showEmptyCta && <Sparkles className="size-10 text-retro-yellow mx-auto mb-4" />}
          <p className="text-retro-brown text-lg font-semibold">{emptyTitle}</p>
          <p className="text-retro-navy mt-2 text-sm">{emptyDescription}</p>
          {showEmptyCta && (
            <Link href="/" className="inline-block mt-5">
              <Button variant="retro" size="sm">
                Go Pull Cards
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}