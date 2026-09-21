module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the output folder
  eleventyConfig.addPassthroughCopy("src/assets");

  // Current year for the footer: {% year %}
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  // Projects collection, ordered by the `order` front matter field
  eleventyConfig.addCollection("projects", (collectionApi) =>
    collectionApi
      .getFilteredByTag("projects")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // Set ELEVENTY_PATH_PREFIX=/repo-name/ when deploying to a project
    // subpath (e.g. username.github.io/portfolio). Defaults to root.
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
  };
};
