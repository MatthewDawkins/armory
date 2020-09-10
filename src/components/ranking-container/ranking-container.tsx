import React, { useContext } from "react";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import { PlayerContext } from "../../hooks/playerContext";
import "./ranking-container.css";
import Spinner from "react-bootstrap/Spinner";

type RankingContainerProps = {
  classID: number;
  rankingMetric: string;
  encounterID: number;
  phaseID: number;
  onValidReport: (report: any) => void;
};

type PlayerRanking = {
  name: string;
  total: number;
};

export const RankingContainer: React.FC<RankingContainerProps> = (props) => {
  const { classID, rankingMetric, encounterID, phaseID, onValidReport } = props;
  const [name, server, region] = useContext(PlayerContext).split("/");

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [ranking, setRanking] = React.useState(-1);


  React.useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();

    let hasMorePages = true;
    const doRankingsFetch = async () => {
      var pageCount = 1;

      while (pageCount < 6 && hasMorePages && ranking === -1) {
        try {
          const res = await fetch(
            `${WCRAFT_API_URL}/rankings/encounter/${encounterID}?metric=${rankingMetric}&partition=${phaseID}&region=${region}&server=${server}&class=${classID}&page=${pageCount}&${WCRAFT_API_KEY}`
          );
          const rankingsResults = await res.json();
          hasMorePages = rankingsResults.hasMorePages;
          console.log(rankingsResults, encounterID)
          const playerRanking = getPlayerRanking(
            name,
            rankingsResults.rankings
          );
          if (playerRanking !== -1) {
            onValidReport(rankingsResults.rankings[playerRanking - 1]);
            setRanking((pageCount - 1) * 100 + playerRanking);
            setLoading(false);
            return;
          }
        } catch (error) {
          setError(error.message);
          hasMorePages = false;
        }
        pageCount++;
      }
      setLoading(false);
      if (!error) {
        setError("No ranking data for character was found");
      }
      console.log(ranking, error)
    };

    if (name) {
      doRankingsFetch();
    }

    return () => {
      abortController.abort();
    };
  }, [
    name,
    region,
    server,
    classID,
    rankingMetric,
    encounterID,
    phaseID,
    error,
    ranking,
    onValidReport,
  ]);

  const getPlayerRanking = (
    name: string,
    rankings: PlayerRanking[]
  ): number => {
    let rankingIndex = rankings.findIndex((ranking) => ranking.name === name);
    if (rankingIndex === -1) {
      return rankingIndex;
    }
    return rankingIndex + 1;
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
      {!loading &&
        (ranking !== -1 ? (
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
          error && <h5 className="error-ranking">{"< 500"}</h5>
        ))}
      {loading && (
        <div className="spinner-wrapper">
          <Spinner
            animation="border"
            size="sm"
            style={{ color: "grey" }}
            role="status"
          >
            <span className="sr-only">Searching for ranking results...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};
