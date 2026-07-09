import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { galleryItems } from "@/data/content";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section id="galeria" className="py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading eyebrow="Galería" title="Edición 2025 en imágenes" />

        <Reveal className="grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[180px] md:grid-cols-4">
          {galleryItems.map((item, i) => (
            <figure
              key={item.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                i === 0 && "col-span-2 row-span-2",
                i === 3 && "col-span-2"
              )}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                loading={i === 0 ? undefined : "lazy"}
                priority={i === 0}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-xs text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
