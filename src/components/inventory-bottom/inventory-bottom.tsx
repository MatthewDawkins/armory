import React from "react";
import "./inventory-bottom.css";
import { Icon } from "../icon/icon";
const enchants = require("./../enchants");

type InventoryBottomProps = {
  items: any[];
};


export const InventoryBottom: React.FC<InventoryBottomProps> = (props: InventoryBottomProps) => (

  <div className="inventory-bottom">
    {props.items.map((item, index) => (
      <div className="col-lg-4 col-xs-12" key={`invbot-${index}`}>
        <div className="bottom-label" key={`inv-${index}`}>
          <Icon img={item.icon} id={item.id} />
          <h3 className="label-title" id={`item-quality-${item.quality}`}>{item.name}
            <br />
            <i>{item.permanentEnchant !== 0 && enchants[item.permanentEnchant]}</i></h3>
        </div>
      </div>
    ))}
  </div>

);

