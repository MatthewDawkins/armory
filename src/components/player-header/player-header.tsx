import React from "react";
import "./player-header.css";

type PlayerHeaderProps = {
  playerSearch: string;
};

export const PlayerHeader: React.FC<PlayerHeaderProps> = ({
  playerSearch,
  ...props
}) => {
  const [name, server, region] = playerSearch.split("/");

  return (
    <div className="player-header">
      <div className="player-wcraft-link">
        <h5>WarcraftLogs:</h5>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://classic.warcraftlogs.com/character/${region}/${server}/${name}`}
        >
          <img
            className="wcraft-icon"
            src="https://dmszsuqyoe6y6.cloudfront.net/img/warcraft/favicon.png"
            alt=""
          />
        </a>
      </div>
      <div className="player">{props.children}</div>
    </div>
  );
};
