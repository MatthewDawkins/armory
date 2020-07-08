import React from "react";

type HeaderProps = {
  text: string;
}

export const Header:React.FC<HeaderProps> = props => {
  return (
    <header className="App-header">
      <h1>{props.text}</h1>
    </header>
  );
};