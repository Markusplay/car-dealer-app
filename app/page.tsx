import Home from './Home';
import { fetchVehicles } from '@/lib/api';

export default async function Page() {
  const { data } = await fetchVehicles();
  return <Home vehicles={data.Results} />;
}
