/**
 * Return the public application URL without adding a second protocol.
 * NEXTAUTH_URL should always be a complete URL; VERCEL_URL is normally a host.
 */
export function getAppUrl() {
  const configuredUrl = process.env.NEXTAUTH_URL || process.env.APP_URL;
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    const protocol = vercelUrl.startsWith("localhost") ? "http" : "https";
    const host = vercelUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `${protocol}://${host}`;
  }

  return "http://localhost:3000";
}
