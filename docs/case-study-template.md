# Case-study template and guidelines

How to write a project for this portfolio, in the format the site renders.
Follow this file and the published page will have the right structure
automatically — the layout does the ordering, you supply the words.

Source: *Product Design Interview Training* e-book, Part 2, “Building an
Excellent Online Portfolio” (book pp. 10–19). The rules below are that
chapter's recommendations, turned into the fields this site uses.

---

## The one idea

A portfolio case study is not documentation. Its job is to make a recruiter
or hiring manager interested enough to talk to you in person. Recruiters
skim tens or hundreds of portfolios a week and most projects are never read
in full — the average portfolio project is over 1,300 words, written as an
outline, and read by almost no one.

So: **tell a story, not an outline, using only four elements — problem,
solution, prototype, outcome — and put the major points at the beginning.**

## The 8 rules

1. **Four elements only.** Problem, solution, prototype, outcome. If a
   section is not one of those four, it does not go on the page.
2. **Short.** Target **~200 words** for the whole page. Hard limit 500.
   (Challenge version: can you say it in 100?)
3. **Major points first.** Everything noteworthy should be “above the
   fold” — before the point where most readers drop off. On this site the
   layout enforces it: Problem → Outcome → Solution → Prototype → Story.
4. **Plain language.** State the problem so someone outside technology or
   design — or a child — could understand it. No jargon, no acronyms.
5. **Process gets one sentence.** Process is the #1 thing portfolios
   over-emphasise. Sticky-note photos, sketch dumps, and diagrams of
   well-known design processes are expected of every designer and prove
   nothing. Add process detail *only* if yours was genuinely unique or
   changed the outcome — and even then, in the story paragraph, not a
   section.
6. **A prototype with every project.** Interactive beats static: a rich,
   animated prototype (with micro-interactions and motion) shows craft; a
   clickable set of static mocks shows less; sketches show least. When the
   product shipped, link the live product or a demo of it instead. On the
   spectrum from sketches (left) to prototypes and production (right),
   lean right.
7. **Show craft, not coverage.** Across the portfolio, focus on three
   skills only: **product thinking, interaction design, visual design.**
   A reviewer should be able to answer, at a glance: What human problem
   was this? What was the outcome? How did the design choices (colour,
   typography, interaction) solve the problem and guide the user to the
   intended outcome? Was the flow prototyped, with motion?
8. **Curate.** The portfolio holds **3–5 projects total**, each chosen to
   highlight a *different* strength (set in the `highlight` field: e.g.
   one for product thinking & strategy, one for interaction design &
   motion, one for visual design & systems). Do not add a sixth project
   without removing or demoting one.

### Do not write these sections

They are the outline format the source chapter tells you to drop. Saving
process and depth for the interview is the point — see “Use in interviews.”

Design Challenge · My Role (as a section — it is a one-line field here) ·
People Problem · Business Problem · Competitive Analysis · Heuristic
Review · User Research · User Personas · User Stories · Affinity
Diagramming · Usability Testing · Sketches · Flow Diagrams · Wireframes ·
Design Specs · Metrics (as a section — one outcome number belongs in
`outcome`) · Retrospective / What I Learned

---

## Fill-in template

Create `src/projects/<slug>.md`, copy this, and replace every bracket.
Word budgets are per field and are part of the template.

```markdown
---
title: [Project name — the product or feature, not a slogan. 2–5 words]
highlight: [The one strength this project proves. Pick a different one
  per project: "Product thinking & strategy" /
  "Interaction design & motion" / "Visual design & systems"]
problem: "[The human problem, in one sentence, in words anyone can
  understand. No jargon, no acronyms, no company-internal names.
  ≤ 25 words]"
solution: "[What you made, in 2–3 sentences. Say what it does for the
  person, and name the one or two design choices that matter most —
  how they guide the user to the intended outcome. ≤ 60 words]"
prototype: "[What the prototype or live product shows — the flow, the
  micro-interactions, the motion. One sentence. ≤ 25 words]"
prototypeUrl: "[Link to the animated prototype, video, demo, or live
  product. Delete this line only while the link does not exist yet —
  the page will show a placeholder. Every published project needs one.]"
outcome: "[What changed, for users and/or the business. One sentence.
  Include a real number if you have one — a rate, a time saved, revenue,
  adoption. Never invent a metric. ≤ 30 words]"
process: "[Your entire process, in exactly one sentence. ≤ 30 words]"
role: [Your role, e.g. Lead UX Designer]
timeline: "[Year · duration, e.g. "2024 · 6 months"]"
team: [Who you worked with, e.g. 2 designers, 4 engineers, 1 PM]
order: [1–5, matching how strongly you want it featured]
tags: projects
layout: layouts/case-study.11ty.jsx
---

[Optional story — the only body text. Two short paragraphs, ≤ 120 words
total, written as a narrative, with no headings:

Paragraph 1: the situation as a story — who was stuck, what it felt
like, what was really going on underneath the problem statement.

Paragraph 2: the one interesting or decisive moment — a decision, a
trade-off, a surprising finding — and why it mattered. This is also the
only place extra process detail may appear, and only if it was unique
or changed the outcome.]
```

### How the page renders it

| Order on page | Comes from | Why |
|---|---|---|
| Highlight label + title | `highlight`, `title` | The strength is visible at a glance |
| Role / Timeline / Team strip | `role`, `timeline`, `team` | Supporting facts, kept small — not a “My Role” section |
| **Problem** (headline) | `problem` | Succinct, plain-language, first |
| **Outcome** (callout card) | `outcome` | The result before the detail, in case they read no further |
| **Solution** | `solution` | Brief: problem → solution is the core story |
| Process line | `process` | Exactly one sentence, rendered as small supporting text |
| **Prototype** | `prototype`, `prototypeUrl` | Interactive evidence of craft, with every project |
| The story | Markdown body | Optional short narrative — no outline headings |

Project cards on Home and Work reuse `highlight`, `problem`, and
`outcome`, so a reviewer gets the problem and the result from the card
without opening the page.

## Worked example (placeholder, as shipped)

From `src/projects/banking-app.md` — placeholder text, ~250 words for the
whole file including front matter:

- **Problem:** “People could not tell, at a glance, how much money they
  actually had available to spend.”
- **Outcome:** “Placeholder outcome: everyday banking tasks now start from
  one clear overview — replace this with the result for users or the
  business, with a number if you have one.”
- **Solution:** “Placeholder solution: the account overview was redesigned
  so the available balance and the everyday tasks — checking, moving, and
  paying — come first, in plain language, on one screen.”
- **Prototype:** “Placeholder: an animated prototype of the redesigned
  account overview, including the micro-interactions for moving money
  between accounts.”
- **Process (one sentence):** “Six months of research, design, and testing
  with two designers, four engineers, and a PM.”
- **Story:** two short paragraphs — the buried-balance situation, then
  where to add the decisive product-thinking moment.

## Pre-publish checklist

- [ ] Whole page is ~200 words (hard limit 500). Count it.
- [ ] A non-designer could repeat the problem back to you after one read.
- [ ] Problem, outcome, solution, and prototype are all understandable
      without scrolling past them — nothing important is only at the end.
- [ ] `process` is one sentence. No process section, no sticky notes, no
      process diagram.
- [ ] No section from the “do not write” list appears anywhere.
- [ ] A working `prototypeUrl` is set — animated prototype, video, demo,
      or live product, not static mocks alone.
- [ ] `outcome` states a result for a user or the business. Any number in
      it is real.
- [ ] `highlight` is different from the other projects' highlights.
- [ ] The portfolio still totals 3–5 projects.
- [ ] You can tell this story out loud in about a minute — that version
      is the page; everything else is interview material.

## Use in interviews

The page is deliberately incomplete; the interview is where depth goes.
Prepare to deep-dive **one** project, spend less time on a **second**, and
give a **third** only a minute or two. Keep your answers to the recruiter
questions ready for each: the human problem, the outcome, how your design
choices solved the problem and guided the user, and how you prototyped
the flow — including the process detail you left off the page.
