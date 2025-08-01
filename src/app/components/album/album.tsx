'use client';
import styles from './album.module.css';
import { IAlbum } from '@/types/common';
import Image from 'next/image';

export default function Album ({data}: { data?: IAlbum}) {
    if( !data ) return <p>No album active, check back later!</p>

    return (
        <div className={styles.card}>
            <div className={styles['card-content']}>
                <h2>{ data?.title }</h2>
                <p className={`${styles.info} ${styles.artist}`}>
                    { data?.artist }
                </p>
                <p className={`${styles.info}`}>
                    Released: { data?.release_year }
                </p>
                <p className={`${styles.genre} ${styles.info}`}>
                    Genre: { data?.genre.name }
                </p>
            </div>
            <div className={styles['card-action']}>
                <div className={styles['external-link']}>
                    <a
                        href={data.am_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Listen on Apple Music"
                        className="hover:opacity-80"
                    >
                        <Image src="/apple_music.svg" alt="Apple Music" width={30} height={30} />
                    </a>
                </div>
                <div className={styles['external-link']}>
                    <a
                        href={data.spotify_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Listen on Spotify"
                        className="hover:opacity-80"
                    >
                        <Image src="/spotify.png" alt="Spotify" width={30} height={30} />
                    </a>
                </div>
            </div>
        </div>
    )
}
