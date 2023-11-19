import React from "react";
import { graphql} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const WorkPost = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const {markdownRemark} = data;
    const {frontmatter, fields, html} = markdownRemark;

    return (
      <Layout name="Blog" crumbs={crumbs}>
            <h1 className="is-uppercase bigTitle smaller">{frontmatter.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
      </Layout>
    );
}

export default WorkPost;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd, D MMMM yyyy")
        author
        
      }
    }
  }
`;