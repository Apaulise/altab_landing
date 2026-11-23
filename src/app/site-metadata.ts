const configuredUrl = process.env.SITE_URL?.trim();
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const productionUrl = configuredUrl || (vercelDomain ? `https://${vercelDomain}` : undefined);

export const siteUrl = productionUrl ? new URL(productionUrl).origin : undefined;
export const siteTitle = "ALTAB | Inteligencia artificial, automatización y software a medida";
export const siteDescription =
  "ALTAB detecta oportunidades de mejora en tu empresa y desarrolla soluciones de inteligencia artificial, automatización y software a medida.";
