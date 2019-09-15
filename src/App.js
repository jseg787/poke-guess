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
    pokemon: []
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
  
    this.setState({ pokemon: pokeArr });
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
        <PokemonArea pokemon={this.state.pokemon}/>
      </div>
    );
  }
}

class PokemonArea extends React.Component {
  


  render() {
    const pokemon = this.props.pokemon.map(poke => {
      return (
        <div className="p-image-card my-3" key={`pokemon-${poke.id}`}/* onClick={makeChoice} */>
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
          <div className="row">
            {pokemon}
          </div>
        ) : (
            <PokeballSpinner />
          )}
      </div>
    );
  }
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
