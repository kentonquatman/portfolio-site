---
layout: layouts/base.11ty.jsx
title: Home
---
// Home page: a one-sentence statement at display scale, then the whole
// portfolio as a single scroll of full-width project features — the
// pattern shared by the example portfolios (Aaron James, Robin
// Clediere, Laura Javier): no card grid, no profile widget, media first
// per project. Default Astryx styling only — no custom CSS.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Token } from "@astryxdesign/core/Token";
import { Divider } from "@astryxdesign/core/Divider";
import { ProjectFeature } from "./_includes/components.jsx";

// The three things this portfolio focuses on, at a glance — product
// thinking, interaction design, and visual design.
const FOCUS_AREAS = ["Product thinking", "Interaction design", "Visual design"];

export default function Home(data) {
  const { site, collections, pathPrefix } = data;
  const projects = collections.projects;
  return (
    <>
      <Section paddingBlock={10}>
        <VStack gap={6}>
          <Text type="supporting" color="secondary">
            {site.name} — {site.role}, {site.location}
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            {site.tagline}
          </Heading>
          <HStack gap={2} wrap="wrap">
            {FOCUS_AREAS.map((area) => (
              <Token key={area} label={area} />
            ))}
          </HStack>
        </VStack>
      </Section>

      <Section>
        <VStack gap={8}>
          <HStack hAlign="between" vAlign="center">
            <Heading level={2}>Selected work</Heading>
            <Text type="supporting" color="secondary">
              {projects.length} projects · each a different strength
            </Text>
          </HStack>
          {projects.map((project, i) => (
            <VStack key={project.page.url} gap={8}>
              {i > 0 && <Divider />}
              <ProjectFeature project={project} pathPrefix={pathPrefix} />
            </VStack>
          ))}
        </VStack>
      </Section>

      <Section>
        <VStack gap={4}>
          <Divider />
          <Heading level={2} type="display-3" textWrap="balance">
            A little about me
          </Heading>
          <Text type="large" color="secondary" textWrap="balance">
            A short paragraph about who you are, what you care about, and how
            you like to work goes here.
          </Text>
          <HStack gap={3}>
            <Button
              variant="secondary"
              label="More about me"
              href={`${pathPrefix}about/`}
            />
            <Button
              variant="primary"
              label="Get in touch"
              href={`${pathPrefix}contact/`}
            />
          </HStack>
        </VStack>
      </Section>
    </>
  );
}
