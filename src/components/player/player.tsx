import React, { useContext } from "react";
import { PlayerHeader } from "../player-header/player-header";
import { PlayerLabel } from "../player-label/player-label";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import { PlayerContext } from "../../hooks/playerContext";
import { PlayerContainer } from "../player-container/player-container";
import { SpecInfo } from "../../libs/types";
import "./player.css";

type PlayerProps = {
  playerClass: string;
  type: string;
  spec: string;
  reportID: string;
  metrics: React.ReactElement;
  guildName: string;
  inventory: React.ReactElement;
  handlePlayerGear: (gear: any[]) => void;
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

  const {
    playerClass,
    type,
    reportID,
    metrics,
    spec,
    guildName,
    handlePlayerGear,
    inventory,
  } = props;

  const [name] = useContext(PlayerContext).split("/");

  React.useEffect(() => {
    const abortController = new AbortController();
    const fetchFightsReport = async () => {
      try {
        const res = await fetch(
          `${WCRAFT_API_URL}/report/fights/${reportID}?&${WCRAFT_API_KEY}`
        );
        const results = await res.json();
        const playerFriendlyResults = results
          ? getFriendlyData(results.friendlies, name)
          : false;
        if (playerFriendlyResults) {
          setFriendlyData((prev) => ({
            ...prev,
            id: playerFriendlyResults.id,
            icon: playerFriendlyResults.icon,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (reportID) {
      fetchFightsReport();
    }
    return () => {
      abortController.abort();
    };
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
  ): string => {
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
        onPlayerGear={(gear: any[]) => handlePlayerGear(gear)}
        renderPlayerContainer={(specInfo: SpecInfo) => (
          <div
            id="background-image"
            className={`background-${
              specInfo.alt.split(" ").join("-") || playerClass
            }`}
          >
            <div className="player-results">
              <PlayerHeader>
                <PlayerLabel
                  label={specInfo.alt}
                  icon={specInfo.img}
                  guild={guildName || ""}
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
