import { IAlbum } from '@/types/common';
import styles from './album.module.css';
import {
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';

export default function Album ({
    data,
    error
}: {
    data?: IAlbum,
    error?: string
}) {
    if( error ) return <p className='error'>{ error }</p>;
    if( !data ) return <p>No album active, check back later!</p>

    return (
        <Card>
            <CardContent className={styles['card-content']}>
                <h2>{ data?.name }</h2>
                <p className={styles.artist}>
                    { data?.artist }
                </p>
                <p className={styles.info}>
                    Released: { data?.release_year }
                </p>
                <p className={`${styles.info} ${styles.genre}`}>
                    Genre: { data?.genre }
                </p>
                <p className={styles.info}>
                    Tracks: { data?.number_tracks }
                </p>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles['external-link']}>
                    <Button href={ data?.am_link }>
                        Apple
                    </Button>
                </div>
                <div className={styles['external-link']}>
                    <Button href={ data?.spotify_link }>
                        Spotify
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}