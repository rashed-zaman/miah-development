// app/components/canonical/Canonical.js
import { ROOT_URL } from "@/service/serviceConfig";

/**
 * Server-side Canonical component for Next 15
 * @param {string} path - optional, defaults to current page path
 */
export default function Canonical({ path = "" }) {
  // Construct canonical URL
  const canonicalUrl = ROOT_URL + path;

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}
