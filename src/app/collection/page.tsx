'use client';

import CollectionPageSkeleton from '@/components/common/CollectionPageSkeleton';
import { PageLayout } from '@/components/common';
import {
  CollectionFiltersPanel,
  CollectionItemsView,
  CollectionStatsBar,
  IdolDetailModal,
} from '@/components/features';
import { Button, Label, ConfirmationDialog } from '@/components/ui';
import { filterCollectionItems, getCollectionCounts, sortCollectionItems } from '@/lib/collection-utils';
import { Idol } from '@/data/idols';
import { useGacha, useHydrated } from '@/hooks';
import { CollectionFilters, CollectionItem, CollectionSortOptions } from '@/types';
import { useState } from 'react';

export default function CollectionPage() {
  const { collection, exportCollection, importCollection, clearCollection, copyShareLink } = useGacha();
  const isHydrated = useHydrated();

  const [filters, setFilters] = useState<CollectionFilters>({
    rarity: 'all',
    group: 'all',
    search: '',
  });

  const [sortOption, setSortOption] = useState<CollectionSortOptions>({
    field: 'obtainedAt',
    direction: 'desc',
  });

  const [selectedIdol, setSelectedIdol] = useState<Idol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<boolean | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const success = importCollection(text);
      setImportError(success ? null : 'Invalid collection file format');
    } catch (error) {
      console.error('Error importing file:', error);
      setImportError('Error reading file');
    }

    event.target.value = '';
  };

  const openIdolDetails = (item: CollectionItem) => {
    setSelectedIdol(item.idol);
    setIsModalOpen(true);
  };

  const handleShare = async () => {
    const success = await copyShareLink();
    setShareSuccess(success);

    if (success) {
      setTimeout(() => setShareSuccess(null), 3000);
    }
  };

  if (!isHydrated) {
    return (
      <CollectionPageSkeleton
        title="My Idol Collection"
        subtitle="Manage, filter, and share your pulled cards."
      />
    );
  }

  const filteredAndSortedItems = sortCollectionItems(
    filterCollectionItems(collection.items, filters),
    sortOption
  );
  const { totalCards, uniqueCards } = getCollectionCounts(collection.items);

  return (
    <PageLayout
      title="My Idol Collection"
      subtitle="Manage, filter, and share your pulled cards."
      mainClassName="max-w-7xl"
    >
      <div className="w-full">
        <CollectionStatsBar
          totalCards={totalCards}
          uniqueCards={uniqueCards}
          actions={
            <>
              <Button
                data-cy="export-collection-button"
                onClick={exportCollection}
                variant="retro"
                size="sm"
                className="w-full sm:w-auto"
              >
                Export
              </Button>

              <Label
                htmlFor="import-collection"
                data-cy="import-collection-button"
                className="inline-flex items-center justify-center h-8 w-full sm:w-auto rounded-lg gap-1.5 px-3 text-sm font-semibold bg-retro-teal hover:bg-retro-navy text-white border-2 border-retro-brown shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] cursor-pointer transition-all"
              >
                Import
                <input
                  id="import-collection"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </Label>

              <Button
                data-cy="share-collection-button"
                onClick={handleShare}
                variant="retro-sage"
                size="sm"
                className="w-full sm:w-auto"
              >
                Share
              </Button>

              <Button
                data-cy="clear-collection-button"
                onClick={() => setIsConfirmDialogOpen(true)}
                variant="retro-coral"
                size="sm"
                className="w-full sm:w-auto"
              >
                Clear
              </Button>
            </>
          }
        />

        {shareSuccess !== null && (
          <div
            className={`mb-6 p-3 rounded-lg border-2 border-retro-brown text-sm text-center font-medium ${shareSuccess ? 'bg-retro-mint text-retro-brown' : 'bg-retro-coral text-white'}`}
          >
            {shareSuccess
              ? 'Share link copied to clipboard!'
              : 'Failed to copy share link. Please try again.'}
          </div>
        )}

        {importError && (
          <div className="mb-6 p-3 bg-retro-coral text-white rounded-lg border-2 border-retro-brown text-sm text-center">
            {importError}
          </div>
        )}
      </div>

      <CollectionFiltersPanel
        filters={filters}
        onFiltersChange={setFilters}
        sortOption={sortOption}
        onSortChange={setSortOption}
        showSort
      />

      <CollectionItemsView
        items={filteredAndSortedItems}
        title={
          filteredAndSortedItems.length > 0
            ? `Your Cards (${filteredAndSortedItems.length})`
            : 'Your Collection is Empty'
        }
        emptyTitle="No cards match your filters yet."
        emptyDescription="Adjust your filters or head home to pull some cards!"
        showEmptyCta
        onViewProfile={openIdolDetails}
      />

      <IdolDetailModal
        idol={selectedIdol}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        title="Clear Collection"
        description="Are you sure you want to clear your collection? This action cannot be undone."
        onConfirm={clearCollection}
        confirmText="Yes, Clear Collection"
        cancelText="Cancel"
        variant="destructive"
      />
    </PageLayout>
  );
}