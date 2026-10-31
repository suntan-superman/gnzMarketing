export const SITE_ORIGIN = "https://gnzmarketingllc.com";
export const SITE_NAME = "GNZ Marketing Group";
export const SOCIAL_IMAGE_PATH = "/images/gnz-hero.png";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

export function createPageMetadata({ title, description, path = "/", image = SOCIAL_IMAGE_PATH, noIndex = false }) {
  const canonical = absoluteUrl(path);
  const metadata = {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      images: image ? [{ url: absoluteUrl(image), alt: `${SITE_NAME} website` }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [absoluteUrl(image)] : [],
    },
  };
  if (noIndex) metadata.robots = { index: false, follow: false };
  return metadata;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    email: "contact@gnzmarketingllc.com",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_ORIGIN,
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}

export function articleJsonLd({ title, description, path, publishedAt, updatedAt, image = SOCIAL_IMAGE_PATH }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    image: image ? [absoluteUrl(image)] : undefined,
    datePublished: publishedAt || undefined,
    dateModified: updatedAt || publishedAt || undefined,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
  };
}
