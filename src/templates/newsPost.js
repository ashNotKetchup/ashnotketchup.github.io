import React from "react";
import { graphql} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const NewsPost = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const {markdownRemark} = data;
    const {frontmatter, fields, html} = markdownRemark;

    return (
      <Layout name="Blog" crumbs={crumbs}>
          <div className="container">
            <GatsbyImage
              alt="Blogpost header image"
              image={frontmatter.image.childImageSharp.gatsbyImageData}
            />
          </div>
          <div className="container">
            <h1 className="title">{frontmatter.title}</h1>
            <h2 className="subtitle">
              by {frontmatter.author} &mdash; {frontmatter.date}
            </h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
      </Layout>
    );
}

export default NewsPost;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd, D MMMM yyyy")
        author
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;