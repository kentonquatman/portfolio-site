---
layout: layouts/base.11ty.jsx
title: Home
---
// Home page. Default Astryx styling only — no custom CSS.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";
import { ProjectCard } from "./_includes/components.jsx";

export default function Home(data) {
  const { site, collections, pathPrefix } = data;
  return (
    <>
      <Section paddingBlock={8}>
        <VStack gap={4}>
          <Text type="supporting" color="secondary">
            {site.role}
          </Text>
          <Heading level={1} type="display-2">
            Hi, I'm {site.name}.
          </Heading>
          <Text type="large">{site.tagline}</Text>
          <HStack gap={2}>
            <Button
              variant="primary"
              label="View my work"
              href={`${pathPrefix}work/`}
            />
            <Button
              variant="secondary"
              label="Get in touch"
              href={`${pathPrefix}contact/`}
            />
          </HStack>
        </VStack>
      </Section>

      <Section>
        <VStack gap={4}>
          <HStack hAlign="between" vAlign="center">
            <Heading level={2}>Selected work</Heading>
            <Link href={`${pathPrefix}work/`}>All projects</Link>
          </HStack>
          <Grid columns={{ minWidth: 280, repeat: "fit" }} gap={4}>
            {collections.projects.map((project) => (
              <ProjectCard key={project.page.url} project={project} />
            ))}
          </Grid>
        </VStack>
      </Section>

      <Section variant="muted">
        <VStack gap={3}>
          <Heading level={2}>A little about me</Heading>
          <Text>
            A short paragraph about who you are, what you care about, and how
            you like to work goes here.
          </Text>
          <Button
            variant="secondary"
            label="More about me"
            href={`${pathPrefix}about/`}
          />
        </VStack>
      </Section>
    </>
  );
}
