import CopyrightFooter from "@/components/common/CopyrightFooter";
import SiteHeader from "@/components/common/SiteHeader";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  mainClassName?: string;
}

export default function PageLayout({
  title,
  subtitle,
  children,
  mainClassName = "",
}: PageLayoutProps) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen overflow-x-hidden px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <SiteHeader title={title} subtitle={subtitle} />

      <main
        className={cn(
          "flex flex-col items-center py-5 sm:py-8 w-full max-w-5xl mx-auto",
          mainClassName
        )}
      >
        {children}
      </main>

      <CopyrightFooter />
    </div>
  );
}