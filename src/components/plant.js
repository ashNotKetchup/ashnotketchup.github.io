import React from "react";

// interactive object displaying a digital garden object based on relevance/size
// hover for text preview

const plantArray = [".","🌱","🪴","🌲"];

function pickPlant(plantIndex){
    return plantArray[Math.floor(plantIndex)];
} 

const Plant = (props) => {
    const size = props.size;

    return (
                <span class="subtitle is-size-7 has-text-black">{pickPlant(size)}</span> 
                // TODO: add title on hover/click

    );

}

export default Plant;