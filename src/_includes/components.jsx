// Shared Astryx-based building blocks for the portfolio.
// Default Astryx styling only — no custom CSS, no overrides.
//
// Layout system (redesigned 2026-10-21, following the example portfolios
// linked from "Building an Excellent Online Portfolio"): a shallow top
// navigation instead of a sidebar, one vertical scroll of full-width
// project features instead of a card grid, a large media panel per
// project instead of an icon tile, and type scale + whitespace instead
// of containers for hierarchy.
import { useEffect, useState } from "react";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";
import { Icon } from "@astryxdesign/core/Icon";
import { IconButton } from "@astryxdesign/core/IconButton";
import {
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  SwatchIcon,
  Squares2X2Icon,
  PlayCircleIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { label: "Work", slug: "work/", match: ["work/", "projects/"] },
  { label: "About", slug: "about/", match: ["about/"] },
];

// Visual identity per project, keyed by the project file slug: an icon
// and a stock Astryx colour variant for its media panel. The variants are
// theme colours, not custom CSS.
const PROJECT_VISUALS = {
  "banking-app": { icon: DevicePhoneMobileIcon, variant: "blue" },
  "checkout-flow": { icon: ShoppingBagIcon, variant: "orange" },
  "design-system": { icon: SwatchIcon, variant: "purple" },
};

export function projectSlug(project) {
  // project.url looks like /projects/banking-app/ — take the last segment.
  return project.url.split("/").filter(Boolean).pop();
}

export function projectHref(project, pathPrefix) {
  // Collection item URLs never include the path prefix, so prepend it.
  return `${pathPrefix}${project.url.replace(/^\//, "")}`;
}

export function assetUrl(src, pathPrefix) {
  // Absolute URLs pass through untouched; site-relative asset paths get
  // the deploy prefix, the same way projectHref does for page URLs.
  if (/^(https?:)?\/\//.test(src)) return src;
  return `${pathPrefix}${src.replace(/^\//, "")}`;
}

// Light/dark switcher for the navigation. Astryx's stock neutral theme
// resolves its colours with light-dark(), and its reset maps
// html[data-theme="light"|"dark"] to color-scheme, so flipping that
// attribute is the whole switch — no custom CSS, no theme object swap.
// The choice is stored in localStorage and re-applied before first paint
// by the inline script in the base layout, so it survives page navigation.
// State starts at "light" to match the server render exactly, then the
// effect syncs it to the applied theme (or the OS preference when no
// explicit choice exists yet) after hydration — no hydration mismatch.
const THEME_STORAGE_KEY = "portfolio-site-theme";

export function ThemeModeToggle() {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "light" || applied === "dark") {
      setMode(applied);
    } else if (
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setMode("dark");
    }
  }, []);
  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing etc.: the switch still works for this page.
    }
    setMode(next);
  };
  const label =
    mode === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <IconButton
      label={label}
      tooltip={label}
      variant="ghost"
      icon={<Icon icon={mode === "dark" ? SunIcon : MoonIcon} />}
      onClick={toggle}
    />
  );
}

// Top navigation rendered in the AppShell topNav slot. The nav is shallow
// and stable (Work / About), which is the case Astryx's layout
// guidance gives for TopNav over SideNav. The heading sits at the far
// left; the items live in TopNav's endContent slot, which TopNav pins to
// the far right (marginInlineStart: auto), with the theme switcher after
// them. One consequence of the endContent slot: below the mobile
// breakpoint AppShell's drawer is fed from startContent, so on small
// screens the items stay visible in the compact mobile bar instead of
// collapsing behind a hamburger.
export function SiteTopNav({ site, pathPrefix, pageUrl }) {
  return (
    <TopNav
      label="Main"
      heading={
        <TopNavHeading heading={site.name} headingHref={pathPrefix} />
      }
      endContent={
        <HStack gap={2} vAlign="center">
          {NAV_ITEMS.map((item) => {
            const href = `${pathPrefix}${item.slug}`;
            const isSelected = item.match.some(
              (m) => pageUrl === `/${m}` || pageUrl === `${pathPrefix}${m}`
            );
            return (
              <TopNavItem
                key={href}
                label={item.label}
                href={href}
                isSelected={isSelected}
              />
            );
          })}
          <ThemeModeToggle />
        </HStack>
      }
    />
  );
}

export function SiteFooter({ site, year }) {
  return (
    <VStack gap={4} paddingBlock={6} paddingInline={4}>
      <Divider />
      <HStack hAlign="between" vAlign="center">
        <Text type="supporting">
          © {year} {site.name}
        </Text>
        <HStack gap={4} vAlign="center">
          <Link href={`mailto:${site.email}`}>{site.email}</Link>
          {site.social.map((link) => (
            <Link key={link.url} href={link.url} target="_blank" rel="noopener">
              {link.label}
            </Link>
          ))}
        </HStack>
      </HStack>
    </VStack>
  );
}

// Identity rail for the About page (layout A, chosen 2026-10-27): the
// headshot, name, role, location, and contact links — contact lives
// here, not in a separate section below the resume. Rendered by the
// base layout, not by the About page itself, because the rail is a
// page-frame panel (see base.11ty.jsx): on desktop it sits in a Layout
// end panel on the right and sticks below the measured TopNav height —
// Astryx's own header-height variable, the same one its sticky sideNav
// uses — with no divider between it and the main column. On narrow
// viewports the base layout stacks it above the main column instead,
// where it is not sticky. Headshot: site.headshot in src/_data/site.js
// points at a placeholder image until a real photo replaces it.


export function IdentityRail({ site, pathPrefix, compact = false, sticky = false }) {
  const content = (
    <VStack gap={8}>
      <VStack width={compact ? 240 : "100%"}>
        <AspectRatio ratio={1} fit="cover">
          {site.headshot ? (
            <img
              src={assetUrl(site.headshot, pathPrefix)}
              alt={`Headshot of ${site.name}`}
              width="100%"
              height="100%"
            />
          ) : (
            <Card variant="gray" width="100%" height="100%" padding={8}>
              <VStack gap={3}>
                <Icon icon={UserCircleIcon} size="lg" color="inherit" />
                <Text color="secondary">Headshot</Text>
                <Text type="supporting" color="secondary">
                  Drop a portrait in src/images/ and set site.headshot in
                  src/_data/site.js.
                </Text>
              </VStack>
            </Card>
          )}
        </AspectRatio>
      </VStack>
      <VStack gap={4}>
        <Heading level={1} type="display-2" textWrap="balance">
          {site.name}
        </Heading>
        <Text type="large" color="secondary">
          {site.role}
        </Text>
        <Text color="secondary">{site.location}</Text>
      </VStack>
      <VStack gap={4}>
        <Link href={`mailto:${site.email}`}>{site.email}</Link>
        {site.social.map((link) => (
          <Link key={link.url} href={link.url} target="_blank" rel="noopener">
            {link.label}
          </Link>
        ))}
      </VStack>
    </VStack>
  );
  if (!sticky) {
    return content;
  }
  return (
    <VStack
      style={{
        position: "sticky",
        top: "var(--_app-shell-header-height, 0px)",
      }}
    >
      {content}
    </VStack>
  );
}

// Large media panel for a project: a 16:9 frame that shows the project's
// hero image when one exists, and a stock-theme colour placeholder panel
// until then. Every example portfolio leads each project with a visual at
// this scale; the panel is where the real media goes when it exists.
// Until then it carries the project's icon, title, and a caption naming
// the media it replaces.
//
// Images: put the file in src/images/ (copied to /images/ at build) and
// set `image: images/<slug>.png` in the project front matter, with
// `imageAlt` describing it for screen readers. Export at 16:9 —
// 2400x1350 is 2x the 1200px content width. The frame's fit="cover"
// crops off-ratio sources instead of distorting them; no custom CSS.
export function ProjectMedia({
  slug,
  title,
  caption,
  image,
  imageAlt,
  pathPrefix,
  wordless = false,
}) {
  if (image) {
    return (
      <AspectRatio ratio={16 / 9} fit="cover">
        <img
          src={assetUrl(image, pathPrefix)}
          alt={imageAlt || title}
          width="100%"
          height="100%"
        />
      </AspectRatio>
    );
  }
  const visual = PROJECT_VISUALS[slug] || {
    icon: Squares2X2Icon,
    variant: "gray",
  };
  const VisualIcon = visual.icon;
  return (
    <AspectRatio ratio={16 / 9}>
      <Card variant={visual.variant} width="100%" height="100%" padding={8}>
        {wordless ? (
          // Wordless panel for work cards: the icon alone, centred, so
          // the title appears only once — as the heading below the
          // panel. The titled panel below is kept for case-study pages,
          // where the panel is the prototype media itself.
          <VStack height="100%" hAlign="center" vAlign="center">
            <Icon icon={VisualIcon} size="lg" color="inherit" />
          </VStack>
        ) : (
          <VStack gap={4}>
            <Icon icon={VisualIcon} size="lg" color="inherit" />
            <Heading level={3} type="display-3" textWrap="balance">
              {title}
            </Heading>
            <Text color="secondary">{caption}</Text>
          </VStack>
        )}
      </Card>
    </AspectRatio>
  );
}

