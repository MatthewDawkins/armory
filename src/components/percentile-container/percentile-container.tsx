import React from "react";
import { PercentileCircle } from "../percentile-circle/percentile-circle";
import { PlayerContext } from "../../hooks/playerContext";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import "./percentile-container.css";

type PercentileContainerProps = {
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
  const { zoneID, phaseID } = props;
  const player = React.useContext(PlayerContext);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [percentile, setPercentile] = React.useState(-1);

  React.useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const doParsesFetch = async () => {
      try {
        const res = await fetch(
          `${WCRAFT_API_URL}/parses/character/${player}?&zone=${zoneID}&partition=${phaseID}&timeframe=historical&${WCRAFT_API_KEY}`
        );
        const parsesResults = await res.json();
        const bestPercentiles = getBestPercentiles(parsesResults);
        const bestAvg = getAvg(bestPercentiles);
        setPercentile(bestAvg);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    if (zoneID && phaseID) {
      doParsesFetch();
    }
    return () => {
      abortController.abort();
    };
  }, [player, zoneID, phaseID]);

  const getBestPercentiles = (parses: ParseReport[]): number[] => {
    const bestPercentiles = new Map();
    parses.forEach((parse) => {
      if (parse.encounterID !== 713) {
        const prev = bestPercentiles.has(parse.encounterID)
          ? bestPercentiles.get(parse.encounterID)
          : 0;
        if (parse.percentile > prev) {
          bestPercentiles.set(parse.encounterID, parse.percentile);
        }
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
        error && <h5>N/A</h5>
      )}
    </div>
  );
};
