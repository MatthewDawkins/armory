import React from "react";
import { PlayerHeader } from "../player-header/player-header";
import { PlayerLabel } from "../player-label/player-label";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import { PlayerContainer } from "../player-container/player-container";
import { SpecInfo } from "../../libs/types";
import "./player.css";

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
  id: number;
};

const initialFriendlyData: Friendly = {
  id: -1,
  icon: "",
  name: "",
};

export const Player: React.FC<PlayerProps> = (props) => {
  const [friendlyData, setFriendlyData] = React.useState<Friendly>(
    initialFriendlyData
  );

  const [error, setError] = React.useState("");

  const {
    player,
    playerClass,
    type,
    reportID,
    metrics,
    inventory,
    spec,
  } = props;

  const [name] = player.split("/");

  React.useEffect(() => {
    const doFightsReportFetch = async () => {
      try {
        const res = await fetch(
          `${WCRAFT_API_URL}/report/fights/${reportID}?&${WCRAFT_API_KEY}`
        );
        const results = await res.json();
        const playerFriendlyResults = getFriendlyData(results.friendlies, name);
        if (playerFriendlyResults) {
          setFriendlyData((prev) => ({
            ...prev,
            id: playerFriendlyResults.id,
            icon: playerFriendlyResults.icon,
          }));
        }
      } catch (error) {
        setError(error.message);
      }
    };
    if (reportID) {
      doFightsReportFetch();
    }
  }, [name, reportID]);

  const getFriendlyData = (
    friendlies: Friendly[],
    playerName: string
  ): Friendly | false => {
    const friendlyData = friendlies.find(
      (player) => player.name === playerName
    );
    return friendlyData || false;
  };

  const getPlayerLabel = (
    playerType: string,
    spec: string,
    playerClass: string
  ) => {
    return playerType === "Healer" || playerType === "Tank"
      ? `${playerClass} ${playerType}`
      : `${spec} ${playerClass}`;
  };

  return (
    <div className="player-wrapper">
      <PlayerContainer
        type={type}
        playerClass={playerClass}
        reportID={reportID}
        label={getPlayerLabel(type, spec, playerClass)}
        playerID={friendlyData.id}
        renderPlayerContainer={(specInfo: SpecInfo) => (
          <div
            id="background-image"
            className={`background-${specInfo.alt.split(" ").join("-") || playerClass}`}
          >
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
          </div>
        )}
      />
    </div>
  );
};
