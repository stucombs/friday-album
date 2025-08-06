'use client';
import styles from './list-album.module.css';
import { IAlbum } from '@/types/common';

export default function ListAlbum ({data}: { data?: IAlbum}) {
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
        </div>
    )
}
