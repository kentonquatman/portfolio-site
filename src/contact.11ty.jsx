---
layout: layouts/base.11ty.jsx
title: Contact
---
// Contact page: centered card with email action and social links.
// Default Astryx styling only — no custom CSS.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";
import { Icon } from "@astryxdesign/core/Icon";
import { Divider } from "@astryxdesign/core/Divider";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Contact(data) {
  const { site } = data;
  return (
    <Section paddingBlock={10}>
      <VStack gap={5} hAlign="center">
        <VStack gap={3} hAlign="center">
          <Text type="supporting" color="secondary">
            Contact
          </Text>
          <Heading level={1} type="display-1" justify="center">
            Let's work together.
          </Heading>
          <Text type="large" color="secondary" justify="center" textWrap="balance">
            I'm currently open to new opportunities and freelance projects.
            The fastest way to reach me is by email.
          </Text>
        </VStack>
        <Button
          variant="primary"
          label={site.email}
          href={`mailto:${site.email}`}
          endContent={<Icon icon={EnvelopeIcon} size="sm" color="inherit" />}
        />
        <Divider />
        <VStack gap={3} hAlign="center">
          <Text type="supporting" color="secondary">
            Elsewhere
          </Text>
          <HStack gap={4} hAlign="center">
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
          </HStack>
        </VStack>
      </VStack>
    </Section>
  );
}
