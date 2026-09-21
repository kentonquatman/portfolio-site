// Shared Astryx-based building blocks for the portfolio.
// Default Astryx styling only — no custom CSS, no overrides.
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";

export function SiteHeader({ site, pathPrefix }) {
  const nav = [
    { label: "Home", href: `${pathPrefix}` },
    { label: "Work", href: `${pathPrefix}work/` },
    { label: "About", href: `${pathPrefix}about/` },
    { label: "Contact", href: `${pathPrefix}contact/` },
  ];
  return (
    <HStack hAlign="between" vAlign="center" paddingBlock={3}>
      <Link href={`${pathPrefix}`}>
        <Text weight="semibold">{site.name}</Text>
      </Link>
      <HStack as="nav" gap={4} vAlign="center" aria-label="Primary">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </HStack>
    </HStack>
  );
}

export function SiteFooter({ site, pathPrefix, year }) {
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
