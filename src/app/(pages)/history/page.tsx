'use client';
import { useEffect, useState } from 'react';

import { Footer, Home, Album, Loader } from '@/app/components';
import { getPastAlbums } from '@/lib/services/albums.service';
import { IAlbum } from '@/types/common';

export default function History() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true);
      try {
        const result = await getPastAlbums(page, 5);
        setAlbums(result?.data);
        setMeta(result?.meta);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadAlbums();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (error) {
    return (
      <div className="page">
        <main className="main">
          <Home></Home>
          <h3>ALBUM HISTORY</h3>
          <p className="error">
            An error occured loading albums, please try again.
          </p>
        </main>
        <Footer></Footer>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page">
        <main className="main">
          <Home></Home>
          <h3>ALBUM HISTORY</h3>
          <Loader></Loader>
        </main>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>ALBUM HISTORY</h3>
        {albums.map((album: IAlbum) => (
          <Album data={album} key={album.id}></Album>
        ))}
        <div className="flex flex-row gap-4">
          {page > 1 && (
            <button
              type="button"
              className="btn btn-md btn-info"
              onClick={prevPage}
            >
              &lt;&nbsp;Previous
            </button>
          )}
          {page < meta.totalPages && (
            <button
              type="button"
              className="btn btn-md btn-info"
              onClick={nextPage}
            >
              Next&nbsp;&gt;
            </button>
          )}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
