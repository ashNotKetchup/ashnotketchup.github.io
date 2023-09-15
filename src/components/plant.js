import React, { useState } from 'react';

// interactive object displaying a digital garden object based on relevance/size
// hover for text preview

const plantArray = [".","🌱","🪴","🌲"];

function pickPlant(plantIndex){
    return plantArray[Math.floor(plantIndex)];
} 

const Plant = (props) => {
    const size = props.size;
    const data = props.data;

    // return (
    //             <span class="subtitle is-size-7 has-text-black">{pickPlant(size)}</span> 
    //             // TODO: add title on hover/click

    // );

      const [isShown, setIsShown] = useState(false);

        return (
            <span class="subtitle is-size-7 has-text-black" onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>{pickPlant(size)} 
            {isShown && (
                <div>
                I'll appear when you hover over the button.
                </div>
            )}
            </span>
        );

}

export default Plant;