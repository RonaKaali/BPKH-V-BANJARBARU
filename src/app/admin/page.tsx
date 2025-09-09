
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Definisikan tipe untuk objek feedback
interface Feedback {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

// Definisikan tipe untuk objek appointment
interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  purpose: string;
  status: 'pending' | 'on going' | 'done'; // Tambahkan status
}

export default function AdminPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [view, setView] = useState('feedback');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fungsi untuk mengambil data feedback
  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      if (!res.ok) throw new Error('Gagal mengambil data saran & masukan');
      const data = await res.json();
      setFeedback(data.sort((a: Feedback, b: Feedback) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui saat mengambil feedback');
      }
    }
  };

  // Fungsi untuk mengambil data janji temu
  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (!res.ok) throw new Error('Gagal mengambil data janji temu');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui saat mengambil janji temu');
      }
    }
  };

  // Ambil semua data saat komponen dimuat
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchFeedback(), fetchAppointments()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  // Handler untuk mengubah status janji temu
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchAppointments(); // Muat ulang data janji temu
      } else {
        const data = await res.json();
        alert(`Gagal memperbarui status: ${data.message}`);
      }
    } catch (err) {
      alert('Terjadi kesalahan saat memperbarui status.');
    }
  };
  
    // Fungsi untuk menghapus feedback
  const handleDeleteFeedback = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus saran & masukan ini?')) {
      try {
        const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchFeedback();
        } else {
          const data = await res.json();
          alert(`Gagal menghapus: ${data.message}`);
        }
      } catch (err) {
        alert('Terjadi kesalahan saat menghapus saran & masukan.');
      }
    }
  };


  // Fungsi untuk logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      alert('Gagal logout');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>Logout</button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setView('feedback')} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontWeight: view === 'feedback' ? 'bold' : 'normal' }}>Lihat Saran & Masukan</button>
        <button onClick={() => setView('appointments')} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontWeight: view === 'appointments' ? 'bold' : 'normal' }}>Lihat Janji Temu</button>
      </div>

      {loading && <p>Memuat...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {view === 'feedback' && (
        <div>
          <h2>Daftar Saran & Masukan</h2>
           <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pesan</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Waktu</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {feedback.length > 0 ? (
                feedback.map((fb) => (
                  <tr key={fb.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{fb.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{fb.message}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(fb.timestamp).toLocaleString('id-ID')}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                      <button onClick={() => handleDeleteFeedback(fb.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    Belum ada saran & masukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === 'appointments' && (
        <div>
          <h2>Daftar Janji Temu</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Telepon</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tanggal</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Keperluan</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appt.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appt.phone}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(appt.date).toLocaleDateString('id-ID')}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appt.purpose}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <select
                        value={appt.status}
                        onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                        style={{ padding: '5px' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="on going">On Going</option>
                        <option value="done">Done</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    Belum ada janji temu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
