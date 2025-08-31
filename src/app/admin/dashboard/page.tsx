'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Trash2 } from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  purpose: string;
  status: string;
}

interface Feedback {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Gagal mengambil data janji temu');
      const data = await response.json();
      setAppointments(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback/list');
      if (!response.ok) throw new Error('Gagal mengambil data masukan');
      const data = await response.json();
      setFeedbacks(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAppointments(), fetchFeedbacks()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error('Gagal memperbarui status');
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus masukan ini?')) return;
    try {
      const response = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Gagal menghapus masukan');
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'On Going': return 'secondary';
      case 'Done': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Daftar Janji Temu</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Memuat data...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Keperluan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((appt) => (
                    <TableRow key={appt.id}>
                      <TableCell>{appt.name}</TableCell>
                      <TableCell>{appt.email}</TableCell>
                      <TableCell>{appt.phone}</TableCell>
                      <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                      <TableCell>{appt.purpose}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Badge variant={getStatusVariant(appt.status)}>{appt.status}</Badge>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleStatusChange(appt.id, 'Pending')}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(appt.id, 'On Going')}>On Going</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(appt.id, 'Done')}>Done</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="text-center">Belum ada janji temu.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Daftar Pengaduan, Masukan, dan Saran</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Memuat data...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Pesan</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb) => (
                    <TableRow key={fb.id}>
                      <TableCell>{fb.name}</TableCell>
                      <TableCell>{fb.message}</TableCell>
                      <TableCell>{new Date(fb.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteFeedback(fb.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={4} className="text-center">Belum ada masukan.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
