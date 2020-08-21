import React from "react";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import "./ranking-container.css";

type RankingContainerProps = {
  player: string;
  classID: number;
  rankingMetric: string;
  encounterID: number;
  phaseID: number;
};

type PlayerRanking = {
  name: string;
  total: number;
};

export const RankingContainer: React.FC<RankingContainerProps> = (props) => {
  const { player, classID, rankingMetric, encounterID, phaseID } = props;
  const [name, server, region] = player.split("/");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [ranking, setRanking] = React.useState(-1);

  React.useEffect(() => {
    let hasMorePages = true;
    setLoading(true);

    const doRankingsFetch = async () => {
      var pageCount = 1;
      while (hasMorePages && ranking === -1) {
        try {
          const res = await fetch(
            `${WCRAFT_API_URL}/rankings/encounter/${encounterID}?metric=${rankingMetric}&partition=${phaseID}&region=${region}&server=${server}&class=${classID}&page=${pageCount}&${WCRAFT_API_KEY}`
          );
          const rankingsResults = await res.json();
          hasMorePages = rankingsResults.hasMorePages;
          const playerRanking = getPlayerRanking(
            name,
            rankingsResults.rankings
          );
          if (playerRanking !== -1) {
            setRanking((pageCount - 1) * 100 + playerRanking);
            setLoading(false);
            return;
          }
        } catch (error) {
          setError(error.message);
        }
        pageCount++;
      }
      setLoading(false);
    };

    if (name) {
      doRankingsFetch();
    }
  }, [
    name,
    region,
    server,
    classID,
    rankingMetric,
    encounterID,
    phaseID,
    ranking,
  ]);

  const getPlayerRanking = (
    name: string,
    rankings: PlayerRanking[]
  ): number => {
    let rankingIndex = rankings.findIndex((ranking) => ranking.name === name);
    return rankingIndex === -1 ? rankingIndex : rankingIndex + 1;
  };

  const getRankingMedal = (ranking: number) =>
    ranking < 49
      ? "gold"
      : ranking < 150
      ? "silver"
      : ranking < 250
      ? "bronze"
      : "";

  const medal = getRankingMedal(ranking);

  return (
    <div className="rankings-wrapper">
      {!loading && ranking !== -1 ? (
        <h5 className="ranking">
          {ranking < 251 && (
            <img
              className="ranking-medal-icon"
              src={`https://assets.rpglogs.com/img/${medal}.png`}
              alt="ranking-medal"
            />
          )}
          {ranking}
        </h5>
      ) : (
        error && (<h5 className="500+/error-ranking">{" < 500"}</h5>)
      )}
    </div>
  );
};
