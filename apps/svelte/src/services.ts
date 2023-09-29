import type { ApiRequest, ApiResponse } from './types';

export class ApiService {
  private baseUrl = import.meta.env.VITE_API_BASE_URL;
  private token?: string;

  private async fetchToken(): Promise<string> {
    if (!this.token) {
      const res = await fetch(this.baseUrl + '/api');
      this.token = ((await res.json()) as ApiResponse['getToken']['body']).token;
    }
    return this.token;
  }
  async getCounter(): Promise<number> {
    try {
      const token = await this.fetchToken();
      const res = await fetch(this.baseUrl + '/api/counter', { headers: { Authorization: `Bearer ${token}` } });
      return ((await res.json()) as ApiResponse['getCounter']['body']).counter;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
  async postCounter(body: ApiRequest['postCounter']['payload']): Promise<number | undefined> {
    try {
      const token = await this.fetchToken();
      const res = await fetch(this.baseUrl + '/api/counter', {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body)
      });
      return ((await res.json()) as ApiResponse['postCounter']['body']).counter;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}

let apiService: ApiService | undefined = undefined;
export const apiServiceFactory = () => (apiService ? apiService : (apiService = new ApiService()));
