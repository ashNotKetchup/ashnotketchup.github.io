import React from "react";
import {Link} from "gatsby";
import ListItem from "./listItem";

const ThemeList = ({theme, link, data}) => {
    return (
        <div className="blog mb-5">
          <Link to={link}>
            <h1 className="is-uppercase bigTitle">{theme}</h1>
            </Link>
          {data.map((blogentry) => 
            (
              <Link to={blogentry.fields.slug} key={blogentry.id} >
                <ListItem
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