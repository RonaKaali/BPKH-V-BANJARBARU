'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, FormEvent } from 'react';

export default function AppointmentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, date, purpose }),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus('success');
      setMessage(data.message);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setPurpose('');
    } else {
      setStatus('error');
      setMessage(data.message || 'Terjadi kesalahan saat mengirim permintaan.');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Buat Janji Temu Online
          </CardTitle>
          <CardDescription>
            Silakan isi formulir di bawah ini untuk membuat janji temu dengan staf kami.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama lengkap Anda" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Alamat Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contoh@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="081234567890" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal Janji Temu</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Keperluan</Label>
              <Textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Jelaskan keperluan Anda secara singkat"
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={status === 'loading'}>
              {status === 'loading' ? 'Mengirim...' : 'Kirim Permintaan'}
            </Button>
          </form>
          {message && (
            <div className={`mt-4 text-center p-2 rounded-md ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
