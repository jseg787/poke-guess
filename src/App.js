import React from 'react';
import pokeballicon from './pokeball-icon.svg';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Game />
      </div>
    );
  }
}

const Header = () => {
  return (
    <header className="text-center">
      <h1>Pokemon Guesser</h1>
    </header>
  );
}

class Game extends React.Component {
  state = {
    score: 0,
    pokemon: [],
    selectedPokemon: {}
  }
  
  getPokemon = async () => {
    const Pokedex = require('pokeapi-js-wrapper');
    const P = new Pokedex.Pokedex();
    const pokeNumArr = this.randNumGen();
    const pokeArr = [];
    for (let num of pokeNumArr) {
      const pokeHolder = await P.resource(`/api/v2/pokemon/${num}/`);
      pokeArr.push(pokeHolder);
    }
  
    this.setState({ 
      pokemon: pokeArr,
      selectedPokemon: pokeArr[Math.floor(Math.random() * 4)]
    });
  };

  componentDidMount = () => {
    this.getPokemon();
  }
  
  randNumGen = () => {
    const nums = [];
  
    const prevNums = [];
    while (nums.length < 4) {
      let currNum = Math.ceil(Math.random() * 151);
      if (!prevNums.includes(currNum)) {
        nums.push(currNum);
        prevNums.push(currNum);
      }
    }
    return nums;
  }

  render() {
    return (
      <div className="container">
        <PokemonArea pokemon={this.state.pokemon} selected={this.state.selectedPokemon} />
      </div>
    );
  }
}

const PokemonArea = (props) => {
  const pokemon = props.pokemon.map(poke => {
    return (
      <div 
        className="p-image-card my-3" 
        key={`pokemon-${poke.id}`}
        /* onClick={makeChoice} */>
        <img
          className="p-image"
          src={poke.sprites.front_default}
          alt=""
        />
      </div>
    );
  });

  return (
    <div>
      {pokemon.length > 0 ? (
        <div>
        <PokemonName selected={props.selected} />
        <div className="row">
          {pokemon}
        </div>
        </div>
      ) : (
        <PokeballSpinner />
      )}
    </div>
  );
}

const PokemonName = (props) => {
  return (
    <h2 className="selected-poke-name" style={{textAlign: 'center'}}>{props.selected.name}</h2>
  )
}

const PokeballSpinner = () => {
  return (
    <div className="text-center">
      <img className="block App-logo" src={pokeballicon} alt="pokeball-icon" />
      <p><a href="http://www.onlinewebfonts.com">oNline Web Fonts</a></p>
    </div>
  );
}

export default App;
