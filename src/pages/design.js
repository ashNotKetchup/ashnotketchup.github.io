import React, { useState, useCallback } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ThemeList from "../components/themeList";
import TagSelector from "../components/tagSelector";
import { StaticImage } from "gatsby-plugin-image"


const Design = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
  {
  design: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(design)/"  }}
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

  const theme = {name:"design", data: data.design.nodes}
  return (
    <Layout name="Index">
      <section>
        <ThemeList theme={theme.name} data={theme.data}></ThemeList>
        </section>
      </Layout>
  );
};

export default Design


export const Head = () => <title>Design</title>



