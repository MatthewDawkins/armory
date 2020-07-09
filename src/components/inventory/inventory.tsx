import React from "react";
import { ItemSlot } from '../item-slot/item-slot';

type InventoryProps = {
  items: any[];
};

export const Inventory: React.FC<InventoryProps> = (props: InventoryProps) => (
  <div className="inventory-container">
    {props.items.map((item, idx) => (
      <ItemSlot
        name={item.name}
        quality={item.quality}
        imgPath={item.icon}
        level={item.itemLvl}
        temporaryEnchant={item.temporaryEnchant}
        permanentEnchant={item.permanentEnchant}
        index={idx}
      />
    ))}
  </div>
)