// Base document frame: AppShell owns the top navigation and page landmarks,
// Layout constrains the content column and footer. Default Astryx styling
// only — no custom CSS.
//
// Navigation is a shallow, stable TopNav (Work / About), not a
// sidebar: the frame the example portfolios use, and the case Astryx's
// layout guidance gives for TopNav. The content column is wide (1200) so
// project media can run at the scale those examples use; prose sections
// cap their own width through grid columns inside the pages.
//
// The page is server-rendered to static HTML, then hydrated in the browser
// (see src/client.jsx) so AppShell's responsive behavior — the compact
// mobile nav bar below the md breakpoint — works. Interactivity is stock
// Astryx components, plus the nav theme toggle, whose only behaviour is
// flipping html[data-theme] (see ThemeModeToggle in components.jsx).
//
// About is the one page with a page-frame panel: its identity rail
// (layout A) lives here, in the Layout start slot, because a page's own
// content is rendered to a static string and cannot own a frame slot.
// Below 900px the rail is not a panel at all — it stacks above the main
// column, unstuck — which is the mobile behaviour the research called
// for. The breakpoint hook runs on every page so hook order stays
// stable; it is the same SSR-safe hook AppShell uses.
import { AppShell } from "@astryxdesign/core/AppShell";
import { Layout, LayoutPanel, VStack } from "@astryxdesign/core/Layout";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import {
  SiteTopNav,
  SiteFooter,
  RawHtml,
  IdentityRail,
} from "../components.jsx";

// The fields the client needs to re-render the identical tree during
// hydration. Collection items are sanitized because 11ty's full objects are
// not JSON-serializable.
function sanitizeProjects(projects) {
  return (projects ?? []).map((p) => ({
    url: p.url,
    page: { url: p.page?.url ?? p.url },
    data: {
      title: p.data?.title,
      highlight: p.data?.highlight,
      problem: p.data?.problem,
      solution: p.data?.solution,
      prototype: p.data?.prototype,
      prototypeUrl: p.data?.prototypeUrl,
      outcome: p.data?.outcome,
      process: p.data?.process,
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
  const isNarrow = useMediaQuery("(width < 900px)");
  const isRailPage = d.page.url === "/about/";
  const rail = isRailPage ? (
    <IdentityRail
      site={d.site}
      pathPrefix={d.pathPrefix}
      compact={isNarrow}
      sticky={!isNarrow}
    />
  ) : null;
  return (
    <AppShell
      height="auto"
      variant="section"
      topNav={
        <SiteTopNav
          site={d.site}
          pathPrefix={d.pathPrefix}
          pageUrl={d.page.url}
        />
      }
    >
      <Layout
        contentWidth={1200}
        footer={<SiteFooter site={d.site} year={d.year} />}
        start={
          isRailPage && !isNarrow ? (
            <LayoutPanel width={360} hasDivider isScrollable={false}>
              {rail}
            </LayoutPanel>
          ) : undefined
        }
      >
        {isRailPage && isNarrow ? (
          <VStack gap={8}>
            {rail}
            <RawHtml html={d.content} />
          </VStack>
        ) : (
          <RawHtml html={d.content} />
        )}
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
        {/* Re-apply a stored light/dark choice before first paint so a
            dark-mode visit never flashes light. Runs before hydration;
            the nav toggle in components.jsx takes over from here. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('portfolio-site-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}",
          }}
        />
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
