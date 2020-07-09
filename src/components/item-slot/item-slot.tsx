import React from "react";
import "./item-slot.css";


type ItemSlotProps = {
  name: string;
  quality: string;
  imgPath: string;
  level: number;
  temporaryEnchant: temporaryEnchantProps;
  permanentEnchant: permanentEnchantProps;
  index: number;
}

type temporaryEnchantProps = {
  name: string;
  imgPath: string;
}

type permanentEnchantProps = {
  name: string;
  imgPath: string;
}

export const ItemSlot: React.FC<ItemSlotProps> = (props: ItemSlotProps ) => (
    <div className="item" key={`item-slot-${props.index}`}>
      <div className="item-border">
        <img className="item-icon" src={`https://wow.zamimg.com/images/wow/icons/large/${props.imgPath}`} alt={props.imgPath} />
      </div>
      <h3 className={"item-quality-" + props.quality}>{props.name}</h3>
    </div>
)
