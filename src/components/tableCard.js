import React from "react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";

const TableCard = (props) => {
    // const textSize = props.textSize;
    const image = getImage(props.image)

    return (
        <span>
            {/* <figure className="image"> */}
                {image ? 
                    (<GatsbyImage 
                        className="listImage"
                        alt="replace with description" 
                        image={image} />) 
                    : 
                    (<StaticImage
                        className="background"
                        src="../images/me-film.jpg"
                        />)
                    }
                {/* </figure> */}
            {props.title}
            </span> 
        );
}

export default TableCard;