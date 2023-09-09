import React from 'react';

function List({ props }) {
	const listItems = props.map((value) => (
		<li className="text-light py-2" key={value.id}>
			{value.name}
		</li>
	));

	return (
		<ul className="list-inside lg:mb-0 mb-16">{listItems}</ul>
	);
}

export default List;
