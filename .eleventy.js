const { buildSync } = require("esbuild");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

module.exports = function (eleventyConfig) {
  // Register the custom JSX template format for file discovery.
  eleventyConfig.addTemplateFormats("11ty.jsx");

  // Astryx default styling: reset + component styles + stock neutral theme.
  // No custom CSS anywhere on this site.
  eleventyConfig.addPassthroughCopy({
    "node_modules/@astryxdesign/core/src/reset.css": "css/reset.css",
    "node_modules/@astryxdesign/core/dist/astryx.css": "css/astryx.css",
    "node_modules/@astryxdesign/theme-neutral/dist/theme.css": "css/theme.css",
    // Document base font (applies the theme's own --font-family-body token;
    // the stock theme never sets it on body itself).
    "src/css/base.css": "css/base.css",
  });

  // URL prefix for project-pages deploys (e.g. /portfolio-site/). Always
  // ends with a slash; "/" locally.
  eleventyConfig.addGlobalData("pathPrefix", () => {
    const p = process.env.ELEVENTY_PATH_PREFIX || "/";
    return p.endsWith("/") ? p : p + "/";
  });

  // Current year for the footer
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  // Projects collection, ordered by the `order` front matter field
  eleventyConfig.addCollection("projects", (collectionApi) =>
    collectionApi
      .getFilteredByTag("projects")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  // Render .11ty.jsx templates with React server-side rendering so pages
  // and layouts can be authored with Astryx components. The default export
  // of each module must be a function receiving 11ty's data cascade and
  // returning a React element. Local relative imports (e.g. shared
  // components) are bundled; node_modules stay external.
  eleventyConfig.addExtension("11ty.jsx", {
    compile: async function (inputContent, inputPath) {
      const cacheDir = path.join(
        __dirname,
        "node_modules",
        ".cache",
        "eleventy-jsx"
      );
      fs.mkdirSync(cacheDir, { recursive: true });
      const name = path
        .basename(inputPath, ".11ty.jsx")
        .replace(/[^a-zA-Z0-9_-]/g, "_");
      const srcFile = path.join(cacheDir, `${name}.src.jsx`);
      // Strip front matter defensively; 11ty may or may not have removed it
      // already for custom template formats.
      let source = inputContent;
      const fm = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
      if (fm) source = source.slice(fm[0].length);
      // Rewrite relative imports to absolute paths: the bundle entry is
      // written to a cache dir, so relative specifiers would resolve
      // against the wrong location.
      const srcDir = path.dirname(inputPath);
      source = source.replace(
        /(from\s+|import\s*\()\s*(['"])(\.\.?\/[^'"]*)\2/g,
        (m, kw, q, rel) => `${kw}${q}${path.resolve(srcDir, rel)}${q}`
      );
      fs.writeFileSync(srcFile, source);

      const result = buildSync({
        entryPoints: [srcFile],
        bundle: true,
        platform: "node",
        format: "esm",
        jsx: "automatic",
        write: false,
        absWorkingDir: __dirname,
        external: ["react", "react-dom", "react-dom/*", "@astryxdesign/*"],
      });
      const tmpFile = path.join(cacheDir, `${name}.mjs`);
      fs.writeFileSync(tmpFile, result.outputFiles[0].text);
      const mtimeMs = fs.statSync(tmpFile).mtimeMs;

      return async function (data) {
        // Cache-bust the ESM import so --serve picks up edits.
        const mod = await import(
          pathToFileURL(tmpFile).href + `?v=${mtimeMs}`
        );
        const { renderToStaticMarkup } = await import("react-dom/server");
        const html = renderToStaticMarkup(mod.default(data));
        return html.startsWith("<html") ? "<!DOCTYPE html>\n" + html : html;
      };
    },
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // Set ELEVENTY_PATH_PREFIX=/repo-name/ when deploying to a project
    // subpath (e.g. username.github.io/portfolio-site). Defaults to root.
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
  };
};
