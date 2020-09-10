import React, { useState, useEffect } from "react";
import GameInfo from "./GameInfo";
import PokemonArea from "./PokemonArea";

const Game = () => {
  const [score, setScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  // const [gameState, setGameState] = useState(0);

  useEffect(() => {
    getPokemon();
  }, [score]);

  const getPokemon = async () => {
    const Pokedex = require("pokeapi-js-wrapper");
    const P = new Pokedex.Pokedex();
    const pokeNumArr = randNumGen();
    const pokeArr = [];
    for (let num of pokeNumArr) {
      const pokemonData = await P.resource(`/api/v2/pokemon/${num}/`);
      pokeArr.push(pokemonData);
    }

    setPokemon(pokeArr);
    // select a random pokemon from the 4 obtained
    setSelectedPokemon(pokeArr[Math.floor(Math.random() * 4)]);
  };

  const randNumGen = () => {
    const nums = [];
    while (nums.length < 4) {
      let currNum = Math.ceil(Math.random() * 151);
      // if the number is not already in the array
      if (!nums.includes(currNum)) {
        nums.push(currNum);
      }
    }
    return nums;
  };

  const handleClick = e => {
    if (e.target.firstChild.src === selectedPokemon.sprites.front_default) {
      // show correct
      setScore(score + 1);
      setPokemon([]);
      setSelectedPokemon({});
    } else {
      // show incorrect 
    }
  };

  return (
    <div className="container">
      <GameInfo score={score} />
      <PokemonArea
        pokemon={pokemon}
        selected={selectedPokemon}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Game;