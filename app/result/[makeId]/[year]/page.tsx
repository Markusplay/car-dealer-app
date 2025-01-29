import { Suspense } from 'react';
import ResultPage from './ResultPage';
import { Spinner } from '@/components/ui/spinner';
import { fetchModels, fetchVehicles } from '@/lib/api';
import { MIN_YEAR } from '@/lib/constants';
import { generateYears } from '@/lib/utils';

export async function generateStaticParams() {
    try {
      const vehicleRes = await fetchVehicles();
      const vehicles = vehicleRes.data.Results;
  
      const years = generateYears(MIN_YEAR, new Date().getFullYear());
  
      const paths = [];
  
      for (const vehicle of vehicles) {
        for (const year of years) {
          const modelRes = await fetchModels(vehicle.MakeId.toString(), year.toString());
  
          if (!modelRes || !modelRes.data || !modelRes.data.Results) {
            console.error(`No models found for makeId: ${vehicle.MakeId} and year: ${year}`);
            continue;
          }
  
          paths.push({
            makeid: vehicle.MakeId.toString(),
            year: year,
          });
        }
      }
  
      return paths;
    } catch (error) {
      console.error('Error generating static params:', error);
      return [];
    }
  }
export default async function Page({ params }: { params: Promise<{ makeId: string; year: string }> }) {
  const { makeId, year } = await params;
  return (
    <Suspense fallback={<Spinner />}>
      <ResultPage makeId={makeId} year={year} />
    </Suspense>
  );
}
