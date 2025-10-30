'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  initialImageUrl?: string | null;
}

export function ImageUpload({ onUploadSuccess, initialImageUrl }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast(); // FIX: Changed toast to addToast

  const handleFileChange = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      const errorMessage = 'File harus berupa gambar (JPG, PNG, GIF, dll.)';
      setError(errorMessage);
      addToast(errorMessage, 'error'); // FIX: Call addToast correctly
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Gagal mengunggah gambar');
      }

      setPreviewUrl(result.url);
      onUploadSuccess(result.url);
      // FIX: Call addToast with message and type
      addToast("Gambar telah berhasil diunggah.", 'success');

    } catch (err: any) {
      setError(err.message);
      // FIX: Call addToast with message and type
      addToast(err.message || "Terjadi kesalahan saat mengunggah.", 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div>
        <label 
            htmlFor="image-upload" 
            className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {previewUrl ? (
                <img src={previewUrl} alt="Pratinjau Gambar" className="object-contain w-full h-full rounded-lg" />
            ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <svg className="w-10 h-10 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9l-5 5-5-5"></path></svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan letakkan</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 800x400px)</p>
                </div>
            )}
            
            {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span className="ml-3 text-white">Mengunggah...</span>
                </div>
            )}

            <input id="image-upload" type="file" className="hidden" onChange={handleInputChange} accept="image/*" disabled={uploading} />
        </label>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
