import React from "react";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import { SpecInfo } from "../../libs/types";
import "./player-container.css";

import classSpecIcons from "../../libs/specs.json";
const classesRequiringEventFetch = ["Rogue", "Hunter", "Warrior", "Mage"];

type PlayerContainerProps = {
  label: string;
  reportID: string;
  playerID: number;
  playerClass: string;
  type: string;
  renderPlayerContainer: (specInfo: SpecInfo) => React.ReactElement;
};

type CombatEvent = {
  ability: {
    name: string;
  };
  sourceID: number;
};

const initialSpecInfo: SpecInfo = {
  alt: "",
  img: "",
};

export const PlayerContainer: React.FC<PlayerContainerProps> = (props) => {
  const [specInfo, setSpecInfo] = React.useState<SpecInfo>(initialSpecInfo);
  const [loading, setLoading] = React.useState<boolean>(true);

  const {
    playerID,
    reportID,
    label,
    type,
    playerClass,
    renderPlayerContainer,
  } = props;

  React.useEffect(() => {
    const myAbortController = new AbortController();
    const classSpecs = classSpecIcons.filter((spec) =>
      spec.alt.includes(playerClass)
    );
    const doEventsReportFetch = async () => {
      if (
        !classesRequiringEventFetch.find(
          (requiredClass) => requiredClass === playerClass
        )
      ) {
        setSpecInfo(
          classSpecs.find((specData) => specData.alt.includes(label)) ||
            initialSpecInfo
        );

        return;
      }
      try {
        const res = await fetch(
          `${WCRAFT_API_URL}/report/events/casts/${reportID}?&sourceid=${playerID}&start=0&end=9999999&${WCRAFT_API_KEY}`
        );
        const results = await res.json();
        if (results.events.length) {
          const usedTalentResults = getTalentUsed(results.events, classSpecs);
          const specInfo =
            usedTalentResults && getSpecInfo(type, usedTalentResults);
          setSpecInfo(specInfo || initialSpecInfo);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    };

    if (playerID && type === "DPS") {
      doEventsReportFetch();
    }
    return () => {
      myAbortController.abort();
    };
  }, [playerID, playerClass, type, reportID, label]);

  const getTalentUsed = (events: CombatEvent[], specs: any[]) => {
    for (let i = 0; i < specs.length; i++) {
      const talentEvent = events.find(
        (event) => event.ability.name === specs[i].talent
      );
      if (talentEvent) {
        return talentEvent.ability.name;
      }
    }
    return false;
  };

  const getSpecInfo = (playerType: string, indentifier: string) => {
    return playerType === "DPS"
      ? classSpecIcons.find((specData) => specData.talent === indentifier)
      : classSpecIcons.find((specData) => specData.alt.includes(indentifier));
  };

  return (
    <div className="spec-container">
      {type !== "DPS"
        ? renderPlayerContainer(getSpecInfo(type, label) || initialSpecInfo)
        : renderPlayerContainer(specInfo)}
    </div>
  );
};
