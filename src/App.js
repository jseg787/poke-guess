import React, { useState, useEffect } from "react";
import Header from "./Header";
import Game from "./Game";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Game />
    </div>
  );
};

export default App;
