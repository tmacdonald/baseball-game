import { PlayerID } from "./Player";

export default interface Team {
  name: string;
  roster: PlayerID[];
}

export type TeamID = string;
