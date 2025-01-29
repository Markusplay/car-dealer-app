import { Vehicle } from './vehicle';

export interface VehicleResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Vehicle[];
}
