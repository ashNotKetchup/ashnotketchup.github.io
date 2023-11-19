import React, { useState, useCallback } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ThemeList from "../components/themeList";
import TagSelector from "../components/tagSelector";
import { StaticImage } from "gatsby-plugin-image"


const Sound = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
  {
  sound: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(sound)/"  }}
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

  const theme = {name:"sound", data: data.sound.nodes}
  return (
    <Layout name="Index">
      <section>
        <ThemeList theme={theme.name} data={theme.data}></ThemeList>
        </section>
      </Layout>
  );
};

export default Sound


export const Head = () => <title>Sound</title>



