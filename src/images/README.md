# Project imagery

Drop each project's hero image here and reference it from the project's
front matter:

```yaml
image: images/banking-app.png
imageAlt: "Phone mockups of the redesigned transfers flow"
```

Files in this directory are copied to `/images/` at build time
(see `.eleventy.js`).

## Spec

- **Aspect ratio:** 16:9 — the media panel is a 16:9 frame on every page.
- **Size:** 2400×1350 (2× the 1200px content width). 1920×1080 minimum.
- **Format:** PNG for UI mockups, JPG for photography.
- **Naming:** `<project-slug>.png`, matching the file in `src/projects/`.

The panel uses the frame's `fit="cover"`, so a source that isn't exactly
16:9 is cropped, never stretched. Until `image` is set, the page shows
the coloured placeholder panel.
