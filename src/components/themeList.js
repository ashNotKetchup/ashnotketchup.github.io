import React, { useState, useCallback } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "./layout";
import TableCard from "./tableCard";
import TagSelector from "./tagSelector";
import { StaticImage } from "gatsby-plugin-image"

const ThemeList = ({theme, link, data, pageContext }) => {
    return (
        <div className="blog mb-5">
          <Link to={link}>
            <h1 className="is-uppercase bigTitle">{theme}</h1>
            </Link>
          {data.map((blogentry) => 
            (
              <Link to={blogentry.fields.slug} key={blogentry.id} >
                <TableCard
                  title={blogentry.frontmatter.title}
                  date={blogentry.frontmatter.date}
                  image={blogentry.frontmatter.image}
                  alt = "my alt description"
                />
                </Link>
              )
            )
            }
          </div>
    );
}

export default ThemeList;