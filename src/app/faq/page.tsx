import FaqForm from '@/components/faq-form';
import { Bot } from 'lucide-react';

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 p-4 rounded-full">
            <Bot className="h-10 w-10 text-primary"/>
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">
          AI-Powered FAQ
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Have a question about forestry policy or regulations? Ask our AI
          assistant for a clear, concise answer.
        </p>
      </div>
      <FaqForm />
    </div>
  );
}
