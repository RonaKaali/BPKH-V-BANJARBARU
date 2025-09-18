'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

interface Feedback {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function PelayananPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a: Feedback, b: Feedback) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setFeedbacks(sortedData);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
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

      if (response.ok) {
        setFeedbackMessage('Pesan Anda berhasil terkirim! Terima kasih.');
        setName('');
        setMessage('');
        fetchFeedbacks(); // Refresh the list
      } else {
        const result = await response.json();
        setIsError(true);
        setFeedbackMessage(result.message || 'Terjadi kesalahan saat mengirim.');
      }
    } catch (error) {
      setIsError(true);
      setFeedbackMessage('Tidak dapat terhubung ke server.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
        <CardHeader className="mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-600/10 rounded-full">
                    <MessageSquare className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-orange-600 tracking-tight">Pengaduan / Masukan / Saran</CardTitle>
            </div>
            <p className="text-muted-foreground pt-2">Kami sangat menghargai setiap masukan, saran, atau pengaduan dari Anda untuk perbaikan layanan kami.</p>
        </CardHeader>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                        Formulir Kritik & Saran
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" placeholder="Masukkan nama Anda" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Pesan</Label>
                            <Textarea id="message" placeholder="Tuliskan kritik, saran, atau pengaduan Anda" className="min-h-[120px]" value={message} onChange={(e) => setMessage(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                        </Button>
                        {feedbackMessage && (
                        <p className={`mt-4 text-sm text-center font-medium ${isError ? 'text-red-500' : 'text-green-500'}`}>
                            {feedbackMessage}
                        </p>
                        )}
                    </form>
                </CardContent>
            </Card>
            
            <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Pesan yang Telah Masuk</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                    {feedbacks.length > 0 ? (
                        feedbacks.map((fb) => (
                        <Card key={fb.id}>
                            <CardContent className="pt-4">
                            <p className="font-semibold">{fb.name}</p>
                            <p className="text-foreground/80 mt-2">{fb.message}</p>
                            <p className="text-xs text-foreground/60 mt-2">{new Date(fb.timestamp).toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        ))
                    ) : (
                        <p className="text-foreground/80">Belum ada pesan yang masuk.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
