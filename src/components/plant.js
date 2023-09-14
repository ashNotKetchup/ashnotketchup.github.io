import React from "react";


// interactive object displaying a digital garden object based on relevance/size
// hover for text preview

function pickPlant(size){
    // return the right avatar for the right size
    switch (Math.floor(size)){
        case 0:
            return(
            <p class="subtitle is-size-7 has-text-black">smol</p> 
            )
        case 1:
            return(
            <p class="subtitle is-size-7 has-text-black">mediom</p> 
            )
        case 2:
            return(
            <p class="subtitle is-size-7 has-text-black">big</p> 
            )
        case 3:
            return(
            <p class="subtitle is-size-7 has-text-black">epic</p> 
            )
            case 4:
            return(
            <p class="subtitle is-size-7 has-text-black">huge</p> 
            )
    }
}


const Plant = (props) => {
    const size = props.size;

    // const length = Object.keys(props).length;
    return (
                <p class="subtitle is-size-7 has-text-black">{props.first}</p> 

    );

}

export default Plant;