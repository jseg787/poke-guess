import React, { useState, useEffect } from "react";
import pokeballicon from "./pokeball-icon.svg";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Game />
    </div>
  );
};

const Header = () => {
  return (
    <header className="text-center">
      <h1>Pokemon Guesser</h1>
    </header>
  );
};

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
      console.log("correct");
      // this.setState({ score: this.state.score + 1 });
      setScore(score + 1);
    } else {
      console.log("incorrect");
    }
    // setTimeout(this.getPokemon, 100);
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

const PokemonArea = props => {
  const pokemon = props.pokemon.map(poke => {
    return (
      <div className="col-6 col-md-3 my-3">
        <div
          className="p-image-card"
          key={`pokemon-${poke.id}`}
          onClick={props.handleClick}
        >
          <img className="p-image" src={poke.sprites.front_default} alt="" />
        </div>
      </div>
    );
  });

  return (
    <div>
      {pokemon.length > 0 ? (
        <div>
          <PokemonName selected={props.selected} />
          <div className="row">{pokemon}</div>
        </div>
      ) : (
        <PokeballSpinner />
      )}
    </div>
  );
};

const GameInfo = props => {
  return <h1>{props.score}</h1>;
};

const PokemonName = props => {
  return (
    <h2 className="selected-poke-name" style={{ textAlign: "center" }}>
      {props.selected.name}
    </h2>
  );
};

const PokeballSpinner = () => {
  return (
    <div className="text-center">
      <img className="block App-logo" src={pokeballicon} alt="pokeball-icon" />
      <p>
        <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
      </p>
    </div>
  );
};

export default App;
