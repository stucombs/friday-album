'use client';
import { useEffect, useState } from 'react';
import styles from './add-album.module.css';
import { getGenres } from '@/lib/services/genre.service';
import { createAlbum } from '@/lib/services/albums.service';
import { IGenre } from '@/types';

export default function AddAlbumForm () {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        release_year: '',
        genre_id: '',
        number_tracks: '',
        am_link: '',
        spotify_link: '',
        cover_url: ''
    });

    useEffect(() => {
        const loadGenres = async () => {
            try {
                setLoading(true);
                const data = await getGenres();

                setGenres(data);
                setLoading(false);
            } catch(err: any) {
                console.error(err.message);
                setError(err.message);
                setLoading(false);
            }
        };

        loadGenres();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelectGenre = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        e.preventDefault();
        console.log("[VALUE] ", e.target.value);
        setFormData(prev => ({
            ...prev,
            genre_id: e.target.value
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="form-submit">
            <div className="input-el">
                <label className="form-label" htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-input col-75"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-el">
                <label>Artist</label>
                <input
                    type="text"
                    className="form-input col-75"
                    name="artist"
                    id="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-el">
                <label>Release Year</label>
                <input
                    type="number"
                    className="form-input col-25"
                    name="release_year"
                    id="release_year"
                    value={formData.release_year}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-el">
                <label>Genre</label>
                <select
                    className="form-input col-50"
                    name="genre_id"
                    id="genre_id"
                    onSelect={handleSelectGenre}
                    required>
                        <option></option>
                        { genres.map(genre =>
                            <option value={genre.id} key={genre.id} className={styles.capitalize}>
                                { genre.name }
                            </option>
                        )}
                </select>
                <button type="button" className={styles['plain-link']}>Edit Genres</button>
            </div>
            <div className="input-el">
                <label>Number of Tracks</label>
                <input
                    type="number"
                    className="form-input col-25"
                    name="number_tracks"
                    id="number_tracks"
                    value={formData.number_tracks}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                Submit
            </button>
        </form>
    );
}
