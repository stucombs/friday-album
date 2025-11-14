'use client';

import { Album, Cover } from '@components';
import { promoteAlbum } from '@lib/services/albums.service';
import { useState } from 'react';

export default function AlbumModal({
  isOpen,
  data,
  admin,
  onClose
}: {
  isOpen: boolean;
  data: IAlbum;
  admin: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onPromoteAlbum = async () => {
    setLoading(true);

    try {
      setError('');
      await promoteAlbum(data.id);
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      console.error(err.message);
      const message = `An error occurred promoting album ${data.title}: ${err.detail}`;
      setLoading(false);
      setError(message);
    }
  };
  return (
    <>
      <input
        type="checkbox"
        id={`album-modal-checkbox-${data.id}`}
        className="modal-toggle"
        checked={isOpen}
        onChange={onClose}
      />
      <dialog id={`album-modal-${data.id}`} className="modal">
        <div
          className="modal-box flex flex-col justify-center items-center"
          style={{ minWidth: '50vw', gap: '1em' }}
        >
          <Cover data={data.cover_url}></Cover>
          <Album data={data}></Album>
          <div className="modal-action">
            <form method="dialog" className="flex flex-row gap-4">
              {admin && (
                <button
                  className="btn btn-success"
                  onClick={onPromoteAlbum}
                  disabled={success}
                >
                  Promote
                </button>
              )}
              <button className="btn btn-neutral" onClick={onClose}>
                Close
              </button>
            </form>
          </div>
          {loading && <span className="loading loading-spinner"></span>}
          {success && (
            <div role="alert" className="alert alert-success">
              <span>✅ Album promoted successfully</span>
            </div>
          )}
          {error && (
            <div role="alert" className="alert alert-error">
              <span>❌ {error}</span>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
