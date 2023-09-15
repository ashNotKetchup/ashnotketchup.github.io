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

    var plantActive=0;

    

    // return (
    //             <span class="subtitle is-size-7 has-text-black">{pickPlant(size)}</span> 
    //             // TODO: add title on hover/click

    // );

      const [isShown, setIsShown] = useState(false);
        // var myPlant;
        // var icon = ()
        // myPlant.preview = (


        // )
        return (
            <span class="subtitle is-size-7 has-text-black" 
            onMouseEnter={() => 
                props.callback(props.obj.frontmatter.title)
                }
                onMouseLeave={() => setIsShown(false)}>
                    {props.callback(props.initTitle)} 
            {isShown && (
                plantActive=1
            )}
            </span>
            // <p>.</p>
        );

}

export default Plant;