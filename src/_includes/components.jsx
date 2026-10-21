// Shared Astryx-based building blocks for the portfolio.
// Default Astryx styling only — no custom CSS, no overrides.
//
// Layout system (redesigned 2026-10-21, following the example portfolios
// linked from "Building an Excellent Online Portfolio"): a shallow top
// navigation instead of a sidebar, one vertical scroll of full-width
// project features instead of a card grid, a large media panel per
// project instead of an icon tile, and type scale + whitespace instead
// of containers for hierarchy.
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Card } from "@astryxdesign/core/Card";
import { Token } from "@astryxdesign/core/Token";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Grid } from "@astryxdesign/core/Grid";
import { Divider } from "@astryxdesign/core/Divider";
import { Icon } from "@astryxdesign/core/Icon";
import {
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  SwatchIcon,
  Squares2X2Icon,
  PlayCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { label: "Work", slug: "work/", match: ["work/", "projects/"] },
  { label: "About", slug: "about/", match: ["about/"] },
  { label: "Contact", slug: "contact/", match: ["contact/"] },
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

// Top navigation rendered in the AppShell topNav slot. The nav is shallow
// and stable (Work / About / Contact), which is the case Astryx's layout
// guidance gives for TopNav over SideNav. AppShell turns it into a compact
// bar with a nav toggle below the mobile breakpoint.
export function SiteTopNav({ site, pathPrefix, pageUrl }) {
  return (
    <TopNav
      label="Main"
      heading={
        <TopNavHeading
          heading={site.name}
          subheading={site.role}
          headingHref={pathPrefix}
        />
      }
    >
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
    </TopNav>
  );
}

export function SiteFooter({ site, year }) {
  return (
    <VStack gap={4} paddingBlock={6} paddingInline={4}>
      <Divider />
      <VStack gap={2}>
        <Heading level={2} type="display-3">
          {site.name}
        </Heading>
        <Text color="secondary">
          {site.role} · {site.location}
        </Text>
      </VStack>
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

// Large media panel for a project: a 16:9 stock-theme colour panel that
// stands in for the project's hero image or prototype video. Every
// example portfolio leads each project with a visual at this scale; the
// panel is where the real media goes when it exists. Until then it carries
// the project's icon, title, and a caption naming the media it replaces.
export function ProjectMedia({ slug, title, caption }) {
  const visual = PROJECT_VISUALS[slug] || {
    icon: Squares2X2Icon,
    variant: "gray",
  };
  const VisualIcon = visual.icon;
  return (
    <AspectRatio ratio={16 / 9}>
      <Card variant={visual.variant} width="100%" height="100%" padding={8}>
        <VStack gap={4}>
          <Icon icon={VisualIcon} size="lg" color="inherit" />
          <Heading level={3} type="display-3" textWrap="balance">
            {title}
          </Heading>
          <Text color="secondary">{caption}</Text>
        </VStack>
      </Card>
    </AspectRatio>
  );
}

// One project, full width — the unit the Home and Work pages are built
// from. Media first, then the problem and the outcome side by side, then
// the link. No card, no tile grid: this is the Aaron James / Laura Javier
// pattern of one large feature per project in a single scroll.
export function ProjectFeature({ project, pathPrefix }) {
  const { title, highlight, problem, outcome, prototype, role, timeline } =
    project.data;
  const href = projectHref(project, pathPrefix);
  const slug = projectSlug(project);
  return (
    <VStack gap={5}>
      <Link href={href} color="inherit" display="block">
        <ProjectMedia slug={slug} title={title} caption={prototype} />
      </Link>
      <Grid columns={{ minWidth: 320, repeat: "fit" }} gap={6}>
        <VStack gap={3}>
          {highlight && <Token label={highlight} />}
          <Heading level={3} type="display-3" textWrap="balance">
            <Link href={href} color="inherit">
              {title}
            </Link>
          </Heading>
          <Text type="supporting" color="secondary">
            {role} · {timeline}
          </Text>
        </VStack>
        <VStack gap={3}>
          <Text type="large">{problem}</Text>
          {outcome && <Text color="secondary">Outcome: {outcome}</Text>}
          <HStack>
            <Link href={href}>
              View case study{" "}
              <Icon icon={ArrowRightIcon} size="sm" color="inherit" />
            </Link>
          </HStack>
        </VStack>
      </Grid>
    </VStack>
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
