import React, { useState, useEffect } from "react";

type DisplayAreaProps = {
  searchResults?: any[];
};

export const DisplayArea: React.FC<DisplayAreaProps> = (props) => {
  const [ resultsDisplayed, setResultsDisplayed ] = React.useState<any[] | null>();

  React.useEffect(() => {
    if (props.searchResults) {
    setResultsDisplayed(props.searchResults);
    }
  }, [props]);



  return (
    <div className="display-area">
      { resultsDisplayed ? (
        <div>
          {resultsDisplayed.map(item => {
            return (
              <div className="item-container">
                <img src={`https://wow.zamimg.com/images/wow/icons/large/${item.icon}`}/>
                <h3>{item.name}</h3>
                <ul>
                  <li>quality:{item.quality}</li>
                  <li>itemlvl:{item.itemLevel}</li>
                  <li>Permanent Enchant:{item.permanentEnchant}</li>
                  <li>Temporary Enchant:{item.temporaryEnchant}</li>
                </ul>
              </div>
            )
          })}
        </div>
      ) : (
        <h1>user has not yet submitted</h1>
      )}
    </div>
  );
};
