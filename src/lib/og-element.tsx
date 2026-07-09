import { eventConfig } from "@/config/event.config";

export const ogSize = { width: 1200, height: 630 };

export function OgElement() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#060b14",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, rgba(11,95,217,0.35), transparent 55%), radial-gradient(circle at 85% 85%, rgba(20,122,99,0.3), transparent 55%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 28,
          fontWeight: 700,
          color: "#35c7a2",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            backgroundColor: "#35c7a2",
            display: "flex",
          }}
        />
        Congreso internacional · {eventConfig.dateRange.label}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 72,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.05,
          maxWidth: 900,
        }}
      >
        {eventConfig.name} {eventConfig.edition}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 32,
          color: "#93a6ba",
          maxWidth: 820,
        }}
      >
        {eventConfig.tagline}
      </div>
    </div>
  );
}
