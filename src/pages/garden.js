import React, {useState, useCallback} from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import Plant from "../components/plant";
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

const Garden = ({pageContext}) => {



  const {
    breadcrumb: { crumbs },
  } = pageContext

  const data = useStaticQuery(graphql`
  {
    garden: allMarkdownRemark(
    filter: {fields: {category: {eq: "garden"}}}
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
          filter: {fields: {category: {eq: "garden"}}}
          ) {
          group(field: { frontmatter: { tags: SELECT }}) {
            fieldValue
            totalCount
          }
        }
  }
  `);

    const [filteredNodes, setFilteredNodes] = useState(data.garden.nodes);

    const getFilteredNodes = useCallback((nodes) => {
      setFilteredNodes(nodes);
    }, [setFilteredNodes]);


    const works = (
    <div>
      <ParallelogramHeader
        text="Garden"
        backgroundColor="primary"
        textColor="black"
        className="mb-6"
      />

      <TagSelector tags={data.allTags} nodes={data.garden.nodes} data={data} callback={getFilteredNodes} />
      {/* <div className="lowerPadding"> </div> */}
      {filteredNodes.map((blogentry) => (
        <div
          className="card-image"
          key={blogentry.id}
        >
          <Link to={blogentry.fields.slug}>
            <Plant
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

export default Garden;