import React from 'react';
import PokemonName from './PokemonName';
import PokeballSpinner from './PokeballSpinner';
import Pokemon from './Pokemon';

const PokemonArea = (props) => {
	const pokemon = props.pokemon.map((poke) => {
		return (
			<Pokemon key={poke.id} id={poke.id} sprite={poke.sprites.front_default} handleClick={props.handleClick} />
		);
	});

	let result = '';

	if (pokemon.length === 0) {
		result = <PokeballSpinner />;
	} else {
		result = (
			<div>
				<PokemonName selected={props.selected} />
				<div className="row">{pokemon}</div>
			</div>
		);
	}

	return result;
};

export default PokemonArea;
