import React, { useContext } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { PlayerWrapper } from "../player-wrapper/player-wrapper";
import { RaidResults } from "../../libs/types";
import { PlayerContext } from "../../hooks/playerContext";
import "./tabs-container.css";

type TabsContainerProps = {
  raids: RaidResults[];
};

export const TabsContainer: React.FC<TabsContainerProps> = ({ raids }) => {
  const playerSearch = useContext(PlayerContext);
  const getMostRecentValidRaid = (raids: RaidResults[]): string => {
    for (let i = raids.length - 1; i >= 0; i--) {
      if (raids[i].reports) {
        return raids[i].name;
      }
    }
    return "";
  };

  return (
    <div className="search-results">
      <Tabs
        key={`${playerSearch}-${getMostRecentValidRaid(raids)}`}
        defaultActiveKey={getMostRecentValidRaid(raids)}
      >
        {raids.map((raidResults: any) => (
          <Tab
            key={`${raidResults.name}`}
            disabled={!raidResults.reports}
            eventKey={raidResults.name}
            title={raidResults.name || "null"}
          >
            {raidResults && raidResults.reports && (
              <PlayerWrapper raid={raidResults} />
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
