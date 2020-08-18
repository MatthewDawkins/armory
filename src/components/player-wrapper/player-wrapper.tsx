import React from "react";
import { Player } from "../player/player";
import { PlayerMetrics } from "../player-metrics/player-metrics";
import { PercentileContainer } from "../percentile-container/percentile-container";
import { Inventory } from "../inventory/inventory";
import { Timestamp } from "../timestamp/timestamp";
import { RankingContainer } from "../ranking-container/ranking-container";
import { GearItem, Report, ValidRaidData } from "../../libs/types";

type PlayerWrapperProps = {
  playerInfo: string;
  raid: ValidRaidData;
};

const playerClasses = require("../../libs/classes.json");

export const PlayerWrapper: React.FC<PlayerWrapperProps> = ({
  playerInfo,
  raid,
}) => {
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

  const getReportWithValidGear = (rankingsReports: any[]): Report | false => {
    const reportWithValidInventory = rankingsReports.find((encounter: any) =>
      encounter.gear.find((item: any) => item.name !== "Unknown Item")
    );
    return reportWithValidInventory || false;
  };

  const inventoryReport = getReportWithValidGear(raid.results);
  const InventoryWrapper = (
    <div className="player-inventory">
      <Timestamp milliseconds={raid.results[0].startTime} />
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
