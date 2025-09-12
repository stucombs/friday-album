'use client';
import { useRouter } from 'next/navigation';

import { Home } from '../home';

export default function NoAccess() {
  const router = useRouter();

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>You do not have access to this page</h3>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => router.push('/api/auth/signin')}
        >
          Yes I do
        </button>
      </main>
    </div>
  );
}
