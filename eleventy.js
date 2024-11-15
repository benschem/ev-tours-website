const fs = require("fs");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");

module.exports = function (eleventyConfig) {
  const cssSourceFileDirectory = "./src/assets/css/";
  const cssSourceFileName = "main.css";
  const cssSourceFilePath = cssSourceFileDirectory + cssSourceFileName;
  const cssOutputDirectory = "./public/assets/css/";
  const cssOutputFileName = "styles-minified.css";
  const cssOutputFilePath = cssOutputDirectory + cssOutputFileName;

  // PostCSS pre-processing
  eleventyConfig.on("eleventy.before", async () => {
    // Create the css output folder if it doesn't already exist
    if (!fs.existsSync(cssOutputDirectory)) {
      fs.mkdirSync(cssOutputDirectory, { recursive: true });
    }

    // Get the contents of the source file as a string
    const cssSourceFileContents = fs.readFileSync(cssSourceFilePath, "utf-8");

    // Process with postcss and plugins
    postcss([
      postcssImport, // Allows importing CSS Files
      autoprefixer, // Adds browser vendor-specific prefixes
      cssnano, // Minifies the CSS for production
    ])
      .process(cssSourceFileContents, { from: cssSourceFilePath, to: cssOutputFilePath })
      .then((result) => {
        fs.writeFile(cssOutputFilePath, result.css, (error) => {
          if (error) throw error;
        });

        // Write source map if it exists
        // Map allows the broswer to show the original preprocessed CSS in dev tools.
        if (result.map) {
          const mapFileName = "styles-min.css.map";
          const mapOutput = cssOutputDirectory + mapFileName;
          fs.writeFile(mapOutput, result.map.toString(), (error) => {
            if (error) throw err;
          });
        }
      })
      .catch((error) => {
        console.error("Error processing CSS with PostCSS:", error);
      });
  });

  // Watch the css for development
  eleventyConfig.addWatchTarget(cssSourceFileDirectory);

  eleventyConfig.addGlobalData("site", {
    env: process.env.CONTEXT || "development", // for site.env => process.env.CONTEXT comes from netlify
  });

  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/js");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "public",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
  };
};
