import React from "react";
import "./inventory-side.css";
import { Item } from "../item/item";
import { GearItem } from "../../libs/types";

type InventorySideProps = {
  items: GearItem[];
  side: "right" | "left";
};

const enchants = require("../../libs/enchants.json");

export const InventorySide: React.FC<InventorySideProps> = (props) => (
  <div className={`inventory-${props.side}`}>
    {props.items.map((item, index) => (
      <div className={`${props.side}-label`} key={`inv-${index}`}>
        <Item img={item.icon} id={item.id} />
        <h3 className="label-title" id={`item-quality-${item.quality}`}>
          {item.name}
          <br />
          <i>
            {item.permanentEnchant !== 0 && enchants[item.permanentEnchant]}
          </i>
        </h3>
      </div>
    ))}
  </div>
);
