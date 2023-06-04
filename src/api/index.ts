import { API_HOST } from '@/config/constant';
import PlanetsService from './service/planets.service';

export const planetsService = new PlanetsService({
  apiHost: API_HOST || '',
});
