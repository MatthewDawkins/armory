import React from "react";
import "./inventory-side.css";
import { Icon } from '../icon/icon';

type InventorySideProps = {
  items: any[];
  side: "right" | "left";
};


export const InventorySide: React.FC<InventorySideProps> = (props: InventorySideProps) => (


    <div className={`inventory-${props.side}`}>

      { props.items.map((item, index) => (

        <h3 className={`${props.side}-label`} key={`inv-${index}`} id={`item-quality-${item.quality}`}>
          <Icon img={item.icon} id={item.id}/>
          {item.name}
        </h3>
      ))}

    </div>

);
