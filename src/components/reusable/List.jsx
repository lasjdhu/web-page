import React from "react";

function List({props}) {

	const listItems = props.map(value =>
	    <li key={value.id}>
	      {value.name}
	    </li>
  	);

	return (
		<ul className="list-disc list-inside bg-gray">
            {listItems}
        </ul>
	);
}

export default List;