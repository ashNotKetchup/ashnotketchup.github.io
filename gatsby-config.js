/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  flags: {
    DEV_SSR: false // disable SSR during development to avoid chunking issues
  },
  siteMetadata: {
    title: `Ashley Noel-Hirst`,
    siteUrl: `https://www.noelhirst.net`,
  },
  plugins: [
    "gatsby-plugin-styled-components", // CSS-in-JS support
    "gatsby-plugin-image",             // Gatsby Image support
    {
      resolve: "gatsby-plugin-manifest", // favicon / manifest
      options: {
        icon: "src/images/icon.jpg",
      },
    },
    // "gatsby-plugin-mdx",                // MDX support
    "gatsby-plugin-sharp",              // image processing
    "gatsby-transformer-sharp",         // image processing
    {
      resolve: "gatsby-source-filesystem", // images folder
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem", // pages folder
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`, // content folder for Markdown
      options: {
        name: `content`,
        path: "./src/content",
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`, // breadcrumb navigation
      options: {
        useAutoGen: true, // auto-generate breadcrumbs from paths
      },
    },
    {
      resolve: `gatsby-transformer-remark`, // transform Markdown to HTML
      options: {
        plugins: [
          // `gatsby-remark-relative-images`, // commented out; optional
          {
            resolve: `gatsby-remark-images`, // automatically process images in Markdown
            options: {
              maxWidth: 800,            // max display width
              linkImagesToOriginal: true,
              sizeByPixelDensity: true,
              showCaptions: false,
            },
          },
          `gatsby-remark-autolink-headers`,  // adds links to headers automatically
          `gatsby-remark-responsive-iframe`, // make iframes responsive
        ],
      },
    },
    // these are top-level plugins, unrelated to Remark
    `gatsby-plugin-catch-links`,           // intercepts local links in Markdown
    "gatsby-plugin-sass",                  // SASS/SCSS support
    "gatsby-plugin-twitter",               // Twitter embeds
    // 'gatsby-transformer-bibtex',        // optional BibTeX support
  ],
};