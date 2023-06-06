import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { GetPlanetsResponse } from '../models/getPlanets.response';
import type { GetPlanetsRequest } from '../models/getPlanets.request';

type RestClientConfigurationProvider = {
  apiHost: string;
};

export default class PlanetsService {
  protected restClient: AxiosInstance;

  constructor(config: RestClientConfigurationProvider) {
    this.restClient = axios.create({ baseURL: config.apiHost });
  }

  async getPlanets(request: GetPlanetsRequest): Promise<GetPlanetsResponse> {
    const response = await this.restClient.get<GetPlanetsResponse>('', {
      params: {
        ...request,
      }
    });
    return response.data;
  }
}
