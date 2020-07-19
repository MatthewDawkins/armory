import React from "react";
import "./inventory-wrapper.css";
import { itemSlots } from "../../placeholders";
import { InventorySide } from "../inventory-side/inventory-side";
import { InventoryBottom } from "../inventory-bottom/inventory-bottom";
import { PlayerSidebar } from "../player-sidebar/player-sidebar";

type InventoryProps = {
  items: any[];
  percentile: number;
};

export const InventoryWrapper: React.FC<InventoryProps> = (props: InventoryProps) => {
  const slotLeftIDs = [1, 2, 3, 15, 5, 4, 19, 9];
  const slotRightIDs = [10, 6, 7, 8, 11, 12, 13, 14];
  const slotBottomIDs = [16, 17, 18];

  return (
    <div className="inventory-wrapper">
      <div className="inventory">
        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <InventorySide
              items={slotLeftIDs.map(id => props.items[id - 1] || {
                name: `Empty slot - ${itemSlots[id - 1]}`,
                icon: `inventoryslot_${itemSlots[id - 1]}.jpg`
              })}
              side={"left"}
            />
          </div>
          <div className="col-lg-6 col-xs-12">
            <InventorySide
              items={slotRightIDs.map(id => props.items[id - 1] || {
                name: `Empty slot - ${itemSlots[id - 1]}`,
                icon: `inventoryslot_${itemSlots[id - 1]}.jpg`
              })}
              side={"right"}
            />
          </div>
          <InventoryBottom
            items={slotBottomIDs.map(id => props.items[id - 1] || {
              name: `Empty slot - ${itemSlots[id - 1]}`,
              icon: `inventoryslot_${itemSlots[id - 1]}.jpg`
            })}
          />
        </div>
      </div>
      <PlayerSidebar
        percentile={(props.percentile).toFixed(2)}
        />
    </div>

  );
}

