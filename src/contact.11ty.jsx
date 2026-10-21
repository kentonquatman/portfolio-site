---
layout: layouts/base.11ty.jsx
title: Contact
---
// Contact page: one large statement, the email action, and social links
// as a plain list — matching the minimal frames of the example
// portfolios. Default Astryx styling only — no custom CSS.
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
      <VStack gap={6}>
        <VStack gap={4}>
          <Text type="supporting" color="secondary">
            Contact
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            Let's work together.
          </Heading>
          <Text type="large" color="secondary" textWrap="balance">
            I'm currently open to new opportunities and freelance projects.
            The fastest way to reach me is by email.
          </Text>
        </VStack>
        <HStack>
          <Button
            variant="primary"
            label={site.email}
            href={`mailto:${site.email}`}
            endContent={<Icon icon={EnvelopeIcon} size="sm" color="inherit" />}
          />
        </HStack>
        <Divider />
        <VStack gap={3}>
          <Text type="supporting" color="secondary">
            Elsewhere
          </Text>
          <VStack gap={2}>
            {site.social.map((link) => (
              <Text key={link.url} type="large">
                <Link href={link.url} target="_blank" rel="noopener">
                  {link.label}
                </Link>
              </Text>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Section>
  );
}
