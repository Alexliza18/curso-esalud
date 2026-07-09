"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/shared/section-heading";
import { GallerySkeleton } from "./gallery-skeleton";

const Gallery = dynamic(() => import("./gallery").then((mod) => mod.Gallery), {
  ssr: false,
  loading: () => (
    <section id="galeria" className="py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading eyebrow="Galería" title="Edición 2025 en imágenes" />
        <GallerySkeleton />
      </div>
    </section>
  ),
});

export function GalleryLazy() {
  return <Gallery />;
}
