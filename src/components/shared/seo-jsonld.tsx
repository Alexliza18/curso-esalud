import { eventConfig } from "@/config/event.config";
import { siteConfig } from "@/config/site.config";
import { TICKETS } from "@/domain/entities/ticket";

export function EventJsonLd() {
  const prices = Object.values(TICKETS).map((ticket) => ticket.price);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${eventConfig.name} ${eventConfig.edition} — ${eventConfig.officialName}`,
    description: eventConfig.description,
    startDate: eventConfig.dateRange.start,
    endDate: eventConfig.dateRange.end,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: `${siteConfig.url}/registro`,
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.organizer.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${siteConfig.url}/registro`,
      priceCurrency: "PEN",
      lowPrice: String(Math.min(...prices)),
      highPrice: String(Math.max(...prices)),
      availability: eventConfig.registrationOpen
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organizer.name,
    url: siteConfig.url,
    email: siteConfig.organizer.email,
    sameAs: [eventConfig.social.linkedin, eventConfig.social.instagram, eventConfig.social.youtube].filter(
      (url): url is string => Boolean(url && url !== "#")
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FaqJsonLdItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqJsonLdItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
