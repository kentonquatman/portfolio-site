---
layout: layouts/base.11ty.jsx
title: Work
---
// Work page: the same single scroll of full-width project features as
// the home page — the portfolio is small and curated on purpose, so Work
// is the complete list, presented at full scale rather than as a grid of
// small cards. Default Astryx styling only — no custom CSS.
import { Section, VStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Divider } from "@astryxdesign/core/Divider";
import { ProjectFeature } from "./_includes/components.jsx";

export default function Work(data) {
  const { collections, pathPrefix } = data;
  const projects = collections.projects;
  return (
    <>
      <Section paddingBlock={8}>
        <VStack gap={4}>
          <Text type="supporting" color="secondary">
            Portfolio
          </Text>
          <Heading level={1} type="display-1">
            Work
          </Heading>
          <Text type="large" color="secondary" textWrap="balance">
            Three projects, chosen on purpose. Each one highlights a different
            aspect of design — product thinking, interaction design, or visual
            design and systems — and each one is told the same way: the
            problem, the outcome, the solution, and a prototype.
          </Text>
        </VStack>
      </Section>

      <Section>
        <VStack gap={8}>
          {projects.map((project, i) => (
            <VStack key={project.page.url} gap={8}>
              {i > 0 && <Divider />}
              <ProjectFeature project={project} pathPrefix={pathPrefix} />
            </VStack>
          ))}
        </VStack>
      </Section>
    </>
  );
}
