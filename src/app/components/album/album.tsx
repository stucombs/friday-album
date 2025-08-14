'use client';
import styles from './album.module.css';
import { IAlbum } from '@/types/common';
import Image from 'next/image';

export default function Album ({data}: { data?: IAlbum}) {
    if( !data ) return <p>No album active, check back later!</p>

    return (
        <div className="card bg-base-200 w-full sm:w-80 md:w-96 lg:w-[700px] shadow-lg p-5">
            <div className="card-body">
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
            <div className="card-actions justify-center">
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
