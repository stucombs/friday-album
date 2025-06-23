/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import styles from './album.module.css';
import {
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';
import { getActiveAlbum } from '../../../services/album';
import { useEffect, useState } from 'react';

interface Album {
  id: number;
  name: string;
  artist: string;
  release_date: string;
  genre: string;
  number_tracks: number;
  am_link: string;
  spotify_link: string;
  title: string;
  cover_url?: string;
}

export default function Album () {
    const [album, setAlbum] = useState<Album>();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const data = await getActiveAlbum();
                console.log(data);
                setAlbum(data);
            } catch (err: any) {
                setError(err.message || 'An unkown error occurred');
            }
        }

        fetchAlbum();
    }, []);

    if( error ) return <p className='error'>{error}</p>;

    return (
        <Card>
            <CardContent className={styles['card-content']}>
                <h2>{ album?.name }</h2>
                <p className={styles.artist}>
                    { album?.artist }
                </p>
                <p className={styles.info}>
                    Released: { album?.release_date }
                </p>
                <p className={`${styles.info} ${styles.genre}`}>
                    Genre: { album?.genre }
                </p>
                <p className={styles.info}>
                    Tracks: { album?.number_tracks }
                </p>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles['external-link']}>
                    <Button href={ album?.am_link }>
                        Apple
                    </Button>
                </div>
                <div className={styles['external-link']}>
                    <Button href={ album?.spotify_link }>
                        Spotify
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}