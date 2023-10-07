import React, { useState, useCallback } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import TableCard from "../components/tableCard";
import TagSelector from "../components/tagSelector";
// import ParallelogramHeader from "../components/parallelogramHeader";
import { StaticImage } from "gatsby-plugin-image"


// Return structured content for table card
// const firstColumn = (title) => (
//   <>
//     <p className="title is-4">{title || "New Blog Entry"} </p>
//     {/* <div className="card-footer p-2 has-text-centered is-align-self-center">
//       </div> */}
//   </>
// )

// const secondColumn = (date) => <p className="subtitle is-6">{date || null}</p>;

const IndexPage = ({ pageContext }) => {



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


  const bio = (
    <div className="container diff">
      
      <Link to="/about">
        {/* <Link to="/about"> */}
      {/* <ParallelogramHeader
        text="Me"
        className="mb-0"
      /> */}
      {/* </Link> */}
      <div
        dangerouslySetInnerHTML={{ __html: data.about.html }}
        className="is-size-1 is-bold pt-6 pr-6 has-text-left diff mb-0 mt-0"
      >
        {/* <p>{data.about.html}</p> */}
      </div>
      {/* <div className="has-text-left"> */}
        {/* <br></br> */}


        {/* Add some mouseover thing which says read more when hover  */}
          {/* <p class="subtitle is-size-7 diff">Read More</p> */}
        
      {/* </div> */}
      </Link>
    </div>
    // <div className="column is-two-thirds-desktop is-full-tablet">
    //   <Video videoSrcURL={data.about.frontmatter.video} width={"90%"}/>
    //   </div> 
  );

  const works = (
    <div>
      {/* <Link to="/work">
      <ParallelogramHeader
        text="Work"
        className="mb-0"
      />
      </Link> */}
      
      {/* <div className="lowerPadding"> </div> */}
      {filteredNodes.map((blogentry) => (
        <div
          className="card-image is-size-2"
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
       <TagSelector tags={data.allTags} nodes={data.work.nodes} data={data} callback={getFilteredNodes} initialState="selected" />
    </div>

  )

  const garden = (
    <div>
      <Link to="/garden" className="mb-0 is-size-1 has-text-right-desktop">
        Garden
      {/* <ParallelogramHeader
        text="Garden"
        
        className="mb-0 is-size-1 is-size-1"
      /> */}
      </Link>
      </div>
    // <p className="text has-text-right"></p>
  )

  return (
    <Layout name="Index" crumbs={crumbs}>
      <section>
        <div className="hero is-fullheight-with-navbar">
          <StaticImage
            className="background"
            src="../images/me-film.jpg"
          />
          {/* todo: Make it so that scrolls page through each of these on mobile.
          On desktop make them fill their thirds */}
          <div className="columns is-multiline is-centre mt-auto">
            <div className="column is-4-desktop is-full-tablet mt-auto">
              {bio}
            </div>
            <div className="column is-1-desktop is-full-tablet mt-auto"></div>
            <div className="column is-5-desktop is-full-tablet mt-auto" >
              <></>
              {works}
            </div>
            <div className="column is-2-desktop is-full-tablet mt-auto has-text-right-desktop">
              {garden}
            </div>
          </div>
        </div>

      </section>


    </Layout>
  );
};

export default IndexPage

export const Head = () => <title>Home Page</title>


