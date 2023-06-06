import { planetsService } from '@/api';
import type { GetPlanetsResponse, PlanetDto } from '@/api/models/getPlanets.response';
import { defineStore } from 'pinia';

interface IPlanetSate {
  planetsData: null | GetPlanetsResponse;
  sortKey: string;
  sortDirection: 'asc' | 'desc';
  page: number;
}

function sortBy(key: string, direction: 'asc' | 'desc') {
  return function (a: PlanetDto, b: PlanetDto) {
    if (direction === 'asc') {
      return b[key as keyof PlanetDto]
        .toLowerCase()
        .localeCompare(a[key as keyof PlanetDto].toLowerCase());
    }
    return a[key as keyof PlanetDto]
      .toLowerCase()
      .localeCompare(b[key as keyof PlanetDto].toLowerCase());
  };
}

export const usePlanetStore = defineStore('planets', {
  state: (): IPlanetSate => ({
    planetsData: null,
    sortKey: 'name',
    sortDirection: 'desc',
    page: 1,
  }),
  getters: {
    planetsSorted: (state) => {
      return () => state.planetsData?.results?.sort(sortBy(state.sortKey, state.sortDirection));
    },
  },
  actions: {
    async getPlanets(page?: number) {
      try {
        this.planetsData = await planetsService.getPlanets({ page });
        if (page) {
          this.page = page;
        }
      } catch (error) {
        return error;
      }
    },
    updateSortKey(key: string) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDirection = 'asc';
      }
    },
  },
});
