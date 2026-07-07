import { cn } from "@/lib/utils";

interface CollectionGridProps {
  children: React.ReactNode;
  className?: string;
}

export function CollectionGrid({ children, className }: CollectionGridProps) {
  return (
    <div
      data-cy="collection-grid"
      className={cn("collection-grid w-full", className)}
    >
      {children}
    </div>
  );
}

interface CollectionGridItemProps {
  children: React.ReactNode;
  "data-cy"?: string;
}

export function CollectionGridItem({
  children,
  "data-cy": dataCy,
}: CollectionGridItemProps) {
  return (
    <div data-cy={dataCy} className="collection-grid-item min-w-0 w-full">
      {children}
    </div>
  );
}