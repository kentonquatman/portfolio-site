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

- **Site details** (name, role, email, social links): edit `src/_data/site.js`
- **Pages**: `src/index.11ty.jsx`, `src/work.11ty.jsx`,
  `src/about.11ty.jsx`, `src/contact.11ty.jsx`
- **Shared components** (header, footer, project card):
  `src/_includes/components.jsx`
- **Layouts**: `src/_includes/layouts/base.11ty.jsx`,
  `src/_includes/layouts/case-study.11ty.jsx`
- **Case studies**: add Markdown files in `src/projects/` with this front matter:

  ```yaml
  ---
  title: Project title
  summary: One or two sentences about the project.
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
