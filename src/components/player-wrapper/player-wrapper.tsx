import React from "react";
import { Player } from "../player/player";
import { PlayerMetrics } from "../player-metrics/player-metrics";
import { PercentileContainer } from "../percentile-container/percentile-container";
import { Inventory } from "../inventory/inventory";
import { Timestamp } from "../timestamp/timestamp";
import { RankingContainer } from "../ranking-container/ranking-container";
import { Gear, Report, ValidRaidData } from "../../libs/types";
import "./player-wrapper.css";

const playerClasses = require("../../libs/classes.json");

type PlayerWrapperProps = {
  raid: ValidRaidData;
};

export const PlayerWrapper: React.FC<PlayerWrapperProps> = ({
  raid,
}: PlayerWrapperProps) => {
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

  const getCurrentGearReport = (rankingsReports: Report[]) => {
    let startTime = 0;
    let validReport;
    rankingsReports.forEach((report) => {
      if (report.gear.find((item: Gear) => item.name !== "Unknown Item")) {
        const currentStartTime = report.startTime;
        if (currentStartTime > startTime) {
          startTime = currentStartTime;
          validReport = report;
        }
      }
    });
    return validReport ? validReport : { startTime: 0, gear: [] };
  };

  const playerType = getPlayerType(raid.reports);
  const playerMetric = playerType === "Healer" ? "hps" : "dps";
  const inventoryReport = getCurrentGearReport(raid.reports);

  const leftMetric: React.ReactElement = (
    <RankingContainer
      encounterID={raid.encounterID}
      phaseID={raid.phaseID}
      classID={getClassId(raid.reports[0].class)}
      rankingMetric={playerMetric}
    />
  );

  const reportInventory: React.ReactElement = (
    <div className="player-inventory">
      <Timestamp milliseconds={inventoryReport.startTime} />
      <Inventory
        items={inventoryReport.gear.map((item: Gear) =>
          item.name === "Unknown Item" ? 0 : item
        )}
      />
    </div>
  );

  return (
    <Player
      key={raid.reports[0].encounterName}
      type={playerType}
      spec={validateIsSpec(raid.reports[0].spec) ? raid.reports[0].spec : ""}
      playerClass={raid.reports[0].class}
      reportID={raid.reports[0].reportID}
      metrics={
        <PlayerMetrics
          left={leftMetric}
          right={
            <PercentileContainer zoneID={raid.raidID} phaseID={raid.phaseID} />
          }
        />
      }
      inventory={reportInventory}
    />
  );
};
