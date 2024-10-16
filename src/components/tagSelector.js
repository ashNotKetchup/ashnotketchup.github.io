import React, {useState, useEffect, useMemo} from "react";
import {startCase, camelCase} from 'lodash';

const filterData = (nodes, filter) => nodes.filter((node) => !filter ? true : node.frontmatter?.tags?.includes(filter) || node.frontmatter?.role?.includes(filter) || node.year?.includes(filter));

// passing arguments to the class tag doesnt work for some reason, 
// so I'm makinig my own attribute, passing centre? boolean. If true then its centred, otherwise it is left
const TagSelector = ({tags,nodes,callback,centre, initialState=false}) => {
    const [selected, setSelected] = useState(initialState);

    const memoFilter = useMemo(() => filterData(nodes,selected), [nodes,selected])

    useEffect(() => {callback(memoFilter)}, [selected,filterData,memoFilter])

    const createButtons = <>
        {tags.group.map((tag) => (
            <button className="button is-responsive"
            key={tag.fieldValue} 
            onClick={() => setSelected(tag.fieldValue)} 
            disabled={selected === tag.fieldValue}>
                {startCase(camelCase(tag.fieldValue))} ({tag.totalCount})
                </button>
                ))}

            <button  className="button is-responsive" 
                onClick={() => setSelected(false)}
                disabled={!selected}
                >
                Clear Tags (x)
                </button>

    </>


    const buttonList = {}
    buttonList.left = (<div class={`buttons is-left mb-0`}>
        {createButtons}
        </div>)
    buttonList.centre = (
        // <div class="tags buttons is-centered mb-0">
        <>
            {createButtons}
        </>
    )

    if(centre){
        return (
            buttonList.centre
             );
        }

    else{
        return (
            buttonList.left
        
            );
        }
    
};

export default TagSelector;

// data - the data from a graphql query
// filterTemplate – the slug for the filtered template page
// root - the slug for the unfiltered page (accessed when we clear it)