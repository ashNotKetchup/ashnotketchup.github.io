import React, { useState, useCallback } from "react";
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
            video
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
      <ParallelogramHeader
        text="(Brief) Bio"
        backgroundColor="primary"
        textColor="black"
        className="mb-6"
      />
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: data.about.html }}
        className="pt-6 pr-6 has-text-left has-text-black diff"
      >
        {/* <p>{data.about.html}</p> */}
      </div>
      <div className="has-text-left">
        <br></br>
        <Link to="/about">
          <p class="subtitle is-size-7 has-text-black diff">Read More</p>
        </Link>
      </div>
    </div>
    // <div className="column is-two-thirds-desktop is-full-tablet">
    //   <Video videoSrcURL={data.about.frontmatter.video} width={"90%"}/>
    //   </div> 
  );

  const works = (
    <div>
      <Link to="/work">
      <ParallelogramHeader
        text="Selected Works"
        backgroundColor="primary"
        textColor="black"
        className="mb-6"
      />
      </Link>
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

  const garden = (
    <div>
      <Link to="/garden">
      <ParallelogramHeader
        text="Garden"
        backgroundColor="primary"
        textColor="black"
        className="mb-6"
      />
      </Link>
      </div>
    // <p className="text has-text-right"></p>
  )

  return (
    <Layout name="Index" crumbs={crumbs}>
      <section>
        <div className="hero is-fullheight-with-navbar">
          {/* <img src={BG} className="background" /> */}
          <StaticImage
            className="background"
            src="../images/me-film.jpg"
          />
          <div className="columns is-multiline is-centre mt-auto">
            <div className="column is-5-desktop is-full-tablet mt-auto reverse-row-order" >
              <></>
              {works}
            </div>
            <div className="column is right is-6-desktop is-full-tablet mt-auto">
              {/* want to make this invert based on image underneath */}
              {bio}
            </div>
            {/* want to move this to bottom right */}
            <div className="column is-right is-1 is-full-tablet mt-auto has-text-right mx-0">
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


