const fs = require("fs");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");

const { compress } = require("eleventy-plugin-compress");
const htmlmin = require("html-minifier");
const path = require("path");

const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("toUppercase", function (string) {
    try {
      return string.toUpperCase();
    } catch (error) {
      console.error(error);
    }
  });

  // CSS Pipeline
  // ||- Bundling
  // ||- Prefixing
  // ||- Minification

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

  // Sets global data site.env
  // - used in robots.txt so search engines
  //   don't crawl the demo site
  eleventyConfig.addGlobalData("site", {
    // process.env.CONTEXT comes from Netlify,
    // if it's not there - you're in development.
    env: process.env.CONTEXT || "development",
  });

  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/_headers");
  eleventyConfig.addPassthroughCopy("./src/_redirects");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Images
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "jpeg"],

    // Specify the widths for the output images
    widths: [80, 150, 300, 600, "auto"],

    // For the <img> tag
    defaultAttributes: {
      sizes: "auto",
      loading: "lazy",
      decoding: "async",
    },

    filenameFormat: function (id, src, width, format) {
      let filename = path.basename(src, path.extname(src));
      return `${filename}-${width}.${format}`;
    },

    outputDir: "public/assets/img/",
  });

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });
  eleventyConfig.addPlugin(compress, {
    enabled: true,
    algorithm: "brotli",
  });

  return {
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
    dir: {
      input: "src",
      output: "public",
      data: "_data",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
  };
};
