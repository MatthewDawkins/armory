import React from "react";
import "./player.css";
import { InventoryWrapper } from "../inventory-wrapper/inventory-wrapper";

type PlayerProps = {
  items: any[];
  spec: string;
  class: string;
  percentile: string;
  name: string;
  server: string;

}


export const Player: React.FC<PlayerProps> = (props: PlayerProps) => (
  <div className="player">
    {props.items && (
      <div className={`player-area-${props.class.toLowerCase()}`}>
        <div className="player-header">

          <h1 className={`player-class-${(props.class)}`}>

            <img className="class-icon" src={`https://wow.zamimg.com/images/wow/icons/large/classicon_${(props.class).toLowerCase()}.jpg`} alt="class-icon" />

            { `${(props.name).toUpperCase()}` }

          </h1>

          <h3 className={`player-class-${props.class}`}>{`${props.spec} ${props.class} `}</h3>
        </div>






        <InventoryWrapper
          items={props.items}
        />


      </div>
    )}
  </div>
);
