import React from "react";
import { Item } from "../item/item";
import { GearItem } from "../../libs/types";
import "./inventory-bottom.scss";

type InventoryBottomProps = {
  items: GearItem[];
};

const enchants = require("../../libs/enchants.json");

export const InventoryBottom: React.FC<InventoryBottomProps> = (props) => (
  <div className="inventory-bottom">
    {props.items.map((item, index) => (
      <div className="col-lg-4 col-xs-12" key={`invbot-${index}`}>
        <div className="bottom-label" key={`inv-${index}`}>
          <Item img={item.icon} id={item.id} />
          <h3 className="label-title" id={`item-quality-${item.quality}`}>
            {item.name}
            <br />
            <i>
              {item.permanentEnchant !== 0 && enchants[item.permanentEnchant]}
            </i>
          </h3>
        </div>
      </div>
    ))}
  </div>
);
