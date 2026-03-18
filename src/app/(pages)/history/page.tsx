'use client';

import { Footer, Home, Album, Loader, AlbumModal } from '@components';
import { getPastAlbums, getRandomAlbum } from '@lib/services/albums.service';
import { ArrowBigLeft, ArrowBigRight, Shuffle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function History() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [randomAlbum, setRandomAlbum] = useState<IAlbum>();
  const [albumModal, setAlbumModal] = useState(false);

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

  const onSelectRandomAlbum = async () => {
    setLoading(true);
    const result = await getRandomAlbum(true);
    setRandomAlbum(result);
    setAlbumModal(true);
    setLoading(false);
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
        <button
          type="button"
          className="btn btn-md btn-success"
          onClick={onSelectRandomAlbum}
          disabled={loading}
        >
          PICK A RANDOM ALBUM <Shuffle />
        </button>
        {albums.map((album: IAlbum) => (
          <Album data={album} key={album.id}></Album>
        ))}
        {randomAlbum && (
          <AlbumModal
            isOpen={albumModal}
            data={randomAlbum}
            onClose={() => setAlbumModal(false)}
          ></AlbumModal>
        )}
        <div className="flex flex-row gap-4">
          {page > 1 && (
            <button
              type="button"
              className="btn btn-md btn-info"
              disabled={loading}
              onClick={prevPage}
            >
              <ArrowBigLeft /> Previous
            </button>
          )}
          {page < meta.totalPages && (
            <button
              type="button"
              className="btn btn-md btn-info"
              onClick={nextPage}
            >
              Next <ArrowBigRight />
            </button>
          )}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
