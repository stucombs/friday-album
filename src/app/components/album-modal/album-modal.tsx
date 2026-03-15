'use client';

import { Album, Cover } from '@components';

export function AlbumModal({
  isOpen,
  data,
  onClose
}: {
  isOpen: boolean;
  data: IAlbum;
  onClose: () => void;
}) {
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
              <button className="btn btn-neutral" onClick={onClose}>
                CLOSE
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
