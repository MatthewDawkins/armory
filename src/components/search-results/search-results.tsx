import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { PlayerWrapper } from "../player-wrapper/player-wrapper";
import { RaidData } from "../../libs/types";
import "./search-results.css";

type SearchResultsProps = {
  raids: RaidData[];
  playerInfo: string;
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  raids,
  playerInfo,
}) => {
  const getMostRecentValidRaid = (raids: RaidData[]): string => {
    for (let i = raids.length - 1; i >= 0; i--) {
      console.log(raids[i]);
      if (raids[i].results) {
        console.log(raids[i].name);
        return raids[i].name;
      }
    }
    return "";
  };

  return (
    <div className="search-results">
      <Tabs
        key={`${playerInfo}-${getMostRecentValidRaid(raids)}`}
        defaultActiveKey={getMostRecentValidRaid(raids)}
      >
        {raids.map((raid: any, idx: number) => (
          <Tab
            key={`${raid.name}-idx`}
            disabled={!raid.results}
            eventKey={raid.name}
            title={raid.name || "null"}
          >
            {raid && raid.results && (
              <PlayerWrapper raid={raid} playerInfo={playerInfo} />
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
