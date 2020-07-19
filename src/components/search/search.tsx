import React from "react";
import './search.css';


type SearchProps = {
  prevSearch: string;
  search: (searchInfo: string) => void;
  deleteSearch: (searchInfo: string) => void;
}

export const Search: React.FC<SearchProps> = (props) => {
  const [username, server, region] = props.prevSearch.split("_");

  const handleClick = () => {
    console.log("this is at handleClick", props.prevSearch);
    props.search(props.prevSearch);
  };

  const handleDelete = () => {
    props.deleteSearch(props.prevSearch);
  };

  return (
    <span className="search">
      <i onClick={handleDelete} className="glyphicon glyphicon-remove"></i>
      <div onClick={handleClick}>
        {`${username} - ${server} - ${region}`}
      </div>
    </span>
  );
};
