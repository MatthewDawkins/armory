import React from "react";
import "./header.css";

type HeaderProps = {
  text: string;
};

export const Header: React.FC<HeaderProps> = ({ text }) => (
  <header className="header">
    <img
      className="logo"
      src="./images/icon-logo.png"
      alt="class-wow-armory-logo"
    />
    <h1>{text}</h1>
  </header>
);
