'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

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
  status: 'Pending' | 'On Going' | 'Done';
}

// Definisikan tipe untuk objek survei
interface Survey {
  _id: string;
  name: string;
  age: string;
  gender: string;
  education: string;
  occupation: string;
  createdAt: string;
  [key: string]: any; // Untuk menampung jawaban-jawaban survei
}

export default function AdminPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [surveiIpk, setSurveiIpk] = useState<Survey[]>([]);
  const [surveiSkm, setSurveiSkm] = useState<Survey[]>([]);
  const [view, setView] = useState('feedback');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const ipkQuestionHeaders = Array.from({ length: 9 }, (_, i) => `u${i + 1}`);
  const skmQuestionHeaders = Array.from({ length: 9 }, (_, i) => `p${i + 1}`);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      if (!res.ok) throw new Error('Gagal mengambil data saran & masukan');
      const data = await res.json();
      setFeedback(data.sort((a: Feedback, b: Feedback) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui saat mengambil feedback');
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (!res.ok) throw new Error('Gagal mengambil data janji temu');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui saat mengambil janji temu');
    }
  };

  const fetchSurveiIpk = async () => {
    try {
      const res = await fetch('/api/survei/ipk');
      if (!res.ok) throw new Error('Gagal mengambil data survei IPK');
      const data = await res.json();
      setSurveiIpk(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui saat mengambil survei IPK');
    }
  };

  const fetchSurveiSkm = async () => {
    try {
      const res = await fetch('/api/survei/skm');
      if (!res.ok) throw new Error('Gagal mengambil data survei SKM');
      const data = await res.json();
      setSurveiSkm(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui saat mengambil survei SKM');
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError('');
      await Promise.all([fetchFeedback(), fetchAppointments(), fetchSurveiIpk(), fetchSurveiSkm()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'Pending' | 'On Going' | 'Done') => {
    const previousAppointments = appointments;
    const newAppointments = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(newAppointments);

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        setAppointments(previousAppointments);
        alert(`Gagal memperbarui status: ${data.message || 'Kesalahan tidak diketahui'}`);
      }
    } catch (err) {
      setAppointments(previousAppointments);
      alert('Terjadi kesalahan saat memperbarui status. Periksa koneksi Anda.');
      console.error(err);
    }
  };

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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      alert('Gagal logout');
    }
  };

  const exportToExcel = (data: any[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>Logout</button>
      </div>
      
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <button onClick={() => setView('feedback')} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontWeight: view === 'feedback' ? 'bold' : 'normal' }}>Lihat Saran & Masukan</button>
        <button onClick={() => setView('appointments')} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontWeight: view === 'appointments' ? 'bold' : 'normal' }}>Lihat Janji Temu</button>
        <button onClick={() => setView('survei-ipk')} style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', fontWeight: view === 'survei-ipk' ? 'bold' : 'normal' }}>Lihat Survei IPK</button>
        <button onClick={() => setView('survei-skm')} style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', fontWeight: view === 'survei-skm' ? 'bold' : 'normal' }}>Lihat Survei SKM</button>
      </div>

      {loading && <p>Memuat...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {view === 'feedback' && (
        <div>
          <h2>Daftar Saran & Masukan</h2>
          <div style={{ overflowX: 'auto'}}>
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
        </div>
      )}

      {view === 'appointments' && (
        <div>
          <h2>Daftar Janji Temu</h2>
          <div style={{ overflowX: 'auto'}}>
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
                          onChange={(e) => handleStatusChange(appt.id, e.target.value as 'Pending' | 'On Going' | 'Done')}
                          style={{ padding: '5px' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="On Going">On Going</option>
                          <option value="Done">Done</option>
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
        </div>
      )}

      {view === 'survei-ipk' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>Data Survei IPK</h2>
            <button onClick={() => exportToExcel(surveiIpk, 'survei-ipk')} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>Export to Excel</button>
          </div>
          <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
            Keterangan Nilai: 1 = Sangat Tidak Setuju, 2 = Tidak Setuju, 3 = Setuju, 4 = Sangat Setuju
          </p>
          <div style={{overflowX: 'auto'}}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Umur</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Jenis Kelamin</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pendidikan</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pekerjaan</th>
                    {ipkQuestionHeaders.map(key => (
                        <th key={key} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{key.toUpperCase()}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {surveiIpk.length > 0 ? (
                    surveiIpk.map((survey) => (
                    <tr key={survey._id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.age}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.gender}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.education}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.occupation}</td>
                        {ipkQuestionHeaders.map(key => (
                            <td key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>{survey[key]}</td>
                        ))}
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={14} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                        Belum ada data survei.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'survei-skm' && (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Data Survei SKM</h2>
                <button onClick={() => exportToExcel(surveiSkm, 'survei-skm')} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>Export to Excel</button>
            </div>
            <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
              Keterangan Nilai: 1 = Tidak Baik, 2 = Kurang Baik, 3 = Baik, 4 = Sangat Baik
            </p>
            <div style={{overflowX: 'auto'}}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Umur</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Jenis Kelamin</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pendidikan</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pekerjaan</th>
                        {skmQuestionHeaders.map(key => (
                            <th key={key} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{key.toUpperCase()}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {surveiSkm.length > 0 ? (
                        surveiSkm.map((survey) => (
                        <tr key={survey._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.age}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.gender}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.education}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{survey.occupation}</td>
                            {skmQuestionHeaders.map(key => (
                                <td key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>{survey[key]}</td>
                            ))}
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={14} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                            Belum ada data survei.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
        )}

    </div>
  );
}
