import React from 'react';

const Pokemon = (props) => {
	const click = () => {
		props.handleClick(props.id);
	};

	return (
		<div className="col-6 col-md-3 my-3">
			<div className="p-image-card" onClick={click}>
				<img className="p-image" src={props.sprite} alt="" />
			</div>
		</div>
	);
};

export default Pokemon;
