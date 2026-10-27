---
layout: layouts/base.11ty.jsx
title: About
---
// About page, redesigned 2026-10-27 as layout A (chosen from the three
// preview directions), revised 2026-10-27: a sticky identity rail on
// the right on desktop — headshot, name, role, location, contact
// links — beside a scrolling main column, collapsing to a single
// stacked column on narrow viewports. The rail itself lives in the
// base layout (see IdentityRail in components.jsx); this file is only
// the main column: Bio → Experience → Education. Contact lives in
// the rail (and the footer), not in a section below the resume, and
// there is no Skills section and no separate Contact page.
// Default Astryx styling only — no custom CSS.
//
// Everything resume-shaped below is placeholder, in the same spirit as
// the rest of the site: replace the entries, do not keep the invented
// companies, dates, or credentials.
import { Section, VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Divider } from "@astryxdesign/core/Divider";

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

// Anchor sections land below the sticky TopNav, not underneath it:
// the scroll margin is the same measured header-height variable the
// rail's sticky offset uses, plus one spacing step of breathing room.
const ANCHOR_STYLE = {
  scrollMarginTop:
    "calc(var(--_app-shell-header-height, 0px) + var(--spacing-4))",
};

// Spacing, 2026-10-27: the previous layout packed sections together —
// sections carried only the theme's 12px padding and no gap between
// them, so the whole page fit one viewport. The values below are
// deliberately generous, in Astryx spacing steps (4 = 16px, 6 = 24px,
// 8 = 32px, 10 = 40px): sections get 24px of their own padding plus
// 32px between them, about 80px of breathing room between section
// contents, and entries get room to read as separate rows.
//
// One resume row: the date in its own narrow sub-column, then role,
// organisation, and a single summary line. The row wraps, so on a
// narrow main column the date moves above the role instead of
// squeezing the text beside it. Rows, not cards — dense data stays
// as rows.
function ResumeEntry({ entry }) {
  return (
    <HStack gap={6} wrap="wrap" vAlign="start">
      <VStack width={140}>
        <Text type="supporting" color="secondary">
          {entry.dates}
        </Text>
      </VStack>
      <VStack gap={2}>
        <Heading level={3}>{entry.title}</Heading>
        <Text color="secondary">{entry.org}</Text>
        <Text>{entry.detail}</Text>
      </VStack>
    </HStack>
  );
}

function ResumeSection({ id, title, entries }) {
  return (
    <Section id={id} style={ANCHOR_STYLE} padding={6}>
      <VStack gap={8}>
        <Heading level={2}>{title}</Heading>
        <Divider />
        {entries.map((entry, i) => (
          <VStack key={`${entry.title}-${i}`} gap={6}>
            {i > 0 && <Divider />}
            <ResumeEntry entry={entry} />
          </VStack>
        ))}
      </VStack>
    </Section>
  );
}

export default function About() {
  return (
    <VStack gap={8}>
      <Section id="bio" style={ANCHOR_STYLE} padding={6}>
        <VStack gap={6}>
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
    </VStack>
  );
}
