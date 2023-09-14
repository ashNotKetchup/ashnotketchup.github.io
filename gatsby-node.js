const { graphql } = require("gatsby");
const path = require("path");
const _ = require("lodash")


exports.onCreateNode = async ({ node, actions }) => {
    const { createNodeField } = actions


    // Add a category field to all MarkdownRemark nodes
    const contentDir = path.resolve("./src/content");

    if (node.internal.type === "MarkdownRemark") {
        const category = path.dirname(
            path.relative(contentDir, node.fileAbsolutePath)
        )
    const fields = {
      category: category,
      slug:
        "/" +
        category +
        "/" +
        path.basename(node.fileAbsolutePath, ".md").replace("_", "-"),
    };

        for (const [name, value] of Object.entries(fields)) {
          createNodeField({ node, name, value });
        }
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const workPostTemplate = path.resolve("./src/templates/workPost.js");
    const gardenPostTemplate = path.resolve("./src/templates/gardenPost.js");

    const result = await graphql(`
        {
            work: allMarkdownRemark ( filter: {fields: {category: {eq: "work"}}})
            {   
                nodes {
                    fields {
                        slug
                    }
                }
            }

            garden: allMarkdownRemark ( filter: {fields: {category: {eq: "garden"}}})
            {
                nodes {
                    fields {
                        slug
                    }
                }
            }

            people: allMarkdownRemark ( filter: {fields: {category: {eq: "people"}}})
            {   
                nodes {
                    fields {
                        slug
                    }
                }
            }

        }
    `);


    // Create work pages 
    result.data.work.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: workPostTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })


    // Create garden pages
    result.data.garden.nodes.forEach((node) => {
        createPage({
        path: node.fields.slug,
        component: gardenPostTemplate,
        context: {
            slug: node.fields.slug,
        },
        });
    });

}

