import { NextResponse } from "next/server";
import { SPREADSHEET_CSV_URL, fallbackEvents, parseCsvToEvents } from "@/lib/events";

export async function GET() {
  try {
    const res = await fetch(SPREADSHEET_CSV_URL, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ events: fallbackEvents, source: "fallback" });
    }

    const csvText = await res.text();
    const events = parseCsvToEvents(csvText);

    return NextResponse.json({ events, source: "live_sheets" });
  } catch {
    return NextResponse.json({ events: fallbackEvents, source: "fallback" });
  }
}
