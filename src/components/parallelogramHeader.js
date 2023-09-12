import React from "react";


const ParallelogramHeader = ({text,backgroundColor,textColor,className}) => {
    return (
      // <div className={`oval has-background-${backgroundColor} ${className}`}>
      <div>
        <h1 className={`is-size-2-desktop is-size-3-tablet is-size-4-mobile has-text-left has-text-weight-bold has-text-${textColor}`}>
          {text}
        </h1>
      </div>
    );
}

export default ParallelogramHeader;