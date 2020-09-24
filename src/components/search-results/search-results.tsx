import React from "react";
import {SearchOptions} from "../search-options/search-options";
import {TabsWrapper} from "../tabs-wrapper/tabs-wrapper";
import {PlayerContext} from "../../hooks/playerContext";

type SearchResultsProps = {
  currentSearch: string;
  searchResults: any;

}

export const SearchResults:React.FC<SearchResultsProps> = ({}) => {
 return (
   <div></div>
 )

}

// React.useEffect(() => {
//   const abortController = new AbortController();
//   const fetchFightsReport = async () => {
//     try {
//       const res = await fetch(
//         `${WCRAFT_API_URL}/report/fights/${reportID}?&${WCRAFT_API_KEY}`
//       );
//       const results = await res.json();
//       const playerFriendlyResults = results
//         ? getFriendlyData(results.friendlies, name)
//         : false;
//       if (playerFriendlyResults) {
//         setFriendlyData((prev) => ({
//           ...prev,
//           id: playerFriendlyResults.id,
//           icon: playerFriendlyResults.icon,
//         }));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   if (reportID) {
//     fetchFightsReport();
//   }
//   return () => {
//     abortController.abort();
//   };
// }, [name, reportID]);

// const getFriendlyData = (
//   friendlies: Friendly[],
//   playerName: string
// ): Friendly | false => {
//   const friendlyData = friendlies.find(
//     (player) => player.name === playerName
//   );
//   return friendlyData || false;
// };
