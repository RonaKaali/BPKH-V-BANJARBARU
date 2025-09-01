
// Data feedback sementara di dalam memori
let feedbackData: any[] = [
  { id: '1', name: 'Budi', message: 'Website ini sangat informatif!', timestamp: new Date().toISOString() },
  { id: '2', name: 'Ani', message: 'Tampilannya bagus dan mudah digunakan.', timestamp: new Date().toISOString() },
];

// --- Fungsi Feedback (Versi Lokal) ---

// Fungsi untuk membaca semua feedback
export async function getFeedback() {
  // Mengembalikan data dari array lokal
  return feedbackData;
}

// Fungsi untuk menambah feedback baru
export async function addFeedback(feedback: any) {
  const newFeedback = {
    id: (feedbackData.length + 1).toString(),
    ...feedback,
    timestamp: new Date().toISOString()
  };
  feedbackData.push(newFeedback);
  return newFeedback;
}

// Fungsi untuk menghapus feedback berdasarkan ID
export async function deleteFeedbackById(id: string) {
  const initialLength = feedbackData.length;
  feedbackData = feedbackData.filter((fb: any) => fb.id !== id);
  // Mengembalikan true jika ada yang terhapus, false jika tidak
  return feedbackData.length < initialLength;
}
