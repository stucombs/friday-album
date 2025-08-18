'use client';
import styles from './album.module.css';
import { IAlbum } from '@/types/common';
import Image from 'next/image';

export default function Album ({data}: { data?: IAlbum}) {
    if( !data ) return <p>No album active, check back later!</p>

    return (
        <div className="card-xl card-width bg-base-300">
            <div className="card-body items-center">
                <h3 className="card-title">{ data?.title }</h3>
                <p className={styles.artist}>
                    { data?.artist }
                </p>
                <p>Released: { data?.release_year }</p>
                <p className={styles.genre}>
                    Genre: { data?.genre.name }
                </p>
                <div className="card-actions justify-center gap-12">
                    <div className={styles.externallink}>
                        <a href={data.am_link} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <Image src="/apple_music.svg" alt="Apple Music" width={36} height={36} />
                        </a>
                    </div>
                    <div className={styles.externallink}>
                        <a href={data.spotify_link} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <Image src="/spotify.png" alt="Spotify" width={36} height={36} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
