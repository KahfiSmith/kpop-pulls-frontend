"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SiteHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SiteHeader({ title, subtitle }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCollection = pathname.startsWith("/collection") && !pathname.includes("/shared");

  return (
    <header className="w-full max-w-5xl mx-auto px-2 py-4 sm:py-6 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-retro-teal mb-2">
        KPop Pulls
      </p>
      <h1 className="text-xl sm:text-2xl md:text-3xl text-retro-brown font-bungee leading-tight px-1">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-retro-navy text-sm sm:text-base max-w-lg mx-auto px-2">
          {subtitle}
        </p>
      )}

      <nav className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3" aria-label="Main navigation">
        <Link href="/" aria-current={isHome ? "page" : undefined}>
          <Button
            data-cy="home-button"
            variant={isHome ? "retro" : "retro-sage"}
            size="sm"
            className={isHome ? "ring-2 ring-retro-brown ring-offset-2 ring-offset-retro-cream" : ""}
          >
            Home
          </Button>
        </Link>
        <Link href="/collection" aria-current={isCollection ? "page" : undefined}>
          <Button
            data-cy="my-collection-button"
            variant={isCollection ? "retro-teal" : "retro-sage"}
            size="sm"
            className={isCollection ? "ring-2 ring-retro-brown ring-offset-2 ring-offset-retro-cream" : ""}
          >
            My Collection
          </Button>
        </Link>
      </nav>
    </header>
  );
}