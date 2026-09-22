// Base document frame: AppShell owns the side navigation and page landmarks,
// Layout constrains the content column and footer. Default Astryx styling
// only — no custom CSS.
//
// The page is server-rendered to static HTML, then hydrated in the browser
// (see src/client.jsx) so AppShell's responsive behavior — the mobile
// navigation drawer below the md breakpoint — works. All interactivity comes
// from stock Astryx; there is no custom client JavaScript of our own.
import { AppShell } from "@astryxdesign/core/AppShell";
import { Layout } from "@astryxdesign/core/Layout";
import { SiteSideNav, SiteFooter, RawHtml } from "../components.jsx";

// The fields the client needs to re-render the identical tree during
// hydration. Collection items are sanitized because 11ty's full objects are
// not JSON-serializable.
function sanitizeProjects(projects) {
  return (projects ?? []).map((p) => ({
    url: p.url,
    page: { url: p.page?.url ?? p.url },
    data: {
      title: p.data?.title,
      summary: p.data?.summary,
      role: p.data?.role,
      timeline: p.data?.timeline,
      team: p.data?.team,
      order: p.data?.order,
    },
  }));
}

// Normalized page data shared by the server render and the client hydration
// render, so both produce the exact same tree.
function pageData(data) {
  const { site, title, content, pathPrefix, page, collections, year } = data;
  return {
    site,
    title: title ?? null,
    content: content ?? "",
    pathPrefix,
    page: { url: page?.url },
    collections: { projects: sanitizeProjects(collections?.projects) },
    year: year ?? new Date().getFullYear(),
  };
}

// The hydration root: everything inside <body>. The client re-renders this
// exact tree with the serialized page data, letting AppShell subscribe to
// the viewport breakpoint and manage the mobile drawer.
export function PageBody(data) {
  const d = pageData(data);
  return (
    <AppShell
      height="auto"
      sideNav={
        <SiteSideNav
          site={d.site}
          pathPrefix={d.pathPrefix}
          pageUrl={d.page.url}
          projects={d.collections.projects}
        />
      }
    >
      <Layout
        contentWidth={960}
        footer={<SiteFooter site={d.site} year={d.year} />}
      >
        <RawHtml html={d.content} />
      </Layout>
    </AppShell>
  );
}

export default function BaseLayout(data) {
  const d = pageData(data);
  const { site } = d;
  // Escape `<` so the JSON payload can never break out of its script tag.
  const json = JSON.stringify(d).replace(/</g, "\\u003c");
  return (
    <html lang="en" data-astryx-theme="neutral">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {d.title
            ? `${d.title} · ${site.name} — ${site.role}`
            : `${site.name} — ${site.role}`}
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
        <link rel="stylesheet" href={`${d.pathPrefix}css/reset.css`} />
        <link rel="stylesheet" href={`${d.pathPrefix}css/astryx.css`} />
        <link rel="stylesheet" href={`${d.pathPrefix}css/theme.css`} />
        <script
          id="page-data"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
        <script src={`${d.pathPrefix}js/client.js`} defer />
      </head>
      <body>
        <PageBody {...data} />
      </body>
    </html>
  );
}
