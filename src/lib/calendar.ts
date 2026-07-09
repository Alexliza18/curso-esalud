import { eventConfig } from "@/config/event.config";
import { siteConfig } from "@/config/site.config";

function toIcsDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

const EVENT_TITLE = `${eventConfig.name} ${eventConfig.edition}`;
const EVENT_LOCATION = `${eventConfig.modality.note} — Plataforma ${eventConfig.modality.platform}`;

export function buildGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${toIcsDate(eventConfig.dateRange.start)}/${toIcsDate(eventConfig.dateRange.end)}`,
    details: eventConfig.description,
    location: EVENT_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//" + eventConfig.name + "//ES",
    "BEGIN:VEVENT",
    `UID:${eventConfig.slug}-${eventConfig.edition}@${new URL(siteConfig.url).hostname}`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(eventConfig.dateRange.start)}`,
    `DTEND:${toIcsDate(eventConfig.dateRange.end)}`,
    `SUMMARY:${EVENT_TITLE}`,
    `DESCRIPTION:${eventConfig.description}`,
    `LOCATION:${EVENT_LOCATION}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcsFile(): void {
  const blob = new Blob([buildIcsContent()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${eventConfig.slug}-${eventConfig.edition}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
