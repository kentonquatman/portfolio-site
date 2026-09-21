---
layout: layouts/base.11ty.jsx
---
// Case-study layout for Markdown project files.
// Default Astryx styling only — no custom CSS.
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";
import { Breadcrumbs, BreadcrumbItem } from "@astryxdesign/core/Breadcrumbs";
import { RawHtml } from "../components.jsx";

function MetaItem({ label, value }) {
  return (
    <VStack gap={1}>
      <Text type="supporting" color="secondary">
        {label}
      </Text>
      <Text weight="semibold">{value}</Text>
    </VStack>
  );
}

export default function CaseStudyLayout(data) {
  const { title, summary, role, timeline, team, content, pathPrefix } = data;
  return (
    <VStack gap={6} paddingBlock={6}>
      <Breadcrumbs variant="supporting">
        <BreadcrumbItem href={`${pathPrefix}`}>Home</BreadcrumbItem>
        <BreadcrumbItem href={`${pathPrefix}work/`}>Work</BreadcrumbItem>
        <BreadcrumbItem>{title}</BreadcrumbItem>
      </Breadcrumbs>

      <VStack gap={3}>
        <Text type="supporting" color="secondary">
          Case study
        </Text>
        <Heading level={1}>{title}</Heading>
        <Text type="large">{summary}</Text>
        <HStack gap={6}>
          <MetaItem label="Role" value={role} />
          <MetaItem label="Timeline" value={timeline} />
          <MetaItem label="Team" value={team} />
        </HStack>
      </VStack>

      <Divider />

      <RawHtml html={content} />

      <Divider />

      <Link href={`${pathPrefix}work/`}>All projects</Link>
    </VStack>
  );
}
