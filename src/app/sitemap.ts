import type { MetadataRoute } from "next";
import { siteUrl } from "./site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl ? [{ url: new URL("/", siteUrl).href }] : [];
}
