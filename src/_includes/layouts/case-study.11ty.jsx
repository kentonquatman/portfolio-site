---
layout: layouts/base.11ty.jsx
---
// Case-study layout for Markdown project files.
// Default Astryx styling only — no custom CSS.
import { HStack, VStack, Section } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";
import { Card } from "@astryxdesign/core/Card";
import { Breadcrumbs, BreadcrumbItem } from "@astryxdesign/core/Breadcrumbs";
import { ProjectCard, RawHtml } from "../components.jsx";

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
  const { title, summary, role, timeline, team, content, pathPrefix, page } =
    data;
  const projects = data.collections?.projects ?? [];
  const index = projects.findIndex((p) => p.page.url === page.url);
  const next = projects[(index + 1) % projects.length];
  return (
    <Section paddingBlock={6}>
      <VStack gap={6}>
        <Breadcrumbs variant="supporting">
          <BreadcrumbItem href={`${pathPrefix}`}>Home</BreadcrumbItem>
          <BreadcrumbItem href={`${pathPrefix}work/`}>Work</BreadcrumbItem>
          <BreadcrumbItem>{title}</BreadcrumbItem>
        </Breadcrumbs>

        <VStack gap={3}>
          <Text type="supporting" color="secondary">
            Case study
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            {title}
          </Heading>
          <Text type="large" color="secondary">
            {summary}
          </Text>
        </VStack>

        <Card variant="muted">
          <HStack gap={6}>
            <MetaItem label="Role" value={role} />
            <MetaItem label="Timeline" value={timeline} />
            <MetaItem label="Team" value={team} />
          </HStack>
        </Card>

        <Divider />

        <RawHtml html={content} />

        <Divider />

        <VStack gap={4}>
          <HStack hAlign="between" vAlign="center">
            <Heading level={2}>Next project</Heading>
            <Link href={`${pathPrefix}work/`}>All projects</Link>
          </HStack>
          {next && (
            <ProjectCard
              key={next.page.url}
              project={next}
              pathPrefix={pathPrefix}
            />
          )}
        </VStack>
      </VStack>
    </Section>
  );
}
