'use client';

import { Loader } from '@components';
import { createGenre, deleteGenre } from '@lib/services/genre.service';
import { useState } from 'react';

export function EditGenres({
  isOpen,
  onClose,
  genres,
  onChanged
}: {
  isOpen: boolean;
  onClose: () => void;
  genres: IGenre[];
  onChanged: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [genreInput, setGenreInput] = useState('');

  const removeGenre = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await deleteGenre(id);
      onChanged();
      setSuccess('Genre removed');
      setLoading(false);
    } catch (err: any) {
      setSuccess('');
      console.error(err.messsage);
      setError(err.details);
      setLoading(false);
    }
  };

  const submitGenre = async (): Promise<void> => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await createGenre({
        name: genreInput.toLowerCase()
      });
      setGenreInput('');
      onChanged();
      setSuccess('Genre added successfully');
      setLoading(false);
    } catch (err: any) {
      console.error(err.message);
      setError(err.details);
      setSuccess('');
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        onChange={onClose}
      />
      <dialog id="edit-genre-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">EDIT GENRES</h3>
          <br />
          {loading && <Loader></Loader>}
          <div className="flex flex-col gap-4">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="flex flex-row items-center gap-2.5"
              >
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => removeGenre(genre.id)}
                >
                  X
                </button>
                <p className="capitalize">{genre.name}</p>
              </div>
            ))}
          </div>
          <br />
          <div className="flex flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Add Genre"
              className="input input-md w-1/2"
              id="genre"
              name="genre"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-sm btn-soft btn-success"
              disabled={loading}
              onClick={submitGenre}
            >
              ADD
            </button>
          </div>
          <div className="flex flex-col mt-3">
            {error && (
              <div role="alert" className="alert alert-error">
                <span>❌ {error}</span>
              </div>
            )}
            {success && (
              <div role="alert" className="alert alert-success">
                <span>✅ {success}</span>
              </div>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={onClose} disabled={loading}>
                CLOSE
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
