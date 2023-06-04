import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { GetPlanetsResponse } from '../models/getPlanets.response';

type RestClientConfigurationProvider = {
  apiHost: string;
};

export default class PlanetsService {
  protected restClient: AxiosInstance;

  constructor(config: RestClientConfigurationProvider) {
    this.restClient = axios.create({ baseURL: config.apiHost });
  }

  async getPlanets(): Promise<GetPlanetsResponse> {
    const response = await this.restClient.get<GetPlanetsResponse>('');
    return response.data;
  }
}
