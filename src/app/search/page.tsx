'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchResult {
  title: string;
  summary: string;
  href: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary">Hasil Pencarian</h1>
      <p className="mt-2 text-muted-foreground">Menampilkan hasil untuk: "{query}"</p>

      {loading ? (
        <p className="mt-8">Mencari...</p>
      ) : (
        <div className="mt-8 space-y-6">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.href} className="border-b pb-4">
                <a href={result.href} className="text-xl font-semibold text-primary hover:underline">
                  {result.title}
                </a>
                <p className="mt-2 text-muted-foreground">{result.summary}</p>
              </div>
            ))
          ) : (
            <p>Tidak ada hasil yang ditemukan.</p>
          )}
        </div>
      )}
    </div>
  );
}
