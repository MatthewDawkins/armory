import React from "react";
import "./header.css";

type HeaderProps = {
  text: string;
}

export const Header: React.FC<HeaderProps> = props => (

  <header className="App-header">
    <img className="logo" src={"./images/icon-logo.png"} alt="class-wow-armory-logo"/>
    <h1>{props.text}</h1>
  </header>

);
