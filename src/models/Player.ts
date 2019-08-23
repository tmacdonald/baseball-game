export default interface Player {
  playerID: PlayerID;
  firstName: string;
  lastName: string;
  // Temporary: number between 0 and 1
  skill: number;
}

export type PlayerID = string;
