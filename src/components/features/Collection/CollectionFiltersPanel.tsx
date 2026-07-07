'use client';

import { Button, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { groups } from '@/data/groups';
import { rarities, RarityType } from '@/data/rarities';
import { CollectionFilters, CollectionSortOptions } from '@/types/collection';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface CollectionFiltersPanelProps {
  filters: CollectionFilters;
  onFiltersChange: (filters: CollectionFilters) => void;
  sortOption?: CollectionSortOptions;
  onSortChange?: (sort: CollectionSortOptions) => void;
  showSort?: boolean;
}

export function CollectionFiltersPanel({
  filters,
  onFiltersChange,
  sortOption,
  onSortChange,
  showSort = false,
}: CollectionFiltersPanelProps) {
  return (
    <div className="w-full mb-6 retro-panel p-4 sm:p-5">
      <h2 className="text-lg font-bold text-retro-brown mb-4">
        {showSort ? 'Filters & Sort' : 'Filters'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="rarity-filter" className="block text-retro-brown font-semibold text-sm mb-2">
            Rarity
          </Label>
          <Select
            data-cy="rarity-filter-select"
            value={filters.rarity ?? 'all'}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, rarity: value as RarityType | 'all' })
            }
          >
            <SelectTrigger id="rarity-filter" className="retro-input">
              <SelectValue placeholder="Select rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              {Object.values(rarities).map((rarity) => (
                <SelectItem key={rarity.id} value={rarity.id}>
                  {rarity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="group-filter" className="block text-retro-brown font-semibold text-sm mb-2">
            Group
          </Label>
          <Select
            data-cy="group-filter-select"
            value={filters.group ?? 'all'}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, group: value })
            }
          >
            <SelectTrigger id="group-filter" className="retro-input">
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.name}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="search-filter" className="block text-retro-brown font-semibold text-sm mb-2">
            Search
          </Label>
          <input
            data-cy="search-input"
            id="search-filter"
            type="text"
            value={filters.search ?? ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            placeholder="Search by name..."
            className="retro-input"
          />
        </div>
      </div>

      {showSort && sortOption && onSortChange && (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1 min-w-0">
            <Label htmlFor="sort-options" className="block text-retro-brown font-semibold text-sm mb-2">
              Sort By
            </Label>
            <Select
              data-cy="sort-field-select"
              value={sortOption.field}
              onValueChange={(value) =>
                onSortChange({
                  ...sortOption,
                  field: value as CollectionSortOptions['field'],
                })
              }
            >
              <SelectTrigger id="sort-options" className="retro-input">
                <SelectValue placeholder="Select sort field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="obtainedAt">Date Obtained</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
                <SelectItem value="group">Group</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            data-cy="sort-direction-button"
            onClick={() =>
              onSortChange({
                ...sortOption,
                direction: sortOption.direction === 'asc' ? 'desc' : 'asc',
              })
            }
            variant="retro-sage"
            size="sm"
            className="sm:mb-0.5"
          >
            {sortOption.direction === 'asc' ? (
              <ArrowUp className="size-4" />
            ) : (
              <ArrowDown className="size-4" />
            )}
            {sortOption.direction === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      )}
    </div>
  );
}