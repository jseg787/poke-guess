import React from "react";
import pokeballicon from "./pokeball-icon.svg";

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

export default PokeballSpinner;