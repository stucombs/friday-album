'use client';

import { AddAlbumForm } from '@components/album-form';

export function EditAlbum({
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
        id={`edit-album-modal-checkbox-${data.id}`}
        className="modal-toggle"
        checked={isOpen}
        onChange={onClose}
      />
      <dialog id={`edit-album-modal-${data.id}`} className="modal">
        <div className="modal-box" style={{ minWidth: '50vw' }}>
          <h3 className="font-bold text-lg">Edit Album {data.title}</h3>
          <br />
          {isOpen && <AddAlbumForm data={data}></AddAlbumForm>}
          <div className="modal-action">
            <form method="dialog">
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
