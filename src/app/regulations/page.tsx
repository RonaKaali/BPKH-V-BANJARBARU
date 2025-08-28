import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText } from 'lucide-react';

const regulations = [
  {
    id: 'reg-001',
    title: 'National Forest Management Act of 2023',
    summary:
      'This act outlines the primary guidelines for sustainable forest management, including timber harvesting, reforestation, and biodiversity conservation within national forest territories.',
    details:
      'Key provisions include mandatory environmental impact assessments for all logging operations, a national reforestation fund supported by timber taxes, and the establishment of new protected zones for endangered species habitats. The act also specifies penalties for non-compliance.',
  },
  {
    id: 'reg-002',
    title: 'Wildfire Prevention and Control Code',
    summary:
      'A set of regulations designed to minimize the risk of wildfires and establish protocols for their containment and management.',
    details:
      'This code mandates the creation of firebreaks around vulnerable communities, restricts open fires during dry seasons (May 1 - Oct 31), and requires landowners to clear dry vegetation from their properties. It also details the command structure for emergency response.',
  },
  {
    id: 'reg-003',
    title: 'Non-Timber Forest Product Harvesting Rules',
    summary:
      'Governs the sustainable collection of non-timber products such as medicinal plants, mushrooms, and resins by local communities and commercial entities.',
    details:
      'A permit is required for commercial harvesting, with quotas set annually based on ecological surveys. Traditional harvesting by indigenous communities for personal use is exempt from permitting but must follow sustainable practices. A list of prohibited species is updated biannually.',
  },
  {
    id: 'reg-004',
    title: 'Forest Access and Recreation Guidelines',
    summary:
      'Rules for public access to forests for recreational activities like hiking, camping, and wildlife observation.',
    details:
      'Designated trails and campsites must be used. Motorized vehicles are restricted to marked roads. "Leave No Trace" principles are enforced, and all waste must be carried out. Camping is limited to 14 consecutive days in any single location. Specific areas may be temporarily closed to protect wildlife during breeding seasons.',
  },
  {
    id: 'reg-005',
    title: 'Carbon Sequestration and Credit Act',
    summary:
      'Establishes a framework for forestry projects to generate carbon credits through verified carbon sequestration.',
    details:
      'This act defines the methodologies for measuring carbon stored in forests, sets up a national registry for carbon credits, and provides financial incentives for landowners who convert their land to permanent forest cover or adopt improved forest management practices that increase carbon stocks.',
  },
];

export default function RegulationsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">
          Forestry Regulations
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          An overview of key policies and legal frameworks governing our forests.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {regulations.map((reg) => (
          <AccordionItem value={reg.id} key={reg.id}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-4">
                <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="font-headline text-lg">{reg.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pl-9">
              <p className="font-semibold text-foreground/90">{reg.summary}</p>
              <p className="text-foreground/70">{reg.details}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
