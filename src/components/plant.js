import React, { useState } from 'react';

// interactive object displaying a digital garden object based on relevance/size
// hover for text preview in title

const plantArray = [".","🌱","🪴","🌲"];

function pickPlant(plantIndex){
    return plantArray[Math.floor(plantIndex)];
} 

const Plant = (props) => {
    const size = props.size;
    return (
        // Set Heading From Hover
        <span class="subtitle is-size-3 has-text-black" 
        onMouseEnter={() => 
            props.callback(props.obj.frontmatter.title)
            }
        onMouseLeave={() => 
            props.callback(props.initTitle)
            }>
        {/* Render Plant Sprite */}
        {pickPlant(size)}
        </span>
    );

}

export default Plant;