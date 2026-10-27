# Portfolio

A simple UX design portfolio built with [11ty](https://www.11ty.dev/) and
[Astryx](https://www.astryx.design/) (stock Neutral theme, default styling —
no custom CSS).

## Getting started

```bash
npm install
```

## Local development

```bash
npm start        # 11ty dev server with live reload
```

## Production build

```bash
npm run build
```

This renders the `.11ty.jsx` pages and layouts to static HTML with React
server-side rendering, copies the Astryx stylesheets (`reset.css`,
`astryx.css`, `theme.css`) into `_site/css/`, and writes the site to `_site/`.

Set `ELEVENTY_PATH_PREFIX=/repo-name/` when deploying to a project subpath
(e.g. `username.github.io/portfolio-site`); it defaults to `/`.

## Making it yours

- **Site details** (name, role, email, social links, headshot):
  edit `src/_data/site.js`
- **Pages**: `src/index.11ty.jsx`, `src/work.11ty.jsx`,
  `src/about.11ty.jsx` (a resume in layout A: a sticky identity rail —
  headshot, name, role, location, contact links, in-page nav — beside a
  scrolling main column of Bio, Experience, Education, Skills, and a
  closing contact strip; on narrow viewports the rail stacks above the
  main column. There is no separate Contact page)
- **Shared components** (top navigation, footer, project media panel and
  full-width project feature): `src/_includes/components.jsx`. The frame is
  a TopNav over a wide (1200) content column; projects are presented as
  large full-width features with a 16:9 media panel, not a card grid.
- **Layouts**: `src/_includes/layouts/base.11ty.jsx`,
  `src/_includes/layouts/case-study.11ty.jsx`
- **Case studies**: add Markdown files in `src/projects/`, following
  [`docs/case-study-template.md`](docs/case-study-template.md) — the
  guidelines and fill-in template for case-study content. In short: tell a
  story with four elements only (problem, outcome, solution, prototype),
  keep the whole page near 200 words, and spend at most one sentence on
  process. Front matter:

  ```yaml
  ---
  title: Project title
  highlight: Product thinking & strategy
  problem: "The human problem, in one plain-language sentence."
  solution: "What you made, in two or three sentences."
  prototype: "What the prototype or live product shows."
  prototypeUrl: "https://example.com/prototype"
  outcome: "What changed for users or the business."
  process: "Your whole process, in one sentence."
  role: Your role
  timeline: "2024 · 6 months"
  team: Who you worked with
  order: 4
  tags: projects
  layout: layouts/case-study.11ty.jsx
  ---
  ```

- **Styles**: default Astryx Neutral theme only. No custom CSS.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site
and deploys `_site/` to GitHub Pages on every push to `main`. Enable Pages
in the repo settings (Source: GitHub Actions) and it will go live
automatically.
