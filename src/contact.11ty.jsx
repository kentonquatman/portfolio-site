---
layout: layouts/base.11ty.jsx
title: Contact
---
// Contact page. Default Astryx styling only — no custom CSS.
import { VStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";

export default function Contact(data) {
  const { site } = data;
  return (
    <VStack gap={6} paddingBlock={6}>
      <VStack gap={3}>
        <Text type="supporting" color="secondary">
          Contact
        </Text>
        <Heading level={1}>Let's work together.</Heading>
        <Text type="large">
          I'm currently open to new opportunities and freelance projects. The
          fastest way to reach me is by email.
        </Text>
        <Button
          variant="primary"
          label={site.email}
          href={`mailto:${site.email}`}
        />
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Elsewhere</Heading>
        <VStack gap={2}>
          {site.social.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener"
            >
              {link.label}
            </Link>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
