import { RarityType } from '@/data/rarities';
import { CollectionItem, CollectionFilters, CollectionSortOptions } from '@/types/collection';

const rarityOrder: Record<RarityType, number> = {
  mythical: 5,
  legendary: 4,
  epic: 3,
  rare: 2,
  common: 1,
};

export function filterCollectionItems(
  items: CollectionItem[],
  filters: CollectionFilters
): CollectionItem[] {
  return items.filter((item) => {
    if (filters.rarity && filters.rarity !== 'all' && item.idol.rarity !== filters.rarity) {
      return false;
    }

    if (filters.group && filters.group !== 'all' && item.idol.group !== filters.group) {
      return false;
    }

    if (
      filters.search &&
      !item.idol.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

export function sortCollectionItems(
  items: CollectionItem[],
  sortOption: CollectionSortOptions
): CollectionItem[] {
  return [...items].sort((a, b) => {
    switch (sortOption.field) {
      case 'obtainedAt': {
        const diff =
          new Date(a.obtainedAt).getTime() - new Date(b.obtainedAt).getTime();
        return sortOption.direction === 'desc' ? -diff : diff;
      }
      case 'rarity': {
        const diff = rarityOrder[a.idol.rarity] - rarityOrder[b.idol.rarity];
        return sortOption.direction === 'desc' ? -diff : diff;
      }
      case 'group': {
        const diff = a.idol.group.localeCompare(b.idol.group);
        return sortOption.direction === 'desc' ? -diff : diff;
      }
      case 'name': {
        const diff = a.idol.name.localeCompare(b.idol.name);
        return sortOption.direction === 'desc' ? -diff : diff;
      }
      default:
        return 0;
    }
  });
}

export function getCollectionCounts(items: CollectionItem[]) {
  return {
    totalCards: items.reduce((sum, item) => sum + item.count, 0),
    uniqueCards: items.length,
  };
}