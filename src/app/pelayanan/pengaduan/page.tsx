
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PengaduanMasyarakatPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ 
          name, 
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFeedbackMessage('Pesan Anda telah berhasil dikirim. Terima kasih!');
        setName('');
        setMessage('');
      } else {
        setIsError(true);
        setFeedbackMessage(result.message || 'Terjadi kesalahan saat mengirim pesan.');
      }
    } catch (error) {
      setIsError(true);
      setFeedbackMessage('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Pengaduan, Masukan, dan Saran</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-foreground/80">
            Kami berkomitmen untuk memberikan pelayanan terbaik. Jika Anda memiliki keluhan, kritik, atau saran terkait pelayanan kami, silakan sampaikan melalui formulir di bawah ini.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" placeholder="Masukkan nama Anda" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea id="message" rows={6} placeholder="Tuliskan pesan Anda secara rinci" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <div className="text-right">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </div>
            {feedbackMessage && (
              <div className={`mt-4 text-center p-4 rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                <p>{feedbackMessage}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
