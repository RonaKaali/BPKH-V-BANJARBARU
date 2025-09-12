'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useState } from 'react';

export default function AppointmentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [appointmentMessage, setAppointmentMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAppointmentMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, date, purpose }),
      });

      const result = await response.json();

      if (response.ok) {
        setAppointmentMessage('Janji temu Anda berhasil dibuat!');
        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setPurpose('');
      } else {
        setIsError(true);
        setAppointmentMessage(result.message || 'Terjadi kesalahan saat membuat janji temu.');
      }
    } catch (error) {
      setIsError(true);
      setAppointmentMessage('Tidak dapat terhubung ke server.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
       <div
        className="fixed inset-0 z-[-1] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(/images/forest-left.jpg), url(/images/forest-right.jpg)',
          backgroundPosition: 'left center, right center',
          backgroundRepeat: 'no-repeat, no-repeat',
        }}
      />
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary text-center">
            Buat Janji Temu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" placeholder="Masukkan nama Anda" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Masukkan email Anda" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" placeholder="Masukkan nomor telepon Anda" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Keperluan</Label>
              <Textarea id="purpose" placeholder="Tuliskan keperluan Anda" className="min-h-[100px]" value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Buat Janji Temu'}
            </Button>
            {appointmentMessage && (
              <p className={`mt-4 text-sm text-center font-medium ${isError ? 'text-red-500' : 'text-green-500'}`}>
                {appointmentMessage}
              </p>
            )}
          </form>
            <div className="mt-4 text-center">
                <Button asChild variant="link">
                    <Link href="/">Kembali ke Beranda</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
