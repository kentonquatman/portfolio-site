---
layout: layouts/base.11ty.jsx
title: About
---
// About page, redesigned 2026-10-27 as a resume first: a short header
// (headshot + bio + contact summary), then the resume itself —
// Experience, Education, Skills — and a closing Contact section that
// carries everything the old Contact page held, so that page could be
// deleted. Default Astryx styling only — no custom CSS.
//
// Everything resume-shaped below is placeholder, in the same spirit as
// the rest of the site: replace the entries, do not keep the invented
// companies, dates, or credentials. One row per role or qualification:
// title, organisation, dates, and one line on what it was about.
//
// Headshot: drop a square photo in src/images/ (copied to /images/ at
// build, like project imagery) and set HEADSHOT below, e.g.
// "images/headshot.jpg". Until then the placeholder panel shows.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { Link } from "@astryxdesign/core/Link";
import { Divider } from "@astryxdesign/core/Divider";
import { Card } from "@astryxdesign/core/Card";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Icon } from "@astryxdesign/core/Icon";
import { Button } from "@astryxdesign/core/Button";
import { UserCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { assetUrl } from "./_includes/components.jsx";

const HEADSHOT = null;
const HEADSHOT_ALT = "Headshot";

const BIO = [
  "Placeholder: a short bio goes here — your background, what drew you to design, and the kinds of problems you love solving.",
  "Placeholder: a second short paragraph on how you like to work — for example, with whom, on what kinds of teams, and what a good project looks like to you.",
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

// Headshot: the real photo when HEADSHOT is set, otherwise a stock-theme
// placeholder panel naming the photo it replaces — the same pattern as
// the project media panels.
function Headshot({ name, pathPrefix }) {
  if (HEADSHOT) {
    return (
      <AspectRatio ratio={1} fit="cover">
        <img
          src={assetUrl(HEADSHOT, pathPrefix)}
          alt={HEADSHOT_ALT || name}
          width="100%"
          height="100%"
        />
      </AspectRatio>
    );
  }
  return (
    <AspectRatio ratio={1}>
      <Card variant="gray" width="100%" height="100%" padding={8}>
        <VStack gap={3}>
          <Icon icon={UserCircleIcon} size="lg" color="inherit" />
          <Text color="secondary">Headshot</Text>
          <Text type="supporting" color="secondary">
            Drop a square photo in src/images/ and set HEADSHOT above.
          </Text>
        </VStack>
      </Card>
    </AspectRatio>
  );
}

// One resume row: title and dates on one line, organisation below, then
// a single summary line. Rows, not cards — dense data stays as rows.
function ResumeEntry({ entry }) {
  return (
    <VStack gap={1}>
      <HStack hAlign="between" vAlign="center" wrap="wrap">
        <Heading level={3}>{entry.title}</Heading>
        <Text type="supporting" color="secondary">
          {entry.dates}
        </Text>
      </HStack>
      <Text color="secondary">{entry.org}</Text>
      <Text>{entry.detail}</Text>
    </VStack>
  );
}

function ResumeSection({ title, entries }) {
  return (
    <Section>
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
  const { site, pathPrefix } = data;
  return (
    <>
      {/* Resume header: headshot beside the name, role, location, bio,
          and a compact contact line — the contact summary a resume
          header carries. The full contact section is at the end. */}
      <Section paddingBlock={10}>
        <Grid columns={{ minWidth: 280, repeat: "fit" }} gap={8}>
          <Headshot name={site.name} pathPrefix={pathPrefix} />
          <VStack gap={4}>
            <VStack gap={2}>
              <Text type="supporting" color="secondary">
                About · Resume
              </Text>
              <Heading level={1} type="display-1" textWrap="balance">
                {site.name}
              </Heading>
              <Text type="large" color="secondary">
                {site.role} · {site.location}
              </Text>
            </VStack>
            {BIO.map((paragraph) => (
              <Text key={paragraph} type="large" color="secondary" textWrap="balance">
                {paragraph}
              </Text>
            ))}
            <HStack gap={4} wrap="wrap" vAlign="center">
              <Link href={`mailto:${site.email}`}>{site.email}</Link>
              {site.social.map((link) => (
                <Link key={link.url} href={link.url} target="_blank" rel="noopener">
                  {link.label}
                </Link>
              ))}
            </HStack>
          </VStack>
        </Grid>
      </Section>

      <ResumeSection title="Experience" entries={EXPERIENCE} />
      <ResumeSection title="Education" entries={EDUCATION} />

      <Section>
        <VStack gap={4}>
          <Heading level={2}>Skills</Heading>
          <Divider />
          <Grid columns={{ minWidth: 280, repeat: "fit" }} gap={6}>
            {SKILL_AREAS.map((area) => (
              <VStack key={area.name} gap={2}>
                <Heading level={3}>{area.name}</Heading>
                <Text color="secondary">{area.description}</Text>
              </VStack>
            ))}
          </Grid>
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
          statement, email action, and social list, unchanged. */}
      <Section>
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
