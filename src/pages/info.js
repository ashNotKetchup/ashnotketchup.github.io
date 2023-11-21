import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../style/bulmacustom.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "../components/layout.js";

const InfoPage = ({pageContext}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const data = useStaticQuery(graphql`
      {
        about: markdownRemark(
          fields: { category: { eq: "about" } }
          fileAbsolutePath: { regex: "/about-long.md/" }
        ) {
          html
          frontmatter {
            title
          }
        }
      }
    `);

  return (
    <Layout name="about" crumbs={crumbs}>
      <h1 className="is-uppercase bigTitle">Info</h1>
        <div
          className="content mb-0"
          dangerouslySetInnerHTML={{ __html: data.about.html }}
        ></div>
    </Layout>
  );
}

export default InfoPage

export const Head = () => <title>Info</title>
