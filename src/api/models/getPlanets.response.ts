export type PlanetDto = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  url: string;
};

export interface GetPlanetsResponse {
  count: number;
  next: string;
  previous: string;
  results: PlanetDto[];
}
