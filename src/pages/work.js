import React, {useState, useCallback} from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import TableCard from "../components/tableCard";
import TagSelector from "../components/tagSelector";
import ParallelogramHeader from "../components/parallelogramHeader";

// Return structured content for table card
const firstColumn = (date) => <p className="subtitle is-6">{date || null}</p>;

const secondColumn = (title) => (
    <>               
      <p className="title is-4">{title || "New Blog Entry"} </p>
      <div className="card-footer p-2 has-text-centered is-align-self-center">
        Read More
      </div>
    </>
)

const Work = ({pageContext}) => {



  const {
    breadcrumb: { crumbs },
  } = pageContext

  const data = useStaticQuery(graphql`
  {

    about: markdownRemark(
          fields: { category: { eq: "about" } }
          fileAbsolutePath: { regex: "/about-short.md/" }
        ) {
          html
          frontmatter {
            title

            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 400)
              }
            }
          }
        }
    work: allMarkdownRemark(
    filter: {fields: {category: {eq: "work"}}}
    sort: {frontmatter: {date: DESC}}
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          tags
          date(formatString: "ddd DD MMM yy")
        }
        id
      }
    }

    allTags: allMarkdownRemark(
          limit: 2000
          filter: {fields: {category: {eq: "work"}}}
          ) {
          group(field: { frontmatter: { tags: SELECT }}) {
            fieldValue
            totalCount
          }
        }
  }
  `);

    const [filteredNodes, setFilteredNodes] = useState(data.work.nodes);

    const getFilteredNodes = useCallback((nodes) => {
      setFilteredNodes(nodes);
    }, [setFilteredNodes]);


    const works = (
    <div>
      <ParallelogramHeader
        text="Work"
        
        className="mb-0"
      />

      <TagSelector tags={data.allTags} nodes={data.work.nodes} data={data} callback={getFilteredNodes} />
      {/* <div className="lowerPadding"> </div> */}
      {filteredNodes.map((blogentry) => (
        <div
          className="card-image"
          key={blogentry.id}
        >
          <Link to={blogentry.fields.slug}>
            <TableCard
              first={blogentry.frontmatter.title}
              second={blogentry.frontmatter.date}
            />
          </Link>
        </div>
      )
      )}
    </div>

  )

  return (
    <Layout>
    {works}
    </Layout>
  );
};

export default Work;