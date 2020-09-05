import React from "react";
import "./timestamp.css";

type TimestampProps = {
  milliseconds: number;
};

export const Timestamp: React.FC<TimestampProps> = ({ milliseconds }) => {
  const convertMillisecondsToTimeStamp = (milliseconds: number): string => {
    const date = new Date(milliseconds);
    const dateWords = date.toString().split(" ");
    return dateWords.filter((word) => word !== "GMT-0700").join(" ");
  };

  return (
    <h5 className="timestamp">
      {convertMillisecondsToTimeStamp(milliseconds)}
    </h5>
  );
};
