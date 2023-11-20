import React, { useState, useCallback } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ThemeList from "../components/themeList";
import TableCard from "../components/tableCard";
import TagSelector from "../components/tagSelector";
import { StaticImage } from "gatsby-plugin-image"


const IndexPage = ({ pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext

  // I want to query specific folders. 
  // Then loop through their subfolders looking for md and image files. 
  // Return the first of each.

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
        image {
          childImageSharp {
            gatsbyImageData(height: 200)
          }
          id
        }
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }

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
        image {
          childImageSharp {
            gatsbyImageData(height: 200)
          }
          id
        }
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }

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
        image {
          childImageSharp {
            gatsbyImageData(height: 200)
          }
          id
        }
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }
}
  `);


  const themes = [{"name": 'Sound',"data": data.sound.nodes, "link": "/sound"}, 
                  {"name": 'Design',"data": data.design.nodes, "link": "/design"}, 
                  {"name": 'Research',"data": data.research.nodes, "link": "/research"}]
  const works = (

    //loop through theme, give it a title and a list of things
    themes.map((theme)=> 
      (
        <ThemeList theme={theme.name} data={theme.data} link={theme.link}></ThemeList>
        )
      )  
    )

  return (
    <Layout name="Index" crumbs={crumbs}>
      <section>
        {works}
        </section>
      </Layout>
  );
};

export default IndexPage

export const Head = () => <title>Home Page</title>


