import React, {useState, useCallback} from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import TableCard from "../components/tableCard";
import TagSelector from "../components/tagSelector";
import ParallelogramHeader from "../components/parallelogramHeader";
import { StaticImage } from "gatsby-plugin-image"

// export function background() {
//   return <StaticImage src="../images/are-bure.png" alt="A blurry photo of signs, shot in black and white" />
// }
import BG from "../images/are-bure.jpg"

// Return structured content for table card
const firstColumn = (title) => (
    <>               
      <p className="title is-4">{title || "New Blog Entry"} </p>
      {/* <div className="card-footer p-2 has-text-centered is-align-self-center">
      </div> */}
    </>
)

const secondColumn = (date) => <p className="subtitle is-6">{date || null}</p>;

const IndexPage = ({pageContext}) => {



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
            video
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 400)
              }
            }
          }
        }
    news: allMarkdownRemark(
    filter: {fields: {category: {eq: "news"}}}
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
          filter: {fields: {category: {eq: "news"}}}
          ) {
          group(field: { frontmatter: { tags: SELECT }}) {
            fieldValue
            totalCount
          }
        }
  }
  `);

    const [filteredNodes, setFilteredNodes] = useState(data.news.nodes);

    const getFilteredNodes = useCallback((nodes) => {
      setFilteredNodes(nodes);
    }, [setFilteredNodes]);


    const homeHero = (
          <div className="container">
            <div
              dangerouslySetInnerHTML={{ __html: data.about.html }}
              className="pt-6 pr-6 has-text-left has-text-black"
            >
              </div>
            <div className="has-text-left">
              <br></br>
              <Link to="/about">
              <p class="subtitle is-size-7 has-text-black">Read More</p>
              </Link>
              </div>
            </div>
            // <div className="column is-two-thirds-desktop is-full-tablet">
            //   <Video videoSrcURL={data.about.frontmatter.video} width={"90%"}/>
            //   </div> 
    );

    const works=(
      <div>
      <ParallelogramHeader
            text="Selected Works"
            backgroundColor="primary"
            textColor="Black"
            className="mb-6"
          />
          <TagSelector tags={data.allTags} nodes={data.news.nodes} data={data} callback={getFilteredNodes}/>
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
    <Layout name="Index" crumbs={crumbs}>
      <section>
      <div className="hero is-fullheight-with-navbar">
        {/* <img src={BG} className="background" /> */}
        <StaticImage
          className="background"
          src="../images/are-bure.jpg"
          // placeholder="blurred"
          // formats={["auto", "webp", "avif"]}
          // alt="A blurry image in black and white"
          // quality={90}
        />
      <div className="columns is-multiline is-centre mt-auto">
        <div className="column is-two-fifths-desktop is-full-tablet mt-auto reverse-row-order" >
          
          {works}
          </div> 
        <div className="column is right is-three-fifths-desktop is-full-tablet mt-auto">
          {homeHero}
        </div>
      </div>
      </div>
      
      </section>
      
    
    </Layout>
  );
};

export default IndexPage

export const Head = () => <title>Home Page</title>