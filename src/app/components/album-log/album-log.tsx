'use client';

import { EditAlbum } from '@components/edit-album';
import { promoteAlbum, deleteAlbum } from '@lib/services/albums.service';
import { useState } from 'react';

export default function AlbumLog({ data }: { data: IAlbum }) {
  const [loadingPromote, setLoadingPromote] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [successPromote, setSuccessPromote] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [error, setError] = useState('');
  const [editAlbum, setEditAlbum] = useState(false);

  const onPromoteAlbum = async () => {
    setLoadingPromote(true);
    try {
      setError('');
      await promoteAlbum(data.id);
      setLoadingPromote(false);
      setSuccessPromote(true);
    } catch (err: any) {
      const message = `An error occurred promoting album ${data.id}: ${err.message}`;
      setError(message);
      setLoadingPromote(false);
    }
  };

  const onDeleteAlbum = async () => {
    setLoadingDelete(true);
    try {
      setError('');
      await deleteAlbum(data.id);
      setLoadingDelete(false);
      setSuccessDelete(true);
    } catch (err: any) {
      const message = `An error occurred deleting album ${data.id}: ${err.message}`;
      setError(message);
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <EditAlbum
        isOpen={editAlbum}
        data={data}
        onClose={() => setEditAlbum(false)}
      ></EditAlbum>
      <div className="card-xl card-width bg-base-300">
        <div className="p-3 gap-2 flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <p className="card-title">{data?.title}</p>
            <p className="italic">{data?.artist}</p>
            <p>Released: {data?.release_year}</p>
            <p className="capitalize">Genre: {data?.genre.name}</p>
            <p className="error">{error}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div>
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={onPromoteAlbum}
                disabled={!data || loadingPromote}
              >
                PROMOTE&nbsp;
                {loadingPromote && (
                  <span className="loading loading-spinner"></span>
                )}
                {successPromote && <span>✅</span>}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-info"
                onClick={() => setEditAlbum(true)}
                disabled={!data}
              >
                EDIT
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-error"
                onClick={onDeleteAlbum}
                disabled={!data || loadingDelete}
              >
                DELETE&nbsp;
                {loadingDelete && (
                  <span className="loading loading-spinner"></span>
                )}
                {successDelete && <span>✅</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
