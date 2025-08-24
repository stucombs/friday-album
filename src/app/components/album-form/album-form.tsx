'use client';
import { useEffect, useState } from 'react';
import styles from './album-form.module.css';
import { getGenres } from '@/lib/services/genre.service';
import { createAlbum } from '@/lib/services/albums.service';
import { IGenre } from '@/types';
import { EditGenres } from '../edit-genres';

const intialState = {
    title: '',
    artist: '',
    release_year: '',
    genre_id: 0,
    number_tracks: '',
    am_link: '',
    spotify_link: '',
    cover_url: ''
};

export default function AddAlbumForm () {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [formData, setFormData] = useState(intialState);
    const [editGenres, setEditGenres] = useState(false);

    useEffect(() => {
        loadGenres();
    }, []);

    const loadGenres = async () => {
        try {
            setLoading(true);
            const data = await getGenres();

            setGenres(data);
            setLoading(false);
        } catch(err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> 
    ) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if( !validateMusicUrls() ) return false;

        const response = await createAlbum(formData);

        if( response.error ){
            setError(response.error);
        }

        if( response.data ){
            setSuccess('Album created successfully ✅');
            setFormData(intialState);
        }
    };

    const validateMusicUrls = (): boolean => {
        let pattern: RegExp;

        // Check AppleMusic link
        pattern = /^https:\/\/music\.apple\.com\/.*album.*$/;
        if( !pattern.test(formData.am_link) ){
            setError('Apple Music link does not appear to be a valid link to an album');

            return false;
        }

        // Check Spotify link
        pattern = /^https:\/\/open\.spotify\.com\/album\/.+/;
        if( !pattern.test(formData.spotify_link) ){
            setError('Spotify link does not appear to be a valid link to an album');

            return false;
        }

        return true;
    };

    return (
        <>
            <EditGenres
                isOpen={editGenres}
                onClose={() => setEditGenres(false)}
                genres={genres}
                onChanged={() => loadGenres()}
            >
            </EditGenres>
            <form onSubmit={handleSubmit} className={styles.formsubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    className="input input-md col-100"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className="input input-md col-100"
                    placeholder="Artist"
                    name="artist"
                    id="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    required
                />
                <div className={styles.double}>
                    <select
                        defaultValue="0"
                        className="select col-75"
                        onChange={handleChange}
                        id="genre_id"
                        name="genre_id"
                    >
                        <option disabled={true} value="0">Select a genre</option>
                        { genres.map(genre => 
                            <option value={genre.id} key={genre.id}>
                                { genre.name }
                            </option>
                        )}
                    </select>
                    <button type="button" className={styles.plainlink} onClick={() => setEditGenres(true)}>
                        Edit Genres
                    </button>
                </div>
                <div className={styles.double}>
                    <input
                        type="number"
                        className="input input-md col-25"
                        placeholder="Release Year"
                        min="1900"
                        max="2100"
                        name="release_year"
                        id="release_year"
                        value={formData.release_year}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        className="input input-md col-25"
                        placeholder="# of tracks"
                        min="1"
                        max="50"
                        name="number_tracks"
                        id="number_tracks"
                        value={formData.number_tracks}
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="text"
                    className="input input-md col-100"
                    placeholder="Cover URL"
                    name="cover_url"
                    id="cover_url"
                    value={formData.cover_url}
                    onChange={handleChange}
                />
                { formData.cover_url && 
                    <img
                        id="cover_preview"
                        src={formData.cover_url}
                        alt="Cover Preview"
                        height={90}
                        width={90}
                        onError={(e) => {
                            (e.currentTarget.src = "");
                            setError("Invalid Image URL");
                        }}
                    />
                }
                <input
                    type="text"
                    className="input input-md col-100"
                    placeholder="Apple Music Link"
                    name="am_link"
                    id="am_link"
                    value={formData.am_link}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="input input-md col-100"
                    placeholder="Spotify Link"
                    name="spotify_link"
                    id="spotify_link"
                    value={formData.spotify_link}
                    onChange={handleChange}
                />
                <div className={styles.bcontainer}>
                    <button type="submit" className="btn btn-active btn-success" disabled={loading}>
                        Submit { loading && <span className="loading loading-spinner text-success"></span> }
                    </button>
                </div>
                { error && 
                    <div className={styles.bcontainer}>
                        <p className='error'>{ error }</p>
                    </div>
                }
                { success &&
                    <div className={styles.bcontainer}>
                        <p className='success'>{ success }</p>
                    </div>
                }
            </form>
        </>
    );
}
