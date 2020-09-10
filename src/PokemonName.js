import React from "react";

const PokemonName = props => {
  return (
    <h2 className="selected-poke-name" style={{ textAlign: "center" }}>
      {props.selected.name}
    </h2>
  );
};

export default PokemonName;