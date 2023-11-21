import React from "react"
import {Link} from "gatsby"
import "../style/bulmacustom.scss"
// import { Breadcrumb } from "gatsby-plugin-breadcrumb"

// const navItems = [
//     {name: "info", link: "/info"},
// ]
// const socialMediaItems = [
//   {
//     iconName: "fa-twitter",
//     link: "https://twitter.com/c4dm",
//   },
// ];

const Layout = ({children, nameInNav, crumbs, name, hero}) => {

  
    const navBar = (
      <nav className="column is-3 has-text-centered-desktop" role="navigation" aria-label="main navigation">
        <Link to="/" className="is-uppercase logo">
          Ashley Noel-Hirst
          </Link>
        
        {/* <div class="navbar-end">
            {navItems.map((item) => (
              <Link className="is-uppercase" to={item.link}> 
                {item.name}
                </Link>

            ))}
          </div> */}
      </nav>
    );

    return (
      <body className="columns is-desktop">
          {navBar}
          <main className="pageContent column is-6">
            {children}
            </main>
          </body>
    );
}

export default Layout