import React from "react";
import PokemonName from "./PokemonName";
import PokeballSpinner from "./PokeballSpinner";

const PokemonArea = props => {
  const pokemon = props.pokemon.map(poke => {
    return (
      <div className="col-6 col-md-3 my-3" key={poke.id}>
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

export default PokemonArea;