'use client';

import { EditAlbum } from '@components/edit-album';
import { useState } from 'react';

export default function AlbumLog({
  data,
  loading,
  toggleRefresh,
  onPromoteAlbum,
  onDeleteAlbum
}: {
  data: IAlbum;
  loading: boolean;
  toggleRefresh: () => void;
  onPromoteAlbum: () => void;
  onDeleteAlbum: () => void;
}) {
  const [editAlbum, setEditAlbum] = useState(false);

  return (
    <>
      {editAlbum && (
        <EditAlbum
          isOpen={editAlbum}
          data={data}
          onClose={() => {
            setEditAlbum(false);
            toggleRefresh();
          }}
        ></EditAlbum>
      )}
      <div className="card-xl card-width bg-base-300">
        <div className="p-3 gap-2 flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <p className="card-title">{data?.title}</p>
            <p className="italic">{data?.artist}</p>
            <p>Released: {data?.release_year}</p>
            <p className="capitalize">Genre: {data?.genre.name}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div>
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={() => onPromoteAlbum()}
                disabled={!data || loading}
              >
                PROMOTE
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-info"
                onClick={() => setEditAlbum(true)}
                disabled={!data || loading}
              >
                EDIT
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-error"
                onClick={() => onDeleteAlbum()}
                disabled={!data || loading}
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
