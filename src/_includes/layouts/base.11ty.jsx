// Base document frame: AppShell owns the top navigation and page landmarks,
// Layout constrains the content column and footer. Default Astryx styling
// only — no custom CSS.
import { AppShell } from "@astryxdesign/core/AppShell";
import { Layout } from "@astryxdesign/core/Layout";
import { SiteTopNav, SiteFooter, RawHtml } from "../components.jsx";

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
        <AppShell
          height="auto"
          topNav={
            <SiteTopNav
              site={site}
              pathPrefix={pathPrefix}
              pageUrl={page.url}
            />
          }
        >
          <Layout
            contentWidth={960}
            footer={<SiteFooter site={site} year={year} />}
          >
            <RawHtml html={content} />
          </Layout>
        </AppShell>
      </body>
    </html>
  );
}
