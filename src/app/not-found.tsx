import { PageLayout } from '@/components/common';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageLayout title="404" subtitle="This page wandered off stage.">
      <div className="retro-panel px-8 py-10 text-center max-w-md w-full">
        <p className="text-6xl font-bungee text-retro-yellow drop-shadow-[2px_2px_0_var(--retro-brown)] mb-4">
          404
        </p>
        <p className="text-retro-navy mb-6">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button variant="retro" size="lg">
            Return to Home
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
}