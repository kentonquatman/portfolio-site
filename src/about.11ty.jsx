---
layout: layouts/base.11ty.jsx
title: About
---
// About page: profile header, skill tags, experience.
// Default Astryx styling only — no custom CSS.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Token } from "@astryxdesign/core/Token";
import { Card } from "@astryxdesign/core/Card";

// Focused on the three areas the portfolio itself focuses on — product
// thinking, interaction design, visual design — plus the two supporting
// crafts the case studies demonstrate. Process skills (research, testing,
// workshops) are expected of every designer, so they are not listed here.
const SKILLS = [
  "Product Thinking",
  "Interaction Design",
  "Visual Design",
  "Prototyping & Motion",
  "Design Systems",
];

export default function About(data) {
  const { site } = data;
  return (
    <>
      <Section paddingBlock={8}>
        <HStack gap={6} vAlign="center">
          <Avatar name={site.name} size="xl" />
          <VStack gap={3}>
            <Text type="supporting" color="secondary">
              About
            </Text>
            <Heading level={1} type="display-1">
              Hi, I'm {site.name}.
            </Heading>
            <Text type="large" color="secondary">
              A longer bio goes here — your background, what drew you to
              design, and the kinds of problems you love solving. Two or three
              short paragraphs is plenty.
            </Text>
          </VStack>
        </HStack>
      </Section>

      <Section>
        <VStack gap={3}>
          <Heading level={2}>What I do</Heading>
          <HStack gap={2} wrap="wrap">
            {SKILLS.map((skill) => (
              <Token key={skill} label={skill} />
            ))}
          </HStack>
        </VStack>
      </Section>

      <Section>
        <VStack gap={3}>
          <Heading level={2}>Process, in one sentence</Heading>
          <Text color="secondary">
            Placeholder: understand the human problem, design the simplest
            thing that solves it, prototype it, and test it with the people
            it is for — that is the whole process section, on purpose.
          </Text>
        </VStack>
      </Section>

      <Section>
        <VStack gap={3}>
          <Heading level={2}>Experience</Heading>
          <Card variant="muted">
            <Text type="supporting" color="secondary">
              Roles, companies, and dates will live here.
            </Text>
          </Card>
        </VStack>
      </Section>
    </>
  );
}
