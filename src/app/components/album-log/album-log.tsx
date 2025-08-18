'use client';
import styles from './album-log.module.css';
import { promoteAlbum, deleteAlbum } from '@/lib/services/albums.service';
import { IAlbum } from '@/types/common';
import { useState } from 'react';

export default function AlbumLog ({data}: { data: IAlbum}) {
    const [loadingPromote, setLoadingPromote] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [successPromote, setSuccessPromote] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [error, setError] = useState('');

    const onPromoteAlbum = async () => {
        setLoadingPromote(true);
        try {
            setError('');
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
            setError('');
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
        <div className="card-xl card-width bg-base-300 gap-10">
            <div className="card-body log-album">
                <div className={styles.cardinfo}>
                    <h3 className="card-title">{ data?.title }</h3>
                    <p className={ styles.artist }>{ data?.artist }</p>
                    <p>Released: { data?.release_year }</p>
                    <p className={ styles.genre }>Genre: { data?.genre.name }</p>
                    <p className="error">{ error }</p>
                </div>
                <div className={ styles.buttoncol }>
                    <div>
                        <button type="button" className="btn btn-sm btn-success" onClick={onPromoteAlbum} disabled={!data || loadingPromote}>
                            PROMOTE&nbsp;
                                { loadingPromote && <span className="loading loading-spinner"></span> }
                                { successPromote && <span>✅</span> }
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-sm btn-info" disabled>
                            EDIT
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-sm btn-error" onClick={onDeleteAlbum} disabled={!data || loadingDelete}>
                            DELETE&nbsp;
                                { loadingDelete && <span className="loading loading-spinner"></span> }
                                { successDelete && <span>✅</span> }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
