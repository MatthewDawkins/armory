import React from "react";
import "./item.scss";

type ItemProps = {
  img: string;
  id: number;
};

export const Item: React.FC<ItemProps> = ({ img, id }) => (
  <a
    className="item"
    target="_blank"
    rel="noopener noreferrer"
    href={`https://classic.wowhead.com/item=${id}`}
  >
    <div className="item-wrapper">
      <img
        className="item-border"
        src="https://wow.zamimg.com/images/Icon/large/border/default.png"
        alt="item-border"
      />
      <img
        className="item-img"
        src={`https://wow.zamimg.com/images/wow/icons/large/${img}`}
        alt="item-img"
      />
    </div>
  </a>
);
