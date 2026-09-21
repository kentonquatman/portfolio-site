// Shared Astryx-based building blocks for the portfolio.
// Default Astryx styling only — no custom CSS, no overrides.
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";
import { Icon } from "@astryxdesign/core/Icon";
import {
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  SwatchIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { label: "Home", slug: "" },
  { label: "Work", slug: "work/" },
  { label: "About", slug: "about/" },
  { label: "Contact", slug: "contact/" },
];

// Visual anchor per project, keyed by the project file slug.
const PROJECT_ICONS = {
  "banking-app": DevicePhoneMobileIcon,
  "checkout-flow": ShoppingBagIcon,
  "design-system": SwatchIcon,
};

// Top navigation rendered in the AppShell topNav slot. AppShell generates
// the mobile nav drawer from this automatically below the md breakpoint.
export function SiteTopNav({ site, pathPrefix, pageUrl }) {
  return (
    <TopNav
      label="Primary"
      heading={
        <TopNavHeading heading={site.name} headingHref={pathPrefix} />
      }
    >
      {NAV_ITEMS.map((item) => {
        const href = `${pathPrefix}${item.slug}`;
        // page.url may or may not include the path prefix depending on the
        // 11ty version, so match against both forms.
        const isSelected = pageUrl === href || pageUrl === `/${item.slug}`;
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
    <VStack gap={3} paddingBlock={4}>
      <Divider />
      <HStack hAlign="between" vAlign="center">
        <Text type="supporting">
          © {year} {site.name} · {site.location}
        </Text>
        <HStack gap={3} vAlign="center">
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

export function ProjectCard({ project, pathPrefix }) {
  const { title, summary, role, timeline } = project.data;
  // Collection item URLs never include the path prefix, so prepend it the
  // same way the nav links do.
  const href = `${pathPrefix}${project.url.replace(/^\//, "")}`;
  // project.url looks like /projects/banking-app/ — take the last segment.
  const slug = project.url.split("/").filter(Boolean).pop();
  const ProjectIcon = PROJECT_ICONS[slug] || Squares2X2Icon;
  return (
    <ClickableCard label={title} href={href} elevation="low">
      <VStack gap={3}>
        <Icon icon={ProjectIcon} size="lg" color="secondary" />
        <VStack gap={1}>
          <Heading level={3}>{title}</Heading>
          <Text type="supporting">{summary}</Text>
        </VStack>
        <Text type="supporting" color="secondary">
          {role} · {timeline}
        </Text>
      </VStack>
    </ClickableCard>
  );
}

// Injects pre-rendered HTML (e.g. Markdown content) into the component tree.
export function RawHtml({ html }) {
  return <VStack dangerouslySetInnerHTML={{ __html: html }} />;
}
