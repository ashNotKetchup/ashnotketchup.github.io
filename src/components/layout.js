import React from "react"
import {Link} from "gatsby"
import "../style/bulmacustom.scss"
// import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const navItems = [
    {content:<code>Artist, Designer, and PhD Researcher in Artificial Intelligence and Music</code>, 
      link: "/info"},
]
const socialMediaItems = [
  {
    iconName: "fa-twitter",
    link: "https://twitter.com/c4dm",
  },
];

const Layout = ({children, nameInNav, crumbs, name, hero}) => {

  
    const navBar = (
      <nav className="column is-2-desktop has-text-left-desktop" role="navigation" aria-label="main navigation">
        <Link to="/" className="is-uppercase logo">
          Ashley Noel-Hirst
          </Link>
        
        <div class="navbar-end">
            {navItems.map((item) => (
              <Link className="" to={item.link}> 
                {item.content}
                </Link>

            ))}
          </div>
      </nav>
    );

    const endBar = (
      <nav className="column is-2-desktop has-text-left-desktop" role="navigation">
      </nav>
    );

    return (
      <body className="columns is-0 is-centered is-desktop mx-1 my-1">
          {navBar}
          <main className="pageContent column is-6">
            {children}
            </main>
            {endBar}
          </body>
    );
}

export default Layout