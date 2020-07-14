import React from "react";
import "./header.css";


type HeaderProps = {
  text: string;
}

export const Header:React.FC<HeaderProps> = props => {
  return (
    <header className="App-header">
      <img className="logo" src={'./images/icon-logo.png'} alt="Classic"/>
      <h1>{props.text}</h1>
    </header>
  );
};