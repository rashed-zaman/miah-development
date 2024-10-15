import { NextResponse } from "next/server"

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const protocol = req.headers.get("x-forwarded-proto") || "http"; // Detect if using HTTP or HTTPS

  // Redirect www to non-www
  if (host.startsWith("www.")) {
    url.host = host.replace(/^www\./, "");
    return NextResponse.redirect(url, 301);
  }

  // Redirect http to https
  if (protocol === "http") {
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  // Allow other requests to proceed as normal
  return NextResponse.next();
}
