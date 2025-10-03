import { Suspense } from 'react';
import { LoadingOverlay } from '@/components';
import TypesClient from './typesClient';


export default function TypesPage() {
  return (
    <Suspense fallback={<LoadingOverlay alt="Loading category" />}> 
      <TypesClient />
    </Suspense>
  );
}
