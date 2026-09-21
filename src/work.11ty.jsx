---
layout: layouts/base.11ty.jsx
title: Work
---
// Work page: all projects in a responsive grid.
// Default Astryx styling only — no custom CSS.
import { VStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { ProjectCard } from "./_includes/components.jsx";

export default function Work(data) {
  const { collections, pathPrefix } = data;
  return (
    <VStack gap={6} paddingBlock={6}>
      <VStack gap={2}>
        <Text type="supporting" color="secondary">
          Portfolio
        </Text>
        <Heading level={1}>Work</Heading>
        <Text type="large">
          A selection of projects spanning product design, design systems, and
          UX research.
        </Text>
      </VStack>
      <Grid columns={{ minWidth: 280, repeat: "fit" }} gap={4}>
        {collections.projects.map((project) => (
          <ProjectCard
            key={project.page.url}
            project={project}
            pathPrefix={pathPrefix}
          />
        ))}
      </Grid>
    </VStack>
  );
}
