import { ModelReponse } from '@/types/model-response';
import { VehicleResponse } from '@/types/vehicle-response';
import axios from 'axios';

const vehicleApi = axios.create({
  baseURL: process.env.API_URL,
  params: { format: 'json' },
});

export async function fetchVehicles() {
  try {
    const res = await vehicleApi.get<VehicleResponse>('/GetMakesForVehicleType/car');
    return res;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
}

export async function fetchModels(makeId: string, year: string) {
  try {
    const res = await vehicleApi.get<ModelReponse>(`/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}`);
    return res;
  } catch (error) {
    console.error(`Error fetching models for makeId ${makeId} and year ${year}:`, error);
    throw error;
  }
}
