'use client';
import styles from './list-album.module.css';
import { promoteAlbum, deleteAlbum } from '@/lib/services/albums.service';
import { IAlbum } from '@/types/common';
import { useState } from 'react';

export default function ListAlbum ({data}: { data: IAlbum}) {
    const [loadingPromote, setLoadingPromote] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [successPromote, setSuccessPromote] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [error, setError] = useState('');

    const onPromoteAlbum = async () => {
        setLoadingPromote(true);
        try {
            await promoteAlbum(data.id);
            setLoadingPromote(false);
            setSuccessPromote(true);
        } catch(err: any) {
            const message = `An error occurred promoting album ${data.id}: ${err.message}`;
            setError(message);
            setLoadingPromote(false);
        }
    };

    const onDeleteAlbum = async () => {
        setLoadingDelete(true);
        try {
            await deleteAlbum(data.id);
            setLoadingDelete(false);
            setSuccessDelete(true);
        } catch(err: any) {
            const message = `An error occurred deleting album ${data.id}: ${err.message}`;
            setError(message);
            setLoadingDelete(false);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles['card-content']}>
                <h3>{ data.title }</h3>
                <p className={`${styles.info} ${styles.artist}`}>
                    { data.artist }
                </p>
                <p className={`${styles.info}`}>
                    Released: { data.release_year }
                </p>
                <p className={`${styles.genre} ${styles.info}`}>
                    Genre: { data.genre.name }
                </p>
                <p className="error">{ error }</p>
            </div>
            <div className={styles['card-action']}>
                <button type="button" className={`${styles.button} ${styles.promote}`} onClick={onPromoteAlbum} disabled={!data || loadingPromote}>
                    PROMOTE&nbsp;
                        { loadingPromote && <span className={styles.loader}></span> }
                        { successPromote && <span>✅</span> }
                </button>
                <button type="button" className={`${styles.button} ${styles.edit}`} disabled>
                    EDIT
                </button>
                <button type="button" className={`${styles.button} ${styles.delete}`} onClick={onDeleteAlbum} disabled={!data || loadingDelete}>
                    DELETE&nbsp;
                        { loadingDelete && <span className={styles.loader}></span> }
                        { successDelete && <span>✅</span> }
                </button>
            </div>
        </div>
    )
}
