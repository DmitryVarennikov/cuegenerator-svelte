import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { initializeAnalytics, logEvent } from 'firebase/analytics';
import type { ApiRequest, ApiResponse } from './types';
import { firebaseConfig } from './config';

class ApiService {
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

export enum AnalyticsEvent {
  CUE_FILE_SAVED = 'cue_file_saved',
  PREV_CUE_LOADED = 'prev_cue_loaded'
}

class AnalyticService {
  private analytics;
  constructor(options: FirebaseOptions) {
    if (AnalyticService.areOptions(options)) {
      const app = initializeApp(options);
      this.analytics = initializeAnalytics(app);
    }
  }

  private static areOptions = (options: {}) => !Object.values(options).every(v => !v);
  private logEvent(event: AnalyticsEvent) {
    if (this.analytics) logEvent<AnalyticsEvent>(this.analytics, event);
  }
  logCueFileSaved() {
    this.logEvent(AnalyticsEvent.CUE_FILE_SAVED);
  }
  logPrevCueLoaded() {
    this.logEvent(AnalyticsEvent.PREV_CUE_LOADED);
  }
}

export const apiService = new ApiService();
export const analyticService = new AnalyticService(firebaseConfig);
