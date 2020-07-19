import React from "react";
import "./player-sidebar.css";
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";

type PlayerSidebarProps = {
  percentile: string;
}

export const PlayerSidebar: React.FC<PlayerSidebarProps> = props => (

  <div className="player-sidebar">
    <div className="stats">
      <div className="percentile-border">
        <h3>{props.percentile}</h3>
      </div>
    </div>
    <div className="info">

    </div>
  </div>

);
