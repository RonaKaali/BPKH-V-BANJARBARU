'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

// Tipe data yang sama seperti di server component
interface Feedback {
  _id: string;
  name: string;
  message: string;
  timestamp: Date;
}

interface FeedbackClientProps {
  initialFeedbacks: Feedback[];
}

// Ini adalah Client Component yang menangani semua interaksi pengguna
export function FeedbackClient({ initialFeedbacks }: FeedbackClientProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedbackMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      const result = await response.json();

      if (response.ok) {
        setFeedbackMessage('Pesan Anda berhasil terkirim! Terima kasih.');
        setName('');
        setMessage('');

        // Optimistic UI Update: Tambahkan feedback baru ke state secara langsung
        // daripada fetch ulang semua data.
        setFeedbacks([result.newFeedback, ...feedbacks]);

        // Refresh data di server secara perlahan di background
        startTransition(() => {
          router.refresh();
        });

      } else {
        setIsError(true);
        setFeedbackMessage(result.message || 'Terjadi kesalahan saat mengirim.');
      }
    } catch (error) {
      setIsError(true);
      setFeedbackMessage('Tidak dapat terhubung ke server.');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Formulir Masukan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Anda</Label>
              <Input 
                id="name" 
                placeholder="Masukkan nama Anda" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan Anda</Label>
              <Textarea 
                id="message" 
                placeholder="Tuliskan pesan, kritik, atau saran Anda di sini..." 
                className="min-h-[120px]" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isPending}>
              {isPending ? 'Mengirim...' : 'Kirim Pesan'}
            </Button>
            {feedbackMessage && (
              <p className={`mt-4 text-sm text-center font-medium ${isError ? 'text-red-500' : 'text-green-500'}`}>
                {feedbackMessage}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-2">
        <h3 className="text-2xl font-bold text-primary mb-4">Masukan yang Telah Diterima</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 border-l-2 border-primary/10 pl-4">
          {feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <Card key={fb._id} className="bg-card/50">
                <CardContent className="pt-4">
                  <p className="font-semibold text-primary">{fb.name}</p>
                  <p className="text-foreground/80 mt-2">{fb.message}</p>
                  <p className="text-xs text-foreground/60 mt-2">
                    {new Date(fb.timestamp).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-foreground/80 italic">Belum ada masukan yang diterima.</p>
          )}
        </div>
      </div>
    </div>
  );
}
