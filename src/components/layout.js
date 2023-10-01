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

// function topLeft(hasTopLeft){
//   if (hasTopLeft) {
//     return ;
//   }
//   return;

// }


const Layout = ({children, nameInNav, crumbs, name, hero}) => {

  
    const navBar = (
      <nav className="navbar is-background-color is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        <Link to="/">
            <p className="is-size-3 has-text-primary is-family-sans-serif">
            Ashley Noel-Hirst
            </p>
          </Link>
        </div>
        <div class="navbar-end">
            {navItems.map((item) => (
              <React.Fragment key={`navbar-unit-${item.name}`}>
                <Link className="my-auto mr-2 has-text-primary is-size-5" to={item.link}>
                  {item.name}
                </Link>
                {/* <span className="navitem-divider"></span> */}
              </React.Fragment>
            ))}
          </div>
      </nav>
    );

    return (
      <>
          {navBar}
          <main className="container mx-0 is-fullhd">
            {children}
          </main>
      </>
    );
}

export default Layout