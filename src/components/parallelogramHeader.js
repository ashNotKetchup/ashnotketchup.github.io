import React from "react";


const ParallelogramHeader = ({text,backgroundColor,textColor,className, alignment}) => {
    return (
      // <div className={`oval has-background-${backgroundColor} ${className}`}>
        <h1 className={`is-size-2-desktop is-size-3-tablet mb-0 is-size-4-mobile has-text-${alignment} has-text-${textColor}`}>
          {text}
        </h1>
    );
}

export default ParallelogramHeader;