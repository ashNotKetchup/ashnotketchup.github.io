import React, {useState, useCallback} from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import TableCard from "../components/tableCard";
import TagSelector from "../components/tagSelector";
import ParallelogramHeader from "../components/parallelogramHeader";

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


    // const homeHero = (
    //   // <section className="hero is-fullheight-with-navbar">
    //     // <div className="hero-body has-text-left has-background-primary">
    //     //   <div className="container">
    //     //     {/* <div className="columns is-multiline is-left"> */}
    //     //       {/* <div className="column is-one-third-desktop is-full-tablet"> */}
    //     //         <Link to="/about">
    //     //           <div
    //     //             dangerouslySetInnerHTML={{ __html: data.about.html }}
    //     //             className="pt-6 pr-6 is-size-4-desktop is-size-5-mobile has-text-left has-text-black"
    //     //           ></div>
    //     //           <div className="has-text-left">
    //     //             <br></br>
    //     //             <p class="subtitle is-size-7 has-text-black">Read More</p>
    //     //           </div>
    //     //         </Link>
    //     //       {/* </div> */}
    //     //       {/* <div className="column is-two-thirds-desktop is-full-tablet">
    //     //         <Video videoSrcURL={data.about.frontmatter.video} width={"90%"}/>
    //     //       </div> */}
    //     //     {/* </div> */}
    //     //   </div>
    //     // // </div>
    //   // </section>
    // );

  return (
    <Layout name="Index" crumbs={crumbs}>
      <section className="section">
        <ParallelogramHeader
          text="Selected Works"
          backgroundColor="primary"
          textColor="Black"
          className="mb-6"
        />
        <TagSelector tags={data.allTags} nodes={data.news.nodes} data={data} callback={getFilteredNodes}/>

        <div className="lowerPadding"> </div>

        {filteredNodes.map((blogentry) => (
              <div
                className="card-image row card-image row is-full"
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
      </section>
    </Layout>
  );
};

export default IndexPage

export const Head = () => <title>Home Page</title>