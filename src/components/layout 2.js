import React from "react"
import {Link} from "gatsby"
import "../style/bulmacustom.scss"
// import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const navItems = [
    {content:<>Home</>, 
      link: "/"},
]
const socialMediaItems = [
  {
    iconName: "fa-twitter",
    link: "https://twitter.com/c4dm",
  },
];

const Layout = ({children, nameInNav, crumbs, name, hero}) => {

  
    const navBar = (
      <nav className="navbar-start" role="navigation" aria-label="main navigation">
        <Link to="/garden" className="is-uppercase logo">
          Garden
          </Link>
        
        
      </nav>
    );

    const endBar = (
      <nav className="navbar-end" role="navigation">
            {navItems.map((item) => (
              <Link className="" to={item.link}> 
                {item.content}
                </Link>

            ))}
      
      </nav>
    );

    const svgFilters = 
      <svg className="SVGFilterStore">
          <defs >
            {/* make everything high contrast: */}
            <filter id="highContrastFilter">
              <feComponentTransfer>
                <feFuncA type="linear" slope="5" intercept="0"/>
                </feComponentTransfer>
              </filter>

            {/* make everything look like metal, should probs rename */}
            <filter id="liquidFilter" visibility="hidden">
              <feMorphology operator="dilate" radius="4" in="SourceAlpha" out="biggerAlpha"/>
              {/* <!--Create a heightmap by blurring the source: --> */}
              <feGaussianBlur stdDeviation="5" in="biggerAlpha" result="BLUR"/>

              {/* <!-- Define a lighting effect with a point light that is positioned at virtual 3D coordinates x: 40px, y: -30px, z: 200px: --> */}
              <feSpecularLighting surfaceScale="6" specularConstant="1" specularExponent="30" lighting-color="#white" in="BLUR" result="SPECULAR">
                  <fePointLight x="0" y="0" z="200" />
              </feSpecularLighting>

              {/* <!-- Cut off the parts that overlap the source graphic… --> */}
              <feComposite operator="in" in="SPECULAR" in2="SourceAlpha" result="COMPOSITE"/>

              {/* <!-- … and then merge source graphic and lighting effect: --> */}
              <feMerge>
                  <feMergeNode in="COMPOSITE"/>
              </feMerge>
              <feComposite operator="in" in="SourceGraphic" in2="COMPOSITE" result="out"/>
              </filter>
            </defs> 
          </svg>
    

    return(
      <body className="garden columns">
          {navBar}
          <main className="pageContent column is-6-desktop px-4">
            {children}
            </main>
            {endBar}
            {svgFilters}
          </body>
    );
}

export default Layout