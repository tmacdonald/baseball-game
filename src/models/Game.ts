export interface Inning {
  hits: number;
  runs: number;
  errors: number;
}

export interface Game {
  awayInnings: Inning[];
  homeInnings: Inning[];
}
