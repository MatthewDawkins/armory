import React from "react";
import "./search-history.css";

type SearchHistoryProps = {
  searchedPlayers: string[];
  search: (data: any) => void;
  delete: (prevSearch: string) => void;
};

type DeleteIconProps = {
  delete: (prevSearch: string) => void;
  playerSearch: string;
};

const DeleteIcon: React.FC<DeleteIconProps> = ({ playerSearch, ...props }) => (
  <i onClick={() => props.delete(playerSearch)}>
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-x-circle"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        fillRule="evenodd"
        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
      />
      <path
        fillRule="evenodd"
        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
      />
    </svg>
  </i>
);

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchedPlayers,
  ...props
}) => (
  <div className="search-history">
    <div className="search-history-column">
      {searchedPlayers.map((player) => (
        <span className="search" key={`search-${player}`}>
          <p onClick={() => props.search(player)}>
            <DeleteIcon delete={props.delete} playerSearch={player} />
            {player.split("/").join(" - ")}
          </p>
        </span>
      ))}
    </div>
  </div>
);
