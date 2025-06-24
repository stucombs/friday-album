/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import styles from './history.module.css';
import {
    Footer,
    Home,
    Loader,
    Album
} from '../components';
import { useEffect, useState } from 'react';
import { IAlbum } from '@/types/common';
import { getPastAlbums } from '@/services/album';

export default function History () {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const data = await getPastAlbums();
                setAlbums(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred');
                setLoading(false);
            }
        }

        fetchAlbums();
    }, []);

    if (error) return <p className='error'>{ error }</p>;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Home></Home>
                <h2>PAST ALBUMS</h2>
                { loading && <Loader /> }
                { albums.map(album => (
                    <div key={ album.id } className={styles['card-item']}>
                         <Album data={album}></Album>
                    </div>
                ))}
            </main>
            <Footer></Footer>
        </div>
    );
}