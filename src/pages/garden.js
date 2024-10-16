import React, {useState, useCallback} from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout 2";
import Plant from "../components/plant";
import TagSelector from "../components/tagSelector";


function gardenTitle(title, subtitle){
  return (
    <span>
      <h1 className="is-uppercase">{title}</h1>
      <p className="subtitle is-size-7"> {subtitle} </p>
      </span>
    
  )
}


const Garden = () => {
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
          subtitle
          tags
          date(formatString: "ddd DD MMM yy")
          icon
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

    const initiaTitle = "Cultivate a Digital Garden"

    const [titleText, setTitleText] = useState(initiaTitle); //causes rerender when changed
    const initiaSubtitle = "Cultivate ideas in public"
    const [subtitleText, setSubtitleText] = useState(initiaSubtitle); //causes rerender when changed

        
    const allPlants = (
      <span> 
        {/* randomise filteredNodes order */}
        {filteredNodes.map((plantsentry) => (
          <Link to={plantsentry.fields.slug}>
            <Plant
            size={1.4}
            obj = {plantsentry}
            callback = {{title: setTitleText, subtitle: setSubtitleText}}
            initTitle = {initiaTitle}
            subinitTitle = {initiaSubtitle}
            />
            </Link>
        )
        )}

      </span>

  )

  const garden =(
    // <div>
    <div className="garden"
    // className="columns is-multiline is-centered my-auto is-garden"
    >
      <div className="titles"
      // className="column is-12 has-text-centered mb-0"
      >
          {gardenTitle(titleText,subtitleText)}  
        </div>

        {/* <div className="column is-12 has-text-centered"> */}
          {/* <p className="subtitle mt-0 ">subtitle</p> */}
          {/* </div> */}

        <div className="allotment">
          {allPlants}
          </div>

      <div className="tags">
        <TagSelector tags={data.allTags} nodes={data.garden.nodes} data={data} callback={getFilteredNodes} centre={1} />
        </div>

      </div>
)

  return (
    <Layout>
      <section>
        <div> 
          {garden}
          </div> 
        </section>
       </Layout>
  );
};

export default Garden;