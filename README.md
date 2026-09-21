# Portfolio

A simple UX design portfolio built with [11ty](https://www.11ty.dev/) and [Sass](https://sass-lang.com/).

## Getting started

```bash
npm install
```

## Local development

Run the dev server and the Sass watcher in two terminals:

```bash
npm start        # 11ty dev server with live reload
npm run watch:css  # rebuilds CSS on every Sass change
```

## Production build

```bash
npm run build
```

This compiles the site with 11ty and then compiles `src/scss/main.scss`
into `_site/css/main.css`.

## Making it yours

- **Site details** (name, role, email, social links): edit `src/_data/site.js`
- **Pages**: `src/index.njk`, `src/work.njk`, `src/about.njk`, `src/contact.njk`
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
  layout: layouts/case-study.njk
  ---
  ```

- **Styles**: everything lives in `src/scss/` — start with `_variables.scss`

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site
and deploys `_site/` to GitHub Pages on every push to `main`. Enable Pages
in the repo settings (Source: GitHub Actions) and it will go live
automatically.
