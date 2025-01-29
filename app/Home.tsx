'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { generateYears } from '@/lib/utils';
import { MIN_YEAR } from '@/lib/constants';

interface Props {
  vehicles: Vehicle[];
}

export default function Home({ vehicles }: Props) {
  const [makeId, setMakeId] = useState('');
  const [year, setYear] = useState('');
  const router = useRouter();

  const handleNextClick = () => {
    router.push(`/result/${makeId}/${year}`);
  };

  const years = generateYears(MIN_YEAR, new Date().getFullYear());

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Select Vehicle</h1>
      <div className="mt-4 flex w-[300px] flex-col space-y-4">
        <Select value={makeId} onValueChange={setMakeId}>
          <SelectTrigger className="border p-2">
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            {vehicles.map((vehicle) => (
              <SelectItem key={vehicle.MakeId} value={vehicle.MakeId.toString()}>
                {vehicle.MakeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="border p-2">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((yearOption) => (
              <SelectItem key={yearOption} value={yearOption.toString()}>
                {yearOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button disabled={!makeId || !year} onClick={handleNextClick}>
          Next
        </Button>
      </div>
    </div>
  );
}
