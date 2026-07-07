import PageLayout from '@/components/common/PageLayout';

interface CollectionPageSkeletonProps {
  title: string;
  subtitle: string;
}

export default function CollectionPageSkeleton({
  title,
  subtitle,
}: CollectionPageSkeletonProps) {
  return (
    <PageLayout title={title} subtitle={subtitle} mainClassName="max-w-7xl">
      <div className="w-full space-y-6 animate-pulse">
        <div className="retro-panel h-24" />
        <div className="retro-panel h-40" />
        <div className="grid collection-grid w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="collection-grid-item">
              <div className="retro-panel aspect-[3/4]" />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}