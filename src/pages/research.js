import React, { useState, useCallback } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ThemeList from "../components/themeList";
import TagSelector from "../components/tagSelector";
import { StaticImage } from "gatsby-plugin-image"


const Research = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
  {
  research: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(research)/"  }}
    sort: {frontmatter: {date: DESC}}
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        image
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }


}
  `);

  const theme = {name:"research", data: data.research.nodes}
  return (
    <Layout name="Index">
      <section>
        <ThemeList theme={theme.name} data={theme.data}></ThemeList>
        </section>
      </Layout>
  );
};

export default Research


export const Head = () => <title>Research</title>



