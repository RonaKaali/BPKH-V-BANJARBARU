'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb } from 'lucide-react';
import { submitQuery } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const FaqFormSchema = z.object({
  query: z
    .string()
    .min(10, {
      message: 'Your query must be at least 10 characters long.',
    })
    .max(500, {
      message: 'Your query cannot be more than 500 characters.',
    }),
});

type FaqFormValues = z.infer<typeof FaqFormSchema>;

export default function FaqForm() {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(FaqFormSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(data: FaqFormValues) {
    setIsLoading(true);
    setResponse(null);

    const result = await submitQuery(data.query);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    } else if (result.answer) {
      setResponse(result.answer);
      form.reset();
    }

    setIsLoading(false);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., What are the rules for camping in national forests?"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Get Answer
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 flex items-center justify-center gap-3 text-foreground/80">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Generating answer...</span>
        </div>
      )}

      {response && (
        <div className="mt-8">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-primary">
                <Lightbulb className="h-6 w-6" />
                AI Generated Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 whitespace-pre-wrap">{response}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
