import {
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';

export default function Album() {
    return (
        <Card>
            <CardContent>
                <h2>Searchin&apos; for a Rainbow</h2>
                <p>The Marshall Tucker Band</p>
                <p>Released: 1975</p>
                <p>Genre: ?</p>
                <p>Tracks: 9</p>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <Button href="https://music.apple.com/us/album/searchin-for-a-rainbow/1795512840">
                        Apple
                    </Button>
                </div>
                <div>
                    <Button href="https://open.spotify.com/album/1KEqpbUQ0g4lKFGFLZJnk1">
                        Spotify
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}