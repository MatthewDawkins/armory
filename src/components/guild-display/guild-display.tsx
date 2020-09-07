import React from "react";
import { PlayerContext } from "../../hooks/playerContext";
import "./guild-display.css";
import { defaultProps } from "react-select/src/Select";

type GuildDisplayProps = {
  guild: string;
};

export const GuildDisplay: React.FC<GuildDisplayProps> = (props) => {
  const [guild, setGuild] = React.useState("");



  return <div className="guild-display">{}</div>;
};
