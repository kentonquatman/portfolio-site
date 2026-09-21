// Shared Astryx-based building blocks for the portfolio.
// Default Astryx styling only — no custom CSS, no overrides.
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";

const NAV_ITEMS = [
  { label: "Home", slug: "" },
  { label: "Work", slug: "work/" },
  { label: "About", slug: "about/" },
  { label: "Contact", slug: "contact/" },
];

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
        return (
          <TopNavItem
            key={href}
            label={item.label}
            href={href}
            isSelected={pageUrl === href}
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

export function ProjectCard({ project }) {
  const { title, summary, role, timeline } = project.data;
  // project.url already includes the configured path prefix.
  return (
    <ClickableCard label={title} href={project.url}>
      <VStack gap={2}>
        <Heading level={3}>{title}</Heading>
        <Text type="supporting">{summary}</Text>
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
