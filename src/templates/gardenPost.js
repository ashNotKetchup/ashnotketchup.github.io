import React from "react";
import { graphql} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout 2";

const GardenPost = ({ data }) => {

    const {markdownRemark} = data;
    const {frontmatter, fields, html} = markdownRemark;

    return (
      <Layout name="Blog">

          <div className="titles">
            <h1 className="is-uppercase">{frontmatter.title}</h1>
            <p className="subtitle is-size-7"> {frontmatter.subtitle} </p>
            <p className="subtitle is-size-7"> {frontmatter.date} </p>
            </div>


          <div className="container post">
            {/* <div className="titles">  */}
            {/* <h1>{frontmatter.title}</h1>
            <h2>
              {frontmatter.date}
            </h2>  */}
            {/* </div> */}
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
      </Layout>
    );
}

export default GardenPost;

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