import { IAlbum } from '@/types/common';
import styles from './album.module.css';
import {
    Card,
    CardContent,
    CardActions,
    IconButton
} from '@mui/material';
import Image from 'next/image';

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
                {/* <p className={styles.info}>
                    Tracks: { data?.number_tracks }
                </p> */}
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles['external-link']}>
                    <IconButton href={ data?.am_link} aria-label="Apple Music" title="Listen on Apple Music">
                        <Image
                            src="/apple_music.svg"
                            alt="Apple Music"
                            width={30}
                            height={30}
                        />
                    </IconButton>
                </div>
                <div className={styles['external-link']}>
                    <IconButton href={ data?.spotify_link } aira-label="Spotify" title="Listen on Spotify">
                        <Image
                            src="/spotify.png"
                            alt="Spotfiy"
                            width={30}
                            height={30}
                        />
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    )
}