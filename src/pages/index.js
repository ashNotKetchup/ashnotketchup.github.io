import React, { useState, useCallback } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import TableCard from "../components/tableCard";
import TagSelector from "../components/tagSelector";
// import ParallelogramHeader from "../components/parallelogramHeader";
import { StaticImage } from "gatsby-plugin-image"
// import { groupBy} from 'lodash';


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


  // I want to query specific folders. 
  // Then loop through their subfolders looking for md and image files. 
  // Return the first of each.

  const data = useStaticQuery(graphql`
  {
  sound: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(sound)/"  }}
    sort: {frontmatter: {date: DESC}}
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        image
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }

  design: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(design)/"  }}
    sort: {frontmatter: {date: DESC}}
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        image
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }

  research: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(research)/"  }}
    sort: {frontmatter: {date: DESC}}
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        image
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }
}
  `);


  const themes = [{"name": 'Sound',"data": data.sound.nodes}, , {"name": 'Design',"data": data.design.nodes}, {"name": 'Research',"data": data.research.nodes}]

  // const bio = (
  //   <div className="container diff">
      
  //     <Link to="/about">
  //     <div
  //       dangerouslySetInnerHTML={{ __html: data.about.html }}
  //       className="is-size-1 is-bold pt-6 pr-6 has-text-left diff mb-0 mt-0"
  //     >

  //     </div>
  //     </Link>
  //   </div>

  // );

  const works = (

    //loop through theme, then loop through each entry in theme
    themes.map((theme)=> 
      (
        <div className="blog mb-5">
          <Link to="/work">
            <h1 className="is-uppercase bigTitle">{theme.name}</h1>
            </Link>
        
        {/* <div className="negativePadding"> </div> */}
          {theme.data.map((blogentry) => 
            (
              <Link to={blogentry.fields.slug} key={blogentry.id} className="listedEntry">
                {/* Later, would be cool to add some small images next to each title, square thumbnails same height as text */}
                <TableCard
                  first={blogentry.frontmatter.title}
                  second={blogentry.frontmatter.date}
                />
                {/* {blogentry.frontmatter.title} */}
                </Link>
              )
            )
            }
          </div>
        )
      )  
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
        {/* <div className="hero is-fullheight-with-navbar"> */}
          {/* <StaticImage
            className="background"
            src="../images/me-film.jpg"
          /> */}
            {works}
        {/* </div> */}
      </section>
    </Layout>
  );
};

export default IndexPage

export const Head = () => <title>Home Page</title>


