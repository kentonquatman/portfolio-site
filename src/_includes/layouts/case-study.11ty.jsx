---
layout: layouts/base.11ty.jsx
---
// Case-study layout for Markdown project files.
//
// Redesigned 2026-10-21 after the example portfolios linked from
// "Building an Excellent Online Portfolio" and the chapter's own worked
// example (Garron Engstrom): media first and large, the problem as the
// big headline, the solution as supporting text, everything noteworthy
// before the reader drops off. The four elements — problem, outcome,
// solution, prototype — and at most one sentence of process
// (docs/case-study-template.md). Default Astryx styling only.
import { HStack, VStack, Section } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { Button } from "@astryxdesign/core/Button";
import { Divider } from "@astryxdesign/core/Divider";
import { Token } from "@astryxdesign/core/Token";
import { Icon } from "@astryxdesign/core/Icon";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  ProjectMedia,
  NextProject,
  RawHtml,
  projectSlug,
} from "../components.jsx";

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
  const slug = page.url.split("/").filter(Boolean).pop();
  return (
    <Section paddingBlock={6}>
      <VStack gap={8}>
        <HStack hAlign="between" vAlign="center">
          <Link href={`${pathPrefix}work/`}>All work</Link>
          {highlight && <Token label={highlight} />}
        </HStack>

        <VStack gap={4}>
          <Text type="supporting" color="secondary">
            Case study · {role} · {timeline}
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            {title}
          </Heading>
          {/* The problem is the headline — stated the way the reference
              example states it, large enough to be understood at a
              glance, in plain language. */}
          <Heading level={2} type="display-2" textWrap="balance">
            {problem}
          </Heading>
        </VStack>

        {/* Media first, at full width: the prototype is the evidence of
            craft, so it leads — not a section halfway down the page. */}
        <VStack gap={3}>
          <ProjectMedia slug={slug} title={title} caption={prototype} />
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
              Prototype placeholder — add a `prototypeUrl` in the project file
              to link the animated prototype or live product here. Every
              project should have one.
            </Text>
          )}
        </VStack>

        <Grid columns={{ minWidth: 320, repeat: "fit" }} gap={8}>
          <VStack gap={6}>
            <StoryBlock label="Outcome">
              <Text type="large">{outcome}</Text>
            </StoryBlock>
            <StoryBlock label="Solution">
              <Text color="secondary">{solution}</Text>
              {process && (
                <Text type="supporting" color="secondary">
                  Process, in one sentence: {process}
                </Text>
              )}
            </StoryBlock>
            <StoryBlock label="The story">
              <RawHtml html={content} />
            </StoryBlock>
          </VStack>

          <VStack gap={4}>
            <Heading level={3}>Details</Heading>
            <MetaItem label="Role" value={role} />
            <Divider />
            <MetaItem label="Timeline" value={timeline} />
            <Divider />
            <MetaItem label="Team" value={team} />
            <Divider />
            <MetaItem label="Focus" value={highlight} />
            <Divider />
            <StoryBlock label="Prototype">
              <Text type="supporting" color="secondary">
                {prototype}
              </Text>
            </StoryBlock>
          </VStack>
        </Grid>

        <Divider />

        <VStack gap={4}>
          <HStack hAlign="between" vAlign="center">
            <Heading level={2}>Next project</Heading>
            <Link href={`${pathPrefix}work/`}>All projects</Link>
          </HStack>
          {next && (
            <NextProject
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
