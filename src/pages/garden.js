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

    const [filteredNodes, setFilteredNodes] = useState(data.garden.nodes); //causes rerender when changed
    const getFilteredNodes = useCallback((nodes) => {
      setFilteredNodes(nodes);
    }, [setFilteredNodes]);

    const [titleText, setTitleText] = useState('initialise'); //causes rerender when changed

        
    const allPlants = (
      <div className="column is-4"> 
        {/* randomise filteredNodes order */}
        {filteredNodes.map((plantsentry) => (
          <Link to={plantsentry.fields.slug}>
            <Plant
            size={1.4}
            obj = {plantsentry}
            callback = {setTitleText}
            initTitle = "Gardeen"
            />
            </Link>
        )
        )}

      </div>

  )

  const garden =(
    <div className="is-garden">
    {/* <div className="columns is-multiline is-centre"> */}
      {/* <div className="column is-4"> */}
      {gardenTitle(titleText)}
      {/* </div> */}
      {/* <div className="column is-4"> */}
        
      {allPlants}
      {/* </div> */}
      <div className="is-centred"><TagSelector tags={data.allTags} nodes={data.garden.nodes} data={data} callback={getFilteredNodes} /></div>
      {/* {gardenLinks} */}
      </div>
)

  return (
    <Layout>
      <section>
        <div className="hero is-fullheight-with-navbar"> 
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