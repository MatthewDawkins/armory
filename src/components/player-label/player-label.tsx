import React from "react";
import "./player-label.css";

type PlayerLabelProps = {
  playerSearch: string;
  icon: string;
  label: string;
  playerClass: string;
};

const iconUrl = "https://wow.zamimg.com/images/wow/icons/large/";

export const PlayerLabel: React.FC<PlayerLabelProps> = (props) => {
  const { icon, label, playerSearch, playerClass } = props;
  const [name, server, region] = playerSearch.split("/");
  const location = `${server} / ${region === "EU" ? region : "NA"}`;

  return (
    <div className="player-label">
      <img
        className="class-icon"
        src={`${iconUrl}classicon_${playerClass.toLowerCase()}.jpg`}
        alt="playerClass-icon"
      />
      <div className="nameplate">
        <h1
          className="username"
          id={`player-class-${playerClass}`}
        >{`${name.toUpperCase()}`}</h1>
        {icon && (
          <div className="sub-label">
            <h3 id="player-location" className={`player-class-${playerClass}`}>
              {location}
            </h3>
            <h3 id="player-spec" className={`player-class-${playerClass}`}>
              <img
                className="spec-icon"
                src={`${iconUrl}${icon}`}
                alt={label}
              />{" "}
              {label}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
