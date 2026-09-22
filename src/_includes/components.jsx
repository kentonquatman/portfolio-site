// Shared Astryx-based building blocks for the portfolio.
// Default Astryx styling only — no custom CSS, no overrides.
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { SideNav, SideNavHeading, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { NavIcon } from "@astryxdesign/core/NavIcon";
import { Card } from "@astryxdesign/core/Card";
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
  HomeIcon,
  FolderIcon,
  UserIcon,
  EnvelopeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { label: "Home", slug: "", icon: HomeIcon },
  { label: "Work", slug: "work/", icon: FolderIcon },
  { label: "About", slug: "about/", icon: UserIcon },
  { label: "Contact", slug: "contact/", icon: EnvelopeIcon },
];

// Visual anchor per project, keyed by the project file slug.
const PROJECT_ICONS = {
  "banking-app": DevicePhoneMobileIcon,
  "checkout-flow": ShoppingBagIcon,
  "design-system": SwatchIcon,
};

// Left navigation rendered in the AppShell sideNav slot. AppShell moves the
// SideNav into a mobile drawer automatically below the md breakpoint.
export function SiteSideNav({ site, pathPrefix, pageUrl, projects }) {
  return (
    <SideNav
      header={
        <SideNavHeading
          icon={<NavIcon icon={<Icon icon={BriefcaseIcon} size="sm" color="inherit" />} />}
          heading={site.name}
          headingHref={pathPrefix}
        />
      }
    >
      <SideNavSection title="Main" isHeaderHidden>
        {NAV_ITEMS.map((item) => {
          const href = `${pathPrefix}${item.slug}`;
          // page.url may or may not include the path prefix depending on the
          // 11ty version, so match against both forms.
          const isSelected = pageUrl === href || pageUrl === `/${item.slug}`;
          return (
            <SideNavItem
              key={href}
              label={item.label}
              href={href}
              icon={item.icon}
              isSelected={isSelected}
            />
          );
        })}
      </SideNavSection>
      <SideNavSection title="Projects">
        {projects.map((project) => {
          // Collection item URLs never include the path prefix, so prepend it
          // the same way the nav links do.
          const href = `${pathPrefix}${project.url.replace(/^\//, "")}`;
          const isSelected = pageUrl === href || pageUrl === project.url;
          // project.url looks like /projects/banking-app/ — take the last segment.
          const slug = project.url.split("/").filter(Boolean).pop();
          const ProjectIcon = PROJECT_ICONS[slug] || Squares2X2Icon;
          return (
            <SideNavItem
              key={href}
              label={project.data.title}
              href={href}
              icon={ProjectIcon}
              isSelected={isSelected}
            />
          );
        })}
      </SideNavSection>
    </SideNav>
  );
}

export function SiteFooter({ site, year }) {
  return (
    <VStack gap={3} paddingBlock={4} paddingInline={4}>
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
  // ClickableCard needs client-side JS to navigate, which a static build
  // doesn't have — so wrap a plain Card in a real Link instead. The whole
  // card navigates with no JS required.
  return (
    <Link href={href} color="inherit" display="block">
      <Card elevation="low">
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
      </Card>
    </Link>
  );
}

// Injects pre-rendered HTML (e.g. Markdown content) into the component tree.
export function RawHtml({ html }) {
  return <VStack dangerouslySetInnerHTML={{ __html: html }} />;
}
