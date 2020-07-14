import React from "react";
import "./inventory-bottom.css";
import { Icon } from '../icon/icon';

type InventoryBottomProps = {
  items: any[];
};


export const InventoryBottom: React.FC<InventoryBottomProps> = (props: InventoryBottomProps) => (

  <div className="inventory-bottom">
    {props.items.map((item, index) => (
      <div className="col-lg-4 col-xs-12" key={`invbot-${index}`}>
        <div className="item-bottom">
          <h3 className="bottom-label" id={`item-quality-${item.quality}`}><Icon img={item.icon} id={item.id}/>{(item.name)}</h3>
        </div>
      </div>
    ))}
  </div>
);

