export type Report = {
  gear: Gear[] | [];
  class: string;
  rank: number;
  type: string;
  spec: string;
  reportID: string;
  encounterName: string;
  encounterID: number;
  startTime: number;
};

export type RaidResults = {
  name: string;
  raidID?: number;
  phaseID?: number;
  reports?: Report[];
  encounterID?: number;
};


export type SpecInfo = {
  alt: string;
  img: string;
  talent?: string;
};

export type ValidRaidData = {
  name: string;
  raidID: number;
  phaseID: number;
  encounterID: number;
  reports: Report[];
}

export type PlayerType = "Healer" | "DPS" | "Tank";

export type Gear = {
  name: string;
  quality: string;
  icon: string;
  permanentEnchant: string | number;
  id: number;
};


export type PlayerClass =
  | "Druid"
  | "Hunter"
  | "Mage"
  | "Paladin"
  | "Priest"
  | "Rogue"
  | "Shaman"
  | "Warlock"
  | "Warrior"
  | "";

export type Raid = {
  name: string;
  raidID: number;
  encounterID: number;
  phaseID: number;
};


