import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/content";

export function Faq() {
  return (
    <section id="faq" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto w-[min(760px,92vw)]">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Todo lo que necesitas saber"
          align="center"
        />

        <Reveal>
          <Accordion className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`item-${i}`}
                className="rounded-2xl border border-border/60 bg-background px-6"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[64ch] text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
