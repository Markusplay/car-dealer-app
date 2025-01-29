import { Model } from './model';

export interface ModelReponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Model[];
}
