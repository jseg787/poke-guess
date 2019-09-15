import React from 'react';
import pokeballicon from './pokeball-icon.svg';
import './App.css';
import { get } from 'https';

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

  componentDidMount = () => {
    this.getPokemon();
  }

  handleClick = (e) => {
    if (e.target.firstChild.src === this.state.selectedPokemon.sprites.front_default) {
      console.log('correct');
      this.setState({score: this.state.score + 1});
    } else {
      console.log('incorrect');
    }
    setTimeout(this.getPokemon, 100);
  }
  
  render() {
    return (
      <div className="container">
        <GameInfo score={this.state.score}/>
        <PokemonArea 
        pokemon={this.state.pokemon} 
        selected={this.state.selectedPokemon}
        handleClick={this.handleClick}
      />
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
        onClick={props.handleClick} >
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

const GameInfo = (props) => {
  return (
    <h1>{props.score}</h1>
  )
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
