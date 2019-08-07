export interface Inning {
  hits: number;
  runs: number;
}

export interface Game {
  awayInnings: Inning[];
  homeInnings: Inning[];
}
