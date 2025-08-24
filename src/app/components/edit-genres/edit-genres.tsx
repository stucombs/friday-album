'use client';
import { createGenre, deleteGenre } from '@/lib/services/genre.service';
import { IGenre } from '@/types';
import { useState  } from 'react';
import { Loader } from '@/app/components';
import styles from './edit-genres.module.css';

export default function EditGenres ({ isOpen, onClose, genres, onChanged }: {
  isOpen: boolean,
  onClose: () => void,
  genres: IGenre[],
  onChanged: () => void
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
      setLoading(false);
    } catch(err: any) {
      console.error(err.message);
      setError("Failed to delete genre");
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
      setSuccess('Genre added successfully');
      setGenreInput('');
      onChanged();
      setLoading(false);
    } catch(err: any) {
      if( err?.code === "23505" ){
        setError("Genre aleady exists");
      } else {
        setError("Failed to add genre");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" checked={isOpen} onChange={onClose} />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Genres</h3>
          <br />
          { loading && <Loader></Loader>}
          <div className={styles.list}>
            { genres.map(genre => (
              <div key={genre.id} className={styles['genre-item']}>
                <button className="btn btn-sm btn-outline btn-error" onClick={() => removeGenre(genre.id)}>
                  X
                </button>
                <p className={styles.capitalize}>{ genre.name }</p>
              </div>
            ))}
          </div>
          <br />
          <div className={styles.add}>
            <input
              type="text"
              placeholder="Add Genre"
              className="input input-md col-50"
              id="genre"
              name="genre"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
            />
            <button type="button" className="btn btn-sm btn-success" disabled={loading} onClick={submitGenre}>
              Add
            </button>
          </div>
          { error && <span className="error">{ error }</span> }
          { success && <span className="success">{ success }</span>}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={onClose} disabled={loading}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
