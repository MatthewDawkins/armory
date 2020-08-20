import React from "react";
import "./percentile-circle.css";

type PercentileCircleProps = {
  percentile: number;
};

const diameter =
  "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831";

export const PercentileCircle: React.FC<PercentileCircleProps> = ({ percentile }) => {
  const getBracket = (percentile: number): string => {
    const bracket =
      percentile >= 97
        ? "legendary"
        : percentile >= 90
        ? "epic"
        : percentile >= 83
        ? "rare"
        : percentile >= 75
        ? "uncommon"
        : percentile >= 60
        ? "common"
        : "poor";
    return bracket;
  };

  return (
    <div className="circle-chart-wrapper">
      <svg
        viewBox="0 0 36 36"
        id="circular-chart"
        className={`circular-chart-${getBracket(percentile)}`}
      >
        <path className="circle-bg" d={diameter} />
        <path
          className="circle"
          strokeDasharray={`${Math.floor(percentile)}, 100`}
          d={diameter}
        />
        <text x="18" y="20.35" className="percentage">
          {percentile.toFixed(2)}
        </text>
      </svg>
    </div>
  );
};
