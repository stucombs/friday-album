import styles from './album.module.css';
import {
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';

export default function Album() {
    const strAlbumTitle = `Searchin' for a Rainbow`;
    const strArtistName = `The Marshall Tucker Band`;
    const strReleaseDate = 1975;
    const strGenre = 'Rock';
    const numTracks = 9;

    const strAppleLink = `https://music.apple.com/us/album/searchin-for-a-rainbow/1795512840`;
    const strspotifyLink = `https://open.spotify.com/album/1KEqpbUQ0g4lKFGFLZJnk1`;

    return (
        <Card>
            <CardContent>
                <h2>{ strAlbumTitle}</h2>
                <p className={styles.artist}>{ strArtistName }</p>
                <p className={styles.info}><i>Released:</i> { strReleaseDate }</p>
                <p className={styles.info}><i>Genre:</i> { strGenre }</p>
                <p className={styles.info}><i>Tracks:</i> { numTracks }</p>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles['external-link']}>
                    <Button href={ strAppleLink }>
                        Apple
                    </Button>
                </div>
                <div className={styles['external-link']}>
                    <Button href={ strspotifyLink }>
                        Spotify
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}