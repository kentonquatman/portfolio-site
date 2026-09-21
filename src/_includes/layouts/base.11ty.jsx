// Base document frame. Default Astryx styling only — no custom CSS.
import { Layout } from "@astryxdesign/core/Layout";
import { SiteHeader, SiteFooter, RawHtml } from "../components.jsx";

export default function BaseLayout(data) {
  const { site, title, content, pathPrefix, page } = data;
  const year = new Date().getFullYear();
  return (
    <html lang="en" data-astryx-theme="neutral">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {title ? `${title} · ${site.name} — ${site.role}` : `${site.name} — ${site.role}`}
        </title>
        <meta name="description" content={site.tagline} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={`${pathPrefix}css/reset.css`} />
        <link rel="stylesheet" href={`${pathPrefix}css/astryx.css`} />
        <link rel="stylesheet" href={`${pathPrefix}css/theme.css`} />
      </head>
      <body>
        <Layout
          contentWidth={960}
          header={<SiteHeader site={site} pathPrefix={pathPrefix} />}
          footer={
            <SiteFooter site={site} pathPrefix={pathPrefix} year={year} />
          }
        >
          <RawHtml html={content} />
        </Layout>
      </body>
    </html>
  );
}
