export type Report = {
  gear: GearItem[];
  class: PlayerClass;
  rank: number;
  type: PlayerType;
  spec: string;
  reportID: string;
  encounterName: string;
  player: string;
  startTime: number;
};

export type RaidData = {
  name: string;
  raidID?: number;
  phaseID?: number;
  results?: Report[];
};

export type ValidRaidData = {
  name: string;
  raidID: number;
  phaseID: number;
  encounterID: number;
  results: Report[];
}

export type PlayerType = "Healer" | "DPS" | "Tank";

export type GearItem = {
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


