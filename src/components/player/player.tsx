import React from "react";
import { PlayerHeader } from "../player-header/player-header";
import { PlayerLabel } from "../player-label/player-label";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import "./player.css";

import classSpecIcons from "../../libs/specs.json";

type PlayerProps = {
  player: string;
  playerClass: string;
  type: string;
  spec: string;
  reportID: string;
  metrics: React.ReactElement;
  inventory: React.ReactElement;
};

type Friendly = {
  name: string;
  icon: string;
};

type SpecInfo = {
  alt: string;
  img: string;
};

export const Player: React.FC<PlayerProps> = (props) => {
  const [playerIcon, setPlayerIcon] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const {
    player,
    playerClass,
    type,
    spec,
    reportID,
    metrics,
    inventory,
  } = props;

  const [name] = player.split("/");

  React.useEffect(() => {
    const doFightsReportFetch = async () => {
      try {
        const res = await fetch(
          `${WCRAFT_API_URL}/report/fights/${reportID}?&${WCRAFT_API_KEY}`
        );
        const results = await res.json();
        console.log("fightsResults@player", results);
        const playerFriendlyResults = getFriendlyData(results.friendlies, name);
        setPlayerIcon(playerFriendlyResults ? playerFriendlyResults.icon : "");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    if (reportID) {
      doFightsReportFetch();
      setLoading(false);
    }
  }, [name, reportID]);

  const getFriendlyData = (
    friendlies: Friendly[],
    playerName: string
  ): Friendly => {
    const friendlyData = friendlies.find(
      (player) => player.name === playerName
    );
    return friendlyData || { name: "", icon: "" };
  };

  const getPlayerLabelFormat = (playerType: string): string => {
    const format: string =
      playerType === "Tank" || playerType === "Healer"
        ? "PlayerTypePriority"
        : "PlayerSpecPriority";
    return format;
  };

  const getClassLabel = (
    playerType: string,
    playerClass: string,
    playerSpec: string,
    labelFormat: string
  ): string =>
    labelFormat === "PlayerTypePriority"
      ? `${playerClass} ${playerType}`
      : `${playerSpec} ${playerClass}`;

  const getSpecFromIconFilename = (
    iconFilename: string,
    playerClass: string
  ): string => {
    console.log(iconFilename, playerClass);
    const playerSpecInfo = iconFilename
      .split("-")
      .filter((info) => info.toLowerCase() === playerClass);
    return playerSpecInfo.length ? playerSpecInfo[0] : "";
  };

  const playerFormat = getPlayerLabelFormat(type);
  const specFromIcon = getSpecFromIconFilename(playerIcon, playerClass) || spec;
  const playerLabel = getClassLabel(
    type,
    playerClass,
    specFromIcon,
    playerFormat
  );

  const specInfo: SpecInfo = classSpecIcons.find((specData) =>
    specData.alt.includes(playerLabel)
  ) || { alt: "", img: "" };

  return (
    <div className="player-wrapper">
      {specInfo && (
        <div
          id="background-image"
          className={`player-background-${
            specInfo.alt.split(" ").join("-") || playerClass
          }`}
        >
          {!loading && !error && (
            <div className="player-results">
              <PlayerHeader playerSearch={player}>
                <PlayerLabel
                  playerSearch={player}
                  label={specInfo.alt}
                  icon={specInfo.img}
                  playerClass={playerClass}
                />
                {metrics}
              </PlayerHeader>
              <div className="player-inventory">{inventory}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
