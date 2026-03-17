import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ThemeList from "../components/themeList";


const Reviews = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
  {
  reviews: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(reviews\/)/"  }}
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
            gatsbyImageData(
              height: 35
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              )
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

  const theme = {name:"reviews", data: data.reviews.nodes}
  return (
    <Layout name="Index">
      <section>
        <ThemeList theme={theme.name} data={theme.data}></ThemeList>
        </section>
      </Layout>
  );
};

export default Reviews


export const Head = () => <title>Reviews</title>



