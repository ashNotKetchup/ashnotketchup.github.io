import React from "react";
import { graphql} from "gatsby";
import Layout from "../components/layout";

const WorkPost = ({ data, 
                    // pageContext 
                    }) => {
  // const {breadcrumb: { crumbs }} = pageContext
    const {markdownRemark} = data;
    const {frontmatter, 
      // fields, 
      html} = markdownRemark;

    return (
      <Layout>
            <h1 className="is-uppercase bigTitle smaller mb-5">{frontmatter.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: html }}
            >
            </div>
            <br/>
            <br/>
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