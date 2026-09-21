---
layout: layouts/base.11ty.jsx
title: About
---
// About page. Default Astryx styling only — no custom CSS.
import { VStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { List, ListItem } from "@astryxdesign/core/List";

export default function About(data) {
  const { site } = data;
  return (
    <VStack gap={6} paddingBlock={6}>
      <VStack gap={3}>
        <Text type="supporting" color="secondary">
          About
        </Text>
        <Heading level={1}>Hi, I'm {site.name}.</Heading>
        <Text type="large">
          A longer bio goes here — your background, what drew you to design,
          and the kinds of problems you love solving. Two or three short
          paragraphs is plenty.
        </Text>
        <Text>
          Mention where you're based, what you're looking for next, and
          anything that makes you you outside of work.
        </Text>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>What I do</Heading>
        <List>
          <ListItem>UX Research</ListItem>
          <ListItem>Interaction Design</ListItem>
          <ListItem>Prototyping</ListItem>
          <ListItem>Design Systems</ListItem>
          <ListItem>Usability Testing</ListItem>
          <ListItem>Information Architecture</ListItem>
        </List>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Experience</Heading>
        <Text>
          Add your roles here — title, company, and dates for each position.
        </Text>
      </VStack>
    </VStack>
  );
}
