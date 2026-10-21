---
layout: layouts/base.11ty.jsx
---
// Case-study layout for Markdown project files.
//
// Structure follows the portfolio guidance in
// docs/case-study-template.md (from "Building an Excellent Online
// Portfolio"): tell a story with only four elements — problem, outcome,
// solution, prototype — and put the major points first, above the fold.
// There is no process section: `process` is a single sentence by design.
// Default Astryx styling only — no custom CSS.
import { HStack, VStack, Section } from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Button } from "@astryxdesign/core/Button";
import { Divider } from "@astryxdesign/core/Divider";
import { Card } from "@astryxdesign/core/Card";
import { Token } from "@astryxdesign/core/Token";
import { Icon } from "@astryxdesign/core/Icon";
import { Breadcrumbs, BreadcrumbItem } from "@astryxdesign/core/Breadcrumbs";
import { PlayCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ProjectCard, RawHtml } from "../components.jsx";

function MetaItem({ label, value }) {
  return (
    <VStack gap={1}>
      <Text type="supporting" color="secondary">
        {label}
      </Text>
      <Text weight="semibold">{value}</Text>
    </VStack>
  );
}

// Labelled narrative block: a small supporting label over its text, the
// same pattern as the PROBLEM / SOLUTION labels in the reference example.
function StoryBlock({ label, children }) {
  return (
    <VStack gap={2}>
      <Text type="supporting" color="secondary">
        {label}
      </Text>
      {children}
    </VStack>
  );
}

export default function CaseStudyLayout(data) {
  const {
    title,
    highlight,
    problem,
    solution,
    prototype,
    prototypeUrl,
    outcome,
    process,
    role,
    timeline,
    team,
    content,
    pathPrefix,
    page,
  } = data;
  const projects = data.collections?.projects ?? [];
  const index = projects.findIndex((p) => p.page.url === page.url);
  const next = projects[(index + 1) % projects.length];
  return (
    <Section paddingBlock={6}>
      <VStack gap={6}>
        <Breadcrumbs variant="supporting">
          <BreadcrumbItem href={`${pathPrefix}`}>Home</BreadcrumbItem>
          <BreadcrumbItem href={`${pathPrefix}work/`}>Work</BreadcrumbItem>
          <BreadcrumbItem>{title}</BreadcrumbItem>
        </Breadcrumbs>

        <VStack gap={3}>
          <HStack gap={3} vAlign="center">
            <Text type="supporting" color="secondary">
              Case study
            </Text>
            {highlight && <Token label={highlight} />}
          </HStack>
          <Heading level={1} type="display-1" textWrap="balance">
            {title}
          </Heading>
        </VStack>

        <Card variant="muted">
          <HStack gap={6}>
            <MetaItem label="Role" value={role} />
            <MetaItem label="Timeline" value={timeline} />
            <MetaItem label="Team" value={team} />
          </HStack>
        </Card>

        {/* Above the fold: the problem in plain language, then the
            outcome — the two things a reviewer needs first. */}
        <StoryBlock label="Problem">
          <Heading level={2} textWrap="balance">
            {problem}
          </Heading>
        </StoryBlock>

        <Card>
          <StoryBlock label="Outcome">{outcome && <Text type="large">{outcome}</Text>}</StoryBlock>
        </Card>

        <StoryBlock label="Solution">
          <Text type="large" color="secondary" textWrap="balance">
            {solution}
          </Text>
          {process && (
            <Text type="supporting" color="secondary">
              Process, in one sentence: {process}
            </Text>
          )}
        </StoryBlock>

        <VStack gap={3}>
          <Heading level={2}>Prototype</Heading>
          <Card variant="muted">
            <VStack gap={3}>
              <Icon icon={PlayCircleIcon} size="lg" color="secondary" />
              <Text>{prototype}</Text>
              {prototypeUrl ? (
                <HStack>
                  <Button
                    variant="primary"
                    label="View prototype"
                    href={prototypeUrl}
                    target="_blank"
                    rel="noopener"
                    endContent={
                      <Icon icon={ArrowRightIcon} size="sm" color="inherit" />
                    }
                  />
                </HStack>
              ) : (
                <Text type="supporting" color="secondary">
                  Prototype placeholder — add a `prototypeUrl` in the project
                  file to link the animated prototype or live product here.
                  Every project should have one.
                </Text>
              )}
            </VStack>
          </Card>
        </VStack>

        <Divider />

        {/* Optional short narrative only — no outline sections. The
            template targets ~200 words for the whole page. */}
        <VStack gap={3}>
          <Heading level={2}>The story</Heading>
          <RawHtml html={content} />
        </VStack>

        <Divider />

        <VStack gap={4}>
          <HStack hAlign="between" vAlign="center">
            <Heading level={2}>Next project</Heading>
            <Link href={`${pathPrefix}work/`}>All projects</Link>
          </HStack>
          {next && (
            <ProjectCard
              key={next.page.url}
              project={next}
              pathPrefix={pathPrefix}
            />
          )}
        </VStack>
      </VStack>
    </Section>
  );
}
