'use client';

import { Footer, Home, AddAlbumForm, NoAccess } from '@components';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';

function AddAlbum() {
  const { status } = useSession();

  if (status === 'unauthenticated') return <NoAccess></NoAccess>;

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <Link href="/admin">RETURN TO ADMIN</Link>
        <h3>Add a new Album</h3>
        <AddAlbumForm></AddAlbumForm>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default function AuthWrapper() {
  return (
    <SessionProvider>
      <AddAlbum />
    </SessionProvider>
  );
}
