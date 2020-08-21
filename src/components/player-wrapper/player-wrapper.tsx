import React from "react";
import { Player } from "../player/player";
import { PlayerMetrics } from "../player-metrics/player-metrics";
import { PercentileContainer } from "../percentile-container/percentile-container";
import { Inventory } from "../inventory/inventory";
import { Timestamp } from "../timestamp/timestamp";
import { RankingContainer } from "../ranking-container/ranking-container";
import { GearItem, Report, ValidRaidData } from "../../libs/types";

const playerClasses = require("../../libs/classes.json");

type PlayerWrapperProps = {
  playerInfo: string;
  raid: ValidRaidData;
};

export const PlayerWrapper: React.FC<PlayerWrapperProps> = (props) => {
  const { playerInfo, raid } = props;

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

  const getCurrentGearReport = (rankingsReports: any[]): Report | false => {
    let startTime = 0;
    let validReport;
    rankingsReports.forEach((report) => {
      if (report.gear.find((item: any) => item.name !== "Unknown Item")) {
        const currentStartTime = report.startTime;
        if (currentStartTime > startTime) {
          startTime = currentStartTime;
          validReport = report;
        }
      }
    });
    return validReport ? validReport : false;
  };

  const inventoryReport = getCurrentGearReport(raid.results);
  const InventoryWrapper = (
    <div className="player-inventory">
      <Timestamp
        milliseconds={inventoryReport ? inventoryReport.startTime : 0}
      />
      <Inventory
        items={
          inventoryReport
            ? inventoryReport.gear.map((item: GearItem) =>
                item.name === "Unknown Item" ? 0 : item
              )
            : []
        }
      />
    </div>
  );

  const PercentileWrapper = (
    <PercentileContainer
      zoneID={raid.raidID}
      phaseID={raid.phaseID}
      player={playerInfo}
    />
  );

  const getClassId = (playerClass: string) => {
    let classType = playerClasses.find(
      (classType: any) => classType.name === playerClass
    );
    return classType ? classType.id : -1;
  };

  const playerType = getPlayerType(raid.results);
  const playerMetric = playerType === "Healer" ? "hps" : "dps";

  const RankingWrapper = (
    <RankingContainer
      player={playerInfo}
      encounterID={raid.encounterID}
      phaseID={raid.phaseID}
      classID={getClassId(raid.results[0].class)}
      rankingMetric={playerMetric}
    />
  );

  return (
    <Player
      key={playerInfo}
      player={playerInfo}
      metrics={
        <PlayerMetrics left={RankingWrapper} right={PercentileWrapper} />
      }
      inventory={InventoryWrapper}
      type={playerType}
      spec={validateIsSpec(raid.results[0].spec) ? raid.results[0].spec : ""}
      reportID={raid.results[0].reportID}
      playerClass={raid.results[0].class}
    />
  );
};
