import React, {useState, useCallback} from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import Plant from "../components/plant";
import TagSelector from "../components/tagSelector";
import ParallelogramHeader from "../components/parallelogramHeader";
import { StaticImage } from "gatsby-plugin-image"


function gardenTitle(title, subtitle){
  return (
    <div>
      <ParallelogramHeader
            text={title}
            backgroundColor="primary"
            textColor="black"
            className="mb-6"
          />
          <p> {subtitle} </p>
    </div>
    
  )
}


const Garden = () => {
  const title = "Welcome to my Digital Garden"
  const subtitle = "a space for cultivating ideas in public."


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

    function Test(e) {
    alert(e.id);
}

    const allPlants = (
      <div>
        {/* randomise filteredNodes order */}
        {filteredNodes.map((plantsentry) => (
        <span key={plantsentry.id} onmouseover="Test(this)">
          <Link to={plantsentry.fields.slug}>
            <Plant
            size={1.4}
            obj = {plantsentry}
            />
            </Link>
          </span>
        )
        )}

      </div>

  )


  const garden =(
    <div className="is-garden">
      {gardenTitle("Welcome to my Digital Garden","a space for cultivating ideas in public.")}
      {allPlants}
      <div className="is-centred"><TagSelector tags={data.allTags} nodes={data.garden.nodes} data={data} callback={getFilteredNodes} /></div>
      {/* {gardenLinks} */}
      </div>
)

const TitleNavigation = (

    <div className="columns is-multiline is-centre ">
      {/* <div className="column is-5-desktop is-full-tablet mt-auto reverse-row-order" >
        </div>
      <div className="column is-6-desktop is-full-tablet">
        </div> */}
      <div className="column is-right is-5 is-full-tablet mt-auto has-text-right mx-0">
        <ParallelogramHeader
          text="Garden"
          backgroundColor="primary"
          textColor="black"
          className="mb-6"
        />
        <TagSelector tags={data.allTags} nodes={data.garden.nodes} data={data} callback={getFilteredNodes} />
        </div>
      </div>
    

)


  return (
    <Layout>
      <section>
        <div className="hero is-fullheight-with-navbar">
        {/* {TitleNavigation} */}
        {/* <StaticImage
            className="garden-background"
            src="../images/plants.jpeg"
          /> */}
        {garden}
        </div> 
      </section>
    </Layout>
  );
};

export default Garden;