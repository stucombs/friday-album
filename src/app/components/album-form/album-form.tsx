'use client';

import { EditGenres } from '@components/edit-genres';
import { createAlbum, editAlbum } from '@lib/services/albums.service';
import { getGenres } from '@lib/services/genre.service';
import { useEffect, useState } from 'react';

const intialState = {
  title: '',
  artist: '',
  release_year: '',
  genre_id: 0,
  am_link: '',
  spotify_link: '',
  cover_url: ''
};

export default function AddAlbumForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [formData, setFormData] = useState(intialState);
  const [editGenres, setEditGenres] = useState(false);

  useEffect(() => {
    loadGenres();
    if (data) {
      setFormData((prev) => ({
        ...prev,
        ...data
      }));
    }
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(true);
      const data = await getGenres();

      setGenres(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.details);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    setError('');
    setSuccess(false);

    if (!validateMusicUrls()) return false;

    if (data) {
      try {
        await editAlbum(formData);
        setSuccess(true);
        setLoading(false);
      } catch (err: any) {
        console.error(err.message);
        setError(err.details);
        setLoading(false);
      }

      return;
    }

    const response = await createAlbum(formData);

    if (response.error) {
      setError(response.error.details);
      setLoading(false);
    }

    if (response.data) {
      setSuccess(true);
      setLoading(false);
      setFormData(intialState);
    }
  };

  const validateMusicUrls = (): boolean => {
    let pattern: RegExp;

    // Check AppleMusic link
    pattern = /^https:\/\/music\.apple\.com\/.*album.*$/;
    if (!pattern.test(formData.am_link)) {
      setError(
        'Apple Music link does not appear to be a valid link to an album'
      );
      setLoading(false);
      return false;
    }

    // Check Spotify link
    pattern = /^https:\/\/open\.spotify\.com\/album\/.+/;
    if (!pattern.test(formData.spotify_link)) {
      setError('Spotify link does not appear to be a valid link to an album');
      setLoading(false);
      return false;
    }

    return true;
  };

  const autopopulateAlbumForm = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setLoading(true);
    setFormData((prev) => ({
      ...prev,
      am_link: e.target.value
    }));
    try {
      const res = await fetch(`/api/get-album`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: e.target.value
        })
      });

      const { data } = await res.json();

      setFormData((prev) => ({
        ...prev,
        spotify_link: data.spotify_link,
        cover_url: data.cover_url,
        title: data.title,
        artist: data.artist
      }));
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      {genres && editGenres && (
        <EditGenres
          isOpen={editGenres}
          onClose={() => setEditGenres(false)}
          genres={genres}
          onChanged={() => loadGenres()}
        ></EditGenres>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-[32vw]"
      >
        <input
          type="text"
          placeholder="Title"
          className="input input-md w-full"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          type="text"
          className="input input-md w-full"
          placeholder="Artist"
          name="artist"
          id="artist"
          value={formData.artist}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <div className="flex flex-row gap-4">
          <select
            value={formData.genre_id}
            className="select col-3/4"
            onChange={handleChange}
            id="genre_id"
            name="genre_id"
            disabled={loading}
            required
          >
            <option disabled={true} value="0">
              Select a genre
            </option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          {/* Hide the 'edit genres' if editing an existing album */}
          {!data && (
            <button
              type="button"
              className="plain-link"
              onClick={() => setEditGenres(true)}
              disabled={loading}
            >
              Edit Genres
            </button>
          )}
        </div>
        <div className="flex flex-row gap-4">
          <input
            type="number"
            className="input input-md col-1/4"
            placeholder="Release Year"
            min="1900"
            max="2100"
            name="release_year"
            id="release_year"
            value={formData.release_year}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <input
          type="text"
          className="input input-md w-full"
          placeholder="Cover URL"
          name="cover_url"
          id="cover_url"
          value={formData.cover_url}
          onChange={handleChange}
          disabled={loading}
        />
        {formData.cover_url && (
          <img
            id="cover_preview"
            src={formData.cover_url}
            alt="Cover Preview"
            height={90}
            width={90}
            onError={(e) => {
              e.currentTarget.src = '';
              setError('Invalid Image URL');
            }}
          />
        )}
        <input
          type="text"
          className="input input-md w-full"
          placeholder="Apple Music Link"
          name="am_link"
          id="am_link"
          value={formData.am_link}
          onChange={autopopulateAlbumForm}
          disabled={loading}
        />
        <input
          type="text"
          className="input input-md w-full"
          placeholder="Spotify Link"
          name="spotify_link"
          id="spotify_link"
          value={formData.spotify_link}
          onChange={handleChange}
          disabled={loading}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-active btn-success"
            disabled={loading}
          >
            Submit
            {loading && (
              <span className="loading loading-spinner text-success"></span>
            )}
          </button>
        </div>
        {success && (
          <div role="alert" className="alert alert-success">
            <span>✅ Album edited successfully</span>
          </div>
        )}
        {error && (
          <div role="alert" className="alert alert-error">
            <span>❌ {error}</span>
          </div>
        )}
      </form>
    </>
  );
}
