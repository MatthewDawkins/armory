import React from "react";
import { PercentileCircle } from "../percentile-circle/percentile-circle";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import "./percentile-container.css";

type PercentileContainerProps = {
  player: string;
  zoneID: number;
  phaseID: number;
};

type ParseReport = {
  encounterID: number;
  percentile: number;
};

export const PercentileContainer: React.FC<PercentileContainerProps> = (
  props
) => {
  const { player, zoneID, phaseID } = props;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [percentile, setPercentile] = React.useState(-1);

  React.useEffect(() => {
    const doParsesFetch = async () => {
      try {
        console.log(player, zoneID, phaseID);
        const res = await fetch(
          `${WCRAFT_API_URL}/parses/character/${player}?&zone=${zoneID}&partition=${phaseID}&timeframe=historical&${WCRAFT_API_KEY}`
        );
        const parsesResults = await res.json();
        console.log("parsesReport@pwrap", parsesResults);
        setPercentile(getAvg(getBestPercentiles(parsesResults)));
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    if (zoneID && phaseID) {
      doParsesFetch();
    }
  }, [player, zoneID, phaseID]);

  const getBestPercentiles = (parses: ParseReport[]): number[] => {
    const bestPercentiles = new Map();
    parses.forEach((parse) => {
      const prev = bestPercentiles.has(parse.encounterID)
        ? bestPercentiles.get(parse.encounterID)
        : 0;
      if (parse.percentile > prev) {
        bestPercentiles.set(parse.encounterID, parse.percentile);
      }
    });
    return Array.from(bestPercentiles.values());
  };

  const getAvg = (percentiles: number[]): number => {
    let percentileTotal = 0;
    percentiles.forEach((percentile: any) => {
      percentileTotal += percentile;
    });
    return percentileTotal / percentiles.length;
  };

  return (
    <div className="percentile-wrapper">
      {!loading && percentile !== -1 ? (
        <div className="percentile-chart">
          <PercentileCircle percentile={percentile} />
        </div>
      ) : (
        error && <h5>An error occured when rendering percentiles</h5>
      )}
    </div>
  );
};
