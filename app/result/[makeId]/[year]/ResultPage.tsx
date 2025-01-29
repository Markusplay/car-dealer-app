import { Button } from '@/components/ui/button';
import { fetchModels } from '@/lib/api';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Link from 'next/link';

export default async function ResultPage({ makeId, year }: { makeId: string; year: string }) {
  const { data: models } = await fetchModels(makeId, year);

  if (models.Count === 0) {
    return <p>No models found for this make and year.</p>;
  }

  return (
    <div className="p-4">
      <Link href="/">
        <Button>Back</Button>
      </Link>
      <h1 className="text-2xl font-bold">Vehicle Models</h1>
      <Accordion type="single" collapsible className="w-full">
        {models.Results.map((model) => (
          <AccordionItem key={model.Model_ID} value={model.Model_ID.toString()}>
            <AccordionTrigger>{model.Model_Name}</AccordionTrigger>
            <AccordionContent>
              <p>{model.Make_Name}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
