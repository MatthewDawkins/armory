import React from "react";
import { Search } from '../search/search';
import './search-history.css';

type SearchHistoryProps = {
  searchedPlayers: string[];
  search: (data: any) => void;
  delete: (prevSearch: string) => void;
  onClick: (e: any) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = props => {

  return (
    <div className="search-history">
      {props.searchedPlayers.map((player, idx) =>
        <Search
          deleteSearch={props.delete}
          search={props.search}
          prevSearch={player}
        />
      )}
    </div>
  );
};

