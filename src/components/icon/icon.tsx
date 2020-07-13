import React from "react";
import "./icon.css";

type IconProps = {
  img: string;
  id: number;
};


export const Icon: React.FC<IconProps> = (props: IconProps) => (

  <a className="icon" href={`https://classic.wowhead.com/item=${props.id}`}>

      <div className="icon-wrapper">
      <img className="icon-img" src={`https://wow.zamimg.com/images/wow/icons/large/${props.img}`} alt="icon-img" />
      </div>

  </a>
);

