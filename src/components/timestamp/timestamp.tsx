import React from "react";
import "./timestamp.css";

type TimestampProps = {
  milliseconds: number;
};

export const Timestamp: React.FC<TimestampProps> = ({ milliseconds }) => {

  const covertMillisecondsToLocal = (milliseconds: number): string => {
    const date = new Date(milliseconds);
    console.log(date.toString());
    return date.toString();
  };

  const removeGMT = (milliseconds: number): string => {
    const date = covertMillisecondsToLocal(milliseconds);
    const dateWords = date.split(" ");
    return dateWords.filter((word) => word !== "GMT-0700").join(" ");
  };

  return <h5 className="timestamp">{removeGMT(milliseconds)}</h5>;
};
