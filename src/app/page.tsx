"use client";

import { PageLayout } from "@/components/common";
import { GachaPull } from "@/components/features";
import dynamic from "next/dynamic";

const ClientOnlyGachaPull = dynamic(() => Promise.resolve(GachaPull), {
  ssr: false,
});

export default function Home() {
  return (
    <PageLayout
      title="KPop Idol Gacha"
      subtitle="Pull cards, build your collection, and chase your ultimate bias."
    >
      <section className="w-full">
        <ClientOnlyGachaPull />
      </section>
    </PageLayout>
  );
}