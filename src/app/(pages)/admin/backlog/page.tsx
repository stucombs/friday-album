'use client';

import { Home, Footer, NoAccess, Loader, AlbumLog } from '@components';
import { getAlbumBacklog } from '@lib/services/albums.service';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

function BackLog() {
  const { data: session, status } = useSession();
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true);
      try {
        const result = await getAlbumBacklog(page, 6);
        setAlbums(result.data);
        setMeta(result?.meta);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadAlbums();
  }, [page]);

  const nextPage = (): void => {
    if (page < meta.totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = (): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (status === 'unauthenticated') return <NoAccess></NoAccess>;

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <Link href="/admin">RETURN TO ADMIN</Link>
        <h3>ALBUM BACKLOG</h3>
        {loading && <Loader></Loader>}
        {error && <p className="error">{error}</p>}
        {!loading &&
          !error &&
          albums.map((album: IAlbum) => (
            <AlbumLog data={album} key={album.id}></AlbumLog>
          ))}
        <div className="flex flex-row gap-y-10">
          {page > 1 && (
            <button type="button" className="btn btn-info" onClick={prevPage}>
              &lt;&nbsp;Previous
            </button>
          )}
          {page < meta.totalPages && (
            <button type="button" className="btn btn-info" onClick={nextPage}>
              Next&nbsp;&gt;
            </button>
          )}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default function Backlog() {
  return (
    <SessionProvider>
      <BackLog />
    </SessionProvider>
  );
}
