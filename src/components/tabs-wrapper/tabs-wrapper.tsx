import React, { useContext } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { PlayerWrapper } from "../player-wrapper/player-wrapper";
import { RaidResults } from "../../libs/types";
import { PlayerContext } from "../../hooks/playerContext";
import "./tabs-wrapper.css";

type TabsWrapperProps = {
  raids: RaidResults[];
};

export const TabsWrapper: React.FC<TabsWrapperProps> = ({ raids }) => {
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
        {raids.map((raidResults: any, index: number) => (
          <Tab
            key={`${raidResults.name}`}
            disabled={!raidResults.reports}
            eventKey={raidResults.name}
            title={raidResults.name || "null"}
          >
            {raidResults && raidResults.reports && (
              <PlayerWrapper key={`playerSearch-${index}`} raid={raidResults} />
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
