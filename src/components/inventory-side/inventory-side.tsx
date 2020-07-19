import React from "react";
import "./inventory-side.css";
import { Icon } from "../icon/icon";

const enchants = require("./../enchants");

type InventorySideProps = {
  items: any[];
  side: "right" | "left";
};

export const InventorySide: React.FC<InventorySideProps> = (props: InventorySideProps) => (

  <div className={`inventory-${props.side}`}>
    {props.items.map((item, index) => (
      <div className={`${props.side}-label`} key={`inv-${index}`}>
        <Icon img={item.icon} id={item.id} />
        <h3 className="label-title" id={`item-quality-${item.quality}`}>{item.name}
          <br />
          <i>{item.permanentEnchant !== 0 && enchants[item.permanentEnchant]}</i></h3>
      </div>
    ))}
  </div>

);
