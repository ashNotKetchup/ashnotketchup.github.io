import React, {useState, useCallback} from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import Plant from "../components/plant";
import TagSelector from "../components/tagSelector";
import ParallelogramHeader from "../components/parallelogramHeader";


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


    const garden = (
      <div>
        {/* randomise filteredNodes order */}
        {filteredNodes.map((plantsentry) => (
        <span key={plantsentry.id}>
          <Link to={plantsentry.fields.slug}>
            <Plant
            size={1.4}
            />
            </Link>
          </span>
        )
        )}
      </div>

  )

  return (
    <Layout>
      <section>
        <div className="hero is-fullheight-with-navbar">
          <div className="columns is-multiline is-centre mt-auto">
            <div className="column is-5-desktop is-full-tablet mt-auto reverse-row-order" >
            </div>
            <div className="column is right is-6-desktop is-full-tablet mt-auto">
              {garden}
            </div>
            <div className="column is-right is-1 is-full-tablet mt-auto has-text-right mx-0">
              <ParallelogramHeader
        text="Garden"
        backgroundColor="primary"
        textColor="black"
        className="mb-6"
      />

      <TagSelector tags={data.allTags} nodes={data.garden.nodes} data={data} callback={getFilteredNodes} />
            </div>
          </div>
        </div>

      </section>
    {/* {garden} */}
    </Layout>
  );
};

export default Garden;