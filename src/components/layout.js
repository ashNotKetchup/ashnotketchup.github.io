import React, {useState} from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import {Link} from "gatsby"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import {startCase, camelCase} from 'lodash';

const navItems = [
    {name: "+", link: "/about"},
]

const socialMediaItems = [
  {
    iconName: "fa-twitter",
    link: "https://twitter.com/c4dm",
  },
];


const Layout = ({children, nameInNav, crumbs, name, hero}) => {

  
    const navBar = (
      <nav className="column is-3 has-text-centered-desktop" role="navigation" aria-label="main navigation">
        <Link to="/" className="is-uppercase logo">
            Ashley Noel-Hirst
            {/* move this a lil left */}
          </Link>
          {/* </div> */}

        {/* <div class="navbar-end"> */}
            {/* {navItems.map((item) => ( */}
              {/* // <React.Fragment key={`navbar-unit-${item.name}`}> */}
              {/* //   <Link className="my-auto mr-2 has-text-primary is-size-5" to={item.link}> */}
              {/* //     {item.name} */}
              {/* //   </Link> */}
              {/* <span className="navitem-divider"></span> */}
              {/* // </React.Fragment> */}
            {/* // ))} */}
          {/* </div> */}
      </nav>
    );

    return (
      <>
      <body className="columns is-desktop">
          {navBar}
          <main className="pageContent column is-6">
            {/* need a negative margin by like 3% */}
            {children}
          </main>
          </body>
      </>
    );
}

export default Layout