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
      // await promoteAlbum(data.id);
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      const message = `An error occurred promoting album ${data.title}: ${err.message}`;
      setError(message);
      setLoading(false);
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
          {success && (
            <span className="success">
              Successfully promote albumt {data.title}
            </span>
          )}
        </div>
      </dialog>
    </>
  );
}
