import React from "react";
import { Player } from "../player/player";
import { PlayerMetrics } from "../player-metrics/player-metrics";
import { PercentileContainer } from "../percentile-container/percentile-container";
import { Inventory } from "../inventory/inventory";
import { Timestamp } from "../timestamp/timestamp";
import { RankingContainer } from "../ranking-container/ranking-container";
import { Report, ValidRaidData } from "../../libs/types";
import "./player-wrapper.css";

const playerClasses = require("../../libs/classes.json");
const ITEM_NAMES = require("../../libs/item_names.json");

type PlayerWrapperProps = {
  raid: ValidRaidData;
};

const initialGearData:any = [];

export const PlayerWrapper: React.FC<PlayerWrapperProps> = ({
  raid,
}: PlayerWrapperProps) => {
  const [
    playerReportFromRankings,
    setPlayerReportFromRankings,
  ] = React.useState<any>({});
  const [gear, setGear] = React.useState<any[]>(initialGearData);

  const addNameToItems = (gear:any) => {
    return gear.map((item:any) => {
      const name = ITEM_NAMES[item.id].name;
      return {
        ...item,
        name : name
      }
    });
  };

  const updatePlayerGear = async (gear: any) => {
    console.log(gear);
    if (gear && gear.length) {
      const updatedGear = addNameToItems(gear)
      setGear(updatedGear);
    }
  };

  const validateIsSpec = (playerRankingsSpec: string): boolean =>
    !(
      playerRankingsSpec === "DPS" ||
      playerRankingsSpec === "Healer" ||
      playerRankingsSpec === "Tank"
    );

  const getPlayerType = (parsesReports: any[]): string => {
    let playerTypeOrSpec = "";
    const tankReport = parsesReports.find((report) => report.spec === "Tank");
    if (tankReport) {
      const dpsReport = parsesReports.find((report) => report.spec === "DPS");
      playerTypeOrSpec =
        !dpsReport || tankReport.percentile > dpsReport.percentile
          ? "Tank"
          : "DPS";
    } else {
      playerTypeOrSpec = parsesReports[0].spec;
    }
    return validateIsSpec(playerTypeOrSpec) ? "DPS" : playerTypeOrSpec;
  };

  const getClassId = (playerClass: string): number => {
    let classType = playerClasses.find(
      (classType: any) => classType.name === playerClass
    );
    return classType ? classType.id : -1;
  };

  const getMostCurrentReport = (rankingsReports: Report[]): any => {
    let mostRecentStartTime = 0;
    let mostCurrentReport;
    rankingsReports.forEach((report) => {
      const currentReportStartTime = report.startTime;
      if (currentReportStartTime) {
        if (currentReportStartTime > mostRecentStartTime) {
          mostRecentStartTime = currentReportStartTime;
          mostCurrentReport = report;
        }
      }
    });
    return mostCurrentReport;
  };

  const handleReport = (rankingReport: any) => {
    setPlayerReportFromRankings(rankingReport);
  };

  const playerType = getPlayerType(raid.reports);
  const playerMetric = playerType === "Healer" ? "hps" : "dps";
  const mostRecentReport = getMostCurrentReport(raid.reports);

  const leftMetric: React.ReactElement = (
    <RankingContainer
      encounterID={raid.encounterID}
      phaseID={raid.phaseID}
      classID={getClassId(raid.reports[0].class)}
      rankingMetric={playerMetric}
      onValidReport={handleReport}
    />
  );

  return (
    <Player
      handlePlayerGear={updatePlayerGear}
      key={raid.reports[0].encounterName}
      type={playerType}
      spec={validateIsSpec(raid.reports[0].spec) ? raid.reports[0].spec : ""}
      playerClass={raid.reports[0].class}
      reportID={mostRecentReport.reportID}
      guildName={playerReportFromRankings.guildName}
      metrics={
        <PlayerMetrics
          left={leftMetric}
          right={
            <PercentileContainer zoneID={raid.raidID} phaseID={raid.phaseID} />
          }
        />
      }
      inventory={
        <div className="player-inventory">
          <Timestamp
            milliseconds={mostRecentReport && mostRecentReport.startTime}
          />
          <Inventory items={gear} />
        </div>
      }
    />
  );
};
