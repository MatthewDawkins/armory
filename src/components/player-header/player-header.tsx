import React from "react";
import { PlayerContext } from "../../hooks/playerContext";
import "./player-header.css";

const LinkTopper = (
  name: string,
  server: string,
  region: string
): React.ReactElement => (
  <>
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
  </>
);

export const PlayerHeader: React.FC = ({ children }) => {
  const [name, server, region] = React.useContext(PlayerContext).split("/");
  const playerLink = LinkTopper(name, server, region);

  return (
    <div className="player-header">
      <div className="player-wcraft-link">{playerLink}</div>
      <div className="player">{children}</div>
    </div>
  );
};
