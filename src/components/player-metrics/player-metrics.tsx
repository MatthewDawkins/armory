import React from "react";
import "./player-metrics.scss";

type MetricProps = {
  title: string;
};
type PlayerMetricsProps = {
  left: React.ReactElement;
  right: React.ReactElement;
};

type LabelProps = {
  title: string;
};

const Label: React.FC<LabelProps> = ({ title, ...props }) => (
  <div className="label">
    <h4>{title}</h4>
    {props.children}
  </div>
);

export const PlayerMetrics: React.FC<PlayerMetricsProps> = ({
  left,
  right,
}) => (
  <div className="player-metrics">
    <div className="left-metric">
      <Label title="Server Rank:" children={left} />
    </div>
    <div className="right-metric">
      <Label title="Best Performance Avg:" children={right} />
    </div>
  </div>
);
