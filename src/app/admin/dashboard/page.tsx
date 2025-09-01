
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
  timestamp: any;
}

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    const fetchFeedback = async () => {
      try {
        const response = await fetch('/api/feedback');
        if (response.ok) {
          const data = await response.json();
          setFeedback(data);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoadingFeedback(false);
      }
    };

    fetchAppointments();
    fetchFeedback();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Janji Temu</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingAppointments ? (
              <p>Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Keperluan</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.name}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.purpose}</TableCell>
                      <TableCell><Badge>{appointment.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saran dan Masukan</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingFeedback ? (
              <p>Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Pesan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedback.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
