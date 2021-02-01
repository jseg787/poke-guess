import React, { useState, useEffect } from 'react';
import GameInfo from './GameInfo';
import PokemonArea from './PokemonArea';

const Game = () => {
	const [ score, setScore ] = useState(0);
	const [ pokemon, setPokemon ] = useState([]);
	const [ selectedPokemon, setSelectedPokemon ] = useState({});
	const [ gameOver, setGameOver ] = useState(false);

	useEffect(
		() => {
			getPokemon();
		},
		[ score ]
	);

	const getPokemon = async () => {
		const Pokedex = require('pokeapi-js-wrapper');
		const P = new Pokedex.Pokedex();
		const pokeNumArr = randNumGen();
		const pokeArr = [];
		for (let num of pokeNumArr) {
			const pokemonData = await P.resource(`/api/v2/pokemon/${num}/`);
			pokeArr.push(pokemonData);
		}

		setPokemon(pokeArr);
		if (gameOver) {
			setGameOver(false);
		}
		// select a random pokemon from the 4 obtained
		setSelectedPokemon(pokeArr[Math.floor(Math.random() * 4)]);
	};

	/**
   * Generates an array of length amount of unique random numbers
   * @param {Number} [amount=4] - the length of the array to be returned
   * @return {Number[]} the array of unique random numbers
   */

	const randNumGen = (amount = 4) => {
		const nums = [];
		while (nums.length < amount) {
			let currNum = Math.ceil(Math.random() * 151);
			// if the number is not already in the array
			if (!nums.includes(currNum)) {
				nums.push(currNum);
			}
		}
		return nums;
	};

	const handleClick = (id) => {
		if (selectedPokemon.id === id) {
			// show correct
			setScore(score + 1);
			setPokemon([]);
			setSelectedPokemon({});
		} else {
			setScore(0);
			setGameOver(true);
		}
	};

	return (
		<div className="container">
			<GameInfo score={score} />
			<PokemonArea pokemon={pokemon} selected={selectedPokemon} handleClick={handleClick} />
		</div>
	);
};

export default Game;