// One project, full width — the unit the Home and Work pages are built
// from, redesigned 2026-10-27 from the work-card research (stack
// version, chosen by Kenton): image-only panel, then a single column
// — title once as a heading, one muted discipline line, one
// description sentence, and "View case study →" directly underneath.
// No second text column, no tag + role + date stack, no problem or
// outcome paragraphs on the card: role, timeline, problem, and outcome
// live on the case-study page itself. No tile grid: this is the
// full-width stack the best 3-project portfolios use on home and work.
//
// The whole card is one link. That has two consequences, both
// deliberate:
// - The title is a plain heading, not a link inside the card link:
//   nested links are invalid HTML and browsers split the outer link
//   around them. The heading keeps its h3 semantics inside the card
//   link, and "View case study →" is accent-coloured text, not a
//   second link, for the same reason.
// - The link is block-level (display="block" on the link and its text
//   wrapper). AspectRatio collapses inside a shrink-to-fit parent —
//   the bug that hid the panel in the first visual check — and an
//   inline link is shrink-to-fit; a block link fills the column, so
//   the panel keeps its full-width 16:9 size. This is structural
//   sizing, the same kind of inline style the sticky rail uses, not
//   visual styling: all colours and type still come from Astryx.
// Text spacing is generous on purpose (24px between blocks, 16px
// between title and discipline line), after the previous 16px/8px
// stack read as cramped against the large panels.
export function ProjectFeature({ project, pathPrefix }) {
  const { title, highlight, solution, image, imageAlt } = project.data;
  const href = projectHref(project, pathPrefix);
  const slug = projectSlug(project);
  // The description is the existing solution sentence, with its
  // "Placeholder solution:" label stripped and the first letter
  // capitalised so the card reads as a sentence, not a placeholder
  // note. No new claims are added; when the solution is replaced
  // with real text, keep it to one sentence.
  const rawDescription = (solution || "").replace(
    /^Placeholder solution:\s*/,
    "",
  );
  const description = rawDescription
    ? rawDescription.charAt(0).toUpperCase() + rawDescription.slice(1)
    : "";
  return (
    <Link
      href={href}
      label={title}
      color="inherit"
      display="block"
      style={{ display: "block" }}
    >
      <VStack gap={6}>
        <ProjectMedia
          slug={slug}
          title={title}
          image={image}
          imageAlt={imageAlt}
          pathPrefix={pathPrefix}
          wordless
        />
        <VStack gap={4}>
          <Heading level={3} type="display-3" textWrap="balance">
            {title}
          </Heading>
          {highlight && (
            <Text type="supporting" color="secondary">
              {highlight}
            </Text>
          )}
        </VStack>
        {description && <Text color="secondary">{description}</Text>}
        <Text color="accent">View case study →</Text>
      </VStack>
    </Link>
  );
}

// Compact horizontal row used for the "Next project" step at the end of a
// case study: a play glyph for the prototype-first idea, the problem as
// the description, and the link — not another full feature.
export function NextProject({ project, pathPrefix }) {
  const { title, problem } = project.data;
  const href = projectHref(project, pathPrefix);
  return (
    <HStack gap={4} vAlign="center">
      <Icon icon={PlayCircleIcon} size="lg" color="secondary" />
      <VStack gap={1}>
        <Heading level={3}>
          <Link href={href} color="inherit">
            {title}
          </Link>
        </Heading>
        <Text type="supporting" color="secondary">
          {problem}
        </Text>
      </VStack>
    </HStack>
  );
}

// Injects pre-rendered HTML (e.g. Markdown content) into the component tree.
export function RawHtml({ html }) {
  return <VStack dangerouslySetInnerHTML={{ __html: html }} />;
}
