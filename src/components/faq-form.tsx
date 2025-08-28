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
      message: 'Pertanyaan Anda harus memiliki panjang minimal 10 karakter.',
    })
    .max(500, {
      message: 'Pertanyaan Anda tidak boleh lebih dari 500 karakter.',
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
        title: 'Terjadi kesalahan',
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
          <CardTitle className="font-headline">Ajukan pertanyaan</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pertanyaan Anda</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="contoh: Apa aturan untuk berkemah di hutan nasional?"
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
                Dapatkan Jawaban
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 flex items-center justify-center gap-3 text-foreground/80">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Menghasilkan jawaban...</span>
        </div>
      )}

      {response && (
        <div className="mt-8">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-primary">
                <Lightbulb className="h-6 w-6" />
                Jawaban Dihasilkan oleh AI
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
