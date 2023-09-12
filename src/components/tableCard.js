import React from "react";

const TableCard = (props) => {
    // const length = Object.keys(props).length;
    return (
      <div className="container">
            <div className="columns is-multiline is-left">
              <div className="column is-one-third">
                <p class="subtitle is-size-7 has-text-black">{props.first}</p> 
                </div>
                {/* add conditional rendering for this second set */}
              {/* <div className="column is-two-thirds">
                <p class="subtitle is-size-7 has-text-black">{props.second}</p>
                </div> */}
            </div>  
          </div>
    );

}

export default TableCard;