---
layout: layouts/base.11ty.jsx
title: About
---
// About page: greeting headline at display scale, the three focus areas
// as distinct blocks, supporting crafts as tokens, experience as a
// simple list — no profile card, no badge row. Default Astryx styling
// only — no custom CSS.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";

// The three areas the portfolio itself focuses on. Process skills
// (research, testing, workshops) are expected of every designer, so they
// are not listed here.
const FOCUS_AREAS = [
  {
    name: "Product Thinking",
    description:
      "Placeholder: finding the human problem worth solving, and deciding what to build — and what not to — before anything is designed.",
  },
  {
    name: "Interaction Design",
    description:
      "Placeholder: how a product behaves — flows, states, and the micro-interactions and motion that guide someone to the intended outcome.",
  },
  {
    name: "Visual Design",
    description:
      "Placeholder: typography, colour, and layout used deliberately, so the product is clear at a glance and feels like one product.",
  },
];

const SUPPORTING = ["Prototyping & Motion", "Design Systems"];

export default function About(data) {
  const { site } = data;
  return (
    <>
      <Section paddingBlock={10}>
        <VStack gap={4}>
          <Text type="supporting" color="secondary">
            About
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            Hi, I'm {site.name}.
          </Heading>
          <Text type="large" color="secondary" textWrap="balance">
            A longer bio goes here — your background, what drew you to design,
            and the kinds of problems you love solving. Two or three short
            paragraphs is plenty.
          </Text>
        </VStack>
      </Section>

      <Section>
        <VStack gap={4}>
          <Heading level={2}>What I focus on</Heading>
          <Grid columns={{ minWidth: 280, repeat: "fit" }} gap={4}>
            {FOCUS_AREAS.map((area) => (
              <Card key={area.name}>
                <VStack gap={2}>
                  <Heading level={3}>{area.name}</Heading>
                  <Text color="secondary">{area.description}</Text>
                </VStack>
              </Card>
            ))}
          </Grid>
          <HStack gap={2} wrap="wrap" vAlign="center">
            <Text type="supporting" color="secondary">
              Also:
            </Text>
            {SUPPORTING.map((skill) => (
              <Token key={skill} label={skill} />
            ))}
          </HStack>
        </VStack>
      </Section>

      <Section>
        <VStack gap={3}>
          <Heading level={2}>Process, in one sentence</Heading>
          <Text type="large" color="secondary" textWrap="balance">
            Placeholder: understand the human problem, design the simplest
            thing that solves it, prototype it, and test it with the people it
            is for — that is the whole process section, on purpose.
          </Text>
        </VStack>
      </Section>

      <Section>
        <VStack gap={3}>
          <Heading level={2}>Experience</Heading>
          <Divider />
          <Text color="secondary">
            Roles, companies, and dates will live here — one row per role:
            role, company, dates, and one line on what it was about.
          </Text>
        </VStack>
      </Section>
    </>
  );
}
