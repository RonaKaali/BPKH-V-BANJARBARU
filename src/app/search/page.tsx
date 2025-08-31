
import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Mencari...</div>}>
      <SearchResults />
    </Suspense>
  );
}
