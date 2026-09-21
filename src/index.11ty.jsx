---
layout: layouts/base.11ty.jsx
title: Home
---
// Home page: centered hero, selected work grid, about teaser.
// Default Astryx styling only — no custom CSS.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";
import { Icon } from "@astryxdesign/core/Icon";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Card } from "@astryxdesign/core/Card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ProjectCard } from "./_includes/components.jsx";

export default function Home(data) {
  const { site, collections, pathPrefix } = data;
  return (
    <>
      <Section paddingBlock={10}>
        <VStack gap={6} hAlign="center">
          <Avatar name={site.name} size="xl" />
          <VStack gap={3} hAlign="center">
            <Text type="supporting" color="secondary">
              {site.role}
            </Text>
            <Heading
              level={1}
              type="display-2"
              justify="center"
              textWrap="balance"
            >
              Hi, I'm {site.name}.
            </Heading>
            <Text
              type="large"
              color="secondary"
              justify="center"
              textWrap="balance"
            >
              {site.tagline}
            </Text>
          </VStack>
          <HStack gap={3} hAlign="center">
            <Button
              variant="primary"
              label="View my work"
              href={`${pathPrefix}work/`}
              endContent={
                <Icon icon={ArrowRightIcon} size="sm" color="inherit" />
              }
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
              <ProjectCard
                key={project.page.url}
                project={project}
                pathPrefix={pathPrefix}
              />
            ))}
          </Grid>
        </VStack>
      </Section>

      <Section>
        <Card>
          <HStack gap={6} vAlign="center">
            <Avatar name={site.name} size="lg" />
            <VStack gap={3}>
              <Heading level={2}>A little about me</Heading>
              <Text color="secondary">
                A short paragraph about who you are, what you care about, and
                how you like to work goes here.
              </Text>
              <HStack>
                <Button
                  variant="secondary"
                  label="More about me"
                  href={`${pathPrefix}about/`}
                  endContent={
                    <Icon icon={ArrowRightIcon} size="sm" color="inherit" />
                  }
                />
              </HStack>
            </VStack>
          </HStack>
        </Card>
      </Section>
    </>
  );
}
