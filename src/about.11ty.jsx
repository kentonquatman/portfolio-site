---
layout: layouts/base.11ty.jsx
title: About
---
// About page, redesigned 2026-10-27 as layout A (chosen from the three
// preview directions): a sticky identity rail on desktop — headshot,
// name, role, location, contact links, and in-page nav — beside a
// scrolling main column, collapsing to a single stacked column on
// narrow viewports. The rail itself lives in the base layout (see
// IdentityRail in components.jsx); this file is only the main column:
// Bio → Experience → Education → Skills → Contact, with contact
// repeated here at the end so the page never needs a Contact page.
// Default Astryx styling only — no custom CSS.
//
// Everything resume-shaped below is placeholder, in the same spirit as
// the rest of the site: replace the entries, do not keep the invented
// companies, dates, or credentials.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";
import { Button } from "@astryxdesign/core/Button";
import { Icon } from "@astryxdesign/core/Icon";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const BIO = [
  "Placeholder: a short bio goes here — your background, what drew you to design, and the kinds of problems you love solving.",
  "Placeholder: a second short paragraph on how you like to work — for example, with whom, on what kinds of teams, and what a good project looks like to you.",
  "Placeholder: I'm currently open to new opportunities and freelance projects.",
];

const EXPERIENCE = [
  {
    title: "Placeholder role",
    org: "Placeholder company · New York, NY",
    dates: "20XX – 20XX",
    detail:
      "Placeholder: one line on what the role was about and what you were responsible for.",
  },
  {
    title: "Placeholder role",
    org: "Placeholder company · New York, NY",
    dates: "20XX – 20XX",
    detail:
      "Placeholder: one line on what the role was about and what you were responsible for.",
  },
  {
    title: "Placeholder role",
    org: "Placeholder company · New York, NY",
    dates: "20XX – 20XX",
    detail:
      "Placeholder: one line on what the role was about and what you were responsible for.",
  },
];

const EDUCATION = [
  {
    title: "Placeholder degree",
    org: "Placeholder university",
    dates: "20XX – 20XX",
    detail: "Placeholder: one line on the focus of the degree, if relevant.",
  },
  {
    title: "Placeholder qualification",
    org: "Placeholder institution",
    dates: "20XX",
    detail: "Placeholder: one line on what it covered, if relevant.",
  },
];

// The three areas the portfolio itself focuses on, kept as the Skills
// section so the resume and the work tell the same story. Process skills
// (research, testing, workshops) are expected of every designer, so they
// are not listed as focus areas.
const SKILL_AREAS = [
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

const SUPPORTING_SKILLS = ["Prototyping & Motion", "Design Systems"];

// One resume row: the date in its own narrow sub-column, then role,
// organisation, and a single summary line. The row wraps, so on a
// narrow main column the date moves above the role instead of
// squeezing the text beside it. Rows, not cards — dense data stays
// as rows.
function ResumeEntry({ entry }) {
  return (
    <HStack gap={4} wrap="wrap" vAlign="start">
      <VStack width={140}>
        <Text type="supporting" color="secondary">
          {entry.dates}
        </Text>
      </VStack>
      <VStack gap={1}>
        <Heading level={3}>{entry.title}</Heading>
        <Text color="secondary">{entry.org}</Text>
        <Text>{entry.detail}</Text>
      </VStack>
    </HStack>
  );
}

function ResumeSection({ id, title, entries }) {
  return (
    <Section id={id}>
      <VStack gap={4}>
        <Heading level={2}>{title}</Heading>
        <Divider />
        {entries.map((entry, i) => (
          <VStack key={`${entry.title}-${i}`} gap={4}>
            {i > 0 && <Divider />}
            <ResumeEntry entry={entry} />
          </VStack>
        ))}
      </VStack>
    </Section>
  );
}

export default function About(data) {
  const { site } = data;
  return (
    <>
      <Section id="bio">
        <VStack gap={4}>
          <Text type="supporting" color="secondary">
            BIO
          </Text>
          {BIO.map((paragraph) => (
            <Text key={paragraph} type="large" color="secondary" textWrap="balance">
              {paragraph}
            </Text>
          ))}
        </VStack>
      </Section>

      <ResumeSection id="experience" title="Experience" entries={EXPERIENCE} />
      <ResumeSection id="education" title="Education" entries={EDUCATION} />

      <Section id="skills">
        <VStack gap={4}>
          <Heading level={2}>Skills</Heading>
          <Divider />
          {SKILL_AREAS.map((area) => (
            <VStack key={area.name} gap={2}>
              <Heading level={3}>{area.name}</Heading>
              <Text color="secondary">{area.description}</Text>
            </VStack>
          ))}
          <HStack gap={2} wrap="wrap" vAlign="center">
            <Text type="supporting" color="secondary">
              Also:
            </Text>
            {SUPPORTING_SKILLS.map((skill) => (
              <Token key={skill} label={skill} />
            ))}
          </HStack>
        </VStack>
      </Section>

      {/* Contact, moved here from the deleted Contact page: the same
          statement, email action, and social list, unchanged — the
          closing strip that makes this page complete on its own. */}
      <Section id="contact">
        <VStack gap={6}>
          <VStack gap={4}>
            <Heading level={2} type="display-3" textWrap="balance">
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
    </>
  );
}
