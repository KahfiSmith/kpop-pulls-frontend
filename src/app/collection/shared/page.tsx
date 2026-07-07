"use client";

import { PageLayout } from "@/components/common";
import {
  CollectionFiltersPanel,
  CollectionItemsView,
  CollectionStatsBar,
  IdolDetailModal,
} from "@/components/features";
import { Button } from "@/components/ui";
import { filterCollectionItems, getCollectionCounts } from "@/lib/collection-utils";
import { Idol } from "@/data/idols";
import { CollectionFilters, CollectionItem, CollectionShareData } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SharedCollectionContent() {
  const searchParams = useSearchParams();
  const [sharedData, setSharedData] = useState<CollectionShareData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<CollectionFilters>({
    rarity: "all",
    group: "all",
    search: "",
  });

  const [selectedIdol, setSelectedIdol] = useState<Idol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      const encodedData = searchParams.get("data");

      if (!encodedData) {
        setError("No collection data found");
        setIsLoading(false);
        return;
      }

      const decodedData = JSON.parse(atob(decodeURIComponent(encodedData)));

      if (
        !decodedData.collection ||
        !decodedData.userId ||
        !decodedData.sharedAt
      ) {
        setError("Invalid collection data");
        setIsLoading(false);
        return;
      }

      if (decodedData.expiresAt) {
        const expiryDate = new Date(decodedData.expiresAt);
        if (expiryDate < new Date()) {
          setError("This shared collection has expired");
          setIsLoading(false);
          return;
        }
      }

      setSharedData(decodedData);
    } catch (err) {
      console.error("Error parsing shared data:", err);
      setError("Could not load the shared collection");
    }

    setIsLoading(false);
  }, [searchParams]);

  const openIdolDetails = (item: CollectionItem) => {
    setSelectedIdol(item.idol);
    setIsModalOpen(true);
  };

  const formattedSharedDate = sharedData?.sharedAt
    ? new Date(sharedData.sharedAt).toLocaleDateString()
    : "";

  const subtitle = sharedData
    ? `Shared by User ${sharedData.userId.substring(0, 8)}... on ${formattedSharedDate}`
    : "Browse a friend's idol collection.";

  const filteredItems = sharedData
    ? filterCollectionItems(sharedData.collection.items, filters)
    : [];
  const { totalCards, uniqueCards } = sharedData
    ? getCollectionCounts(sharedData.collection.items)
    : { totalCards: 0, uniqueCards: 0 };

  return (
    <PageLayout
      title="Shared Collection"
      subtitle={subtitle}
      mainClassName="max-w-7xl"
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-64 w-full" role="status" aria-label="Loading shared collection">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-retro-brown" />
        </div>
      ) : error ? (
        <div className="retro-panel bg-retro-coral text-white p-6 max-w-md mx-auto text-center">
          <p className="text-lg font-bungee mb-2">Error</p>
          <p className="text-sm">{error}</p>
          <Link href="/collection" className="block mt-4">
            <Button variant="retro" size="sm">
              Go to My Collection
            </Button>
          </Link>
        </div>
      ) : sharedData ? (
        <>
          <CollectionStatsBar
            totalCards={totalCards}
            uniqueCards={uniqueCards}
            actions={
              <Link href="/collection" className="w-full sm:w-auto">
                <Button variant="retro-teal" size="sm" className="w-full sm:w-auto">
                  My Collection
                </Button>
              </Link>
            }
          />

          <CollectionFiltersPanel
            filters={filters}
            onFiltersChange={setFilters}
          />

          <CollectionItemsView
            items={filteredItems}
            title={
              filteredItems.length > 0
                ? `Shared Cards (${filteredItems.length})`
                : "No cards match your filters"
            }
            emptyTitle="No cards match your filters."
            emptyDescription="Try adjusting your filters!"
            onViewProfile={openIdolDetails}
          />
        </>
      ) : null}

      <IdolDetailModal
        idol={selectedIdol}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageLayout>
  );
}

export default function SharedCollectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-retro-brown" />
        </div>
      }
    >
      <SharedCollectionContent />
    </Suspense>
  );
}