import {
    Footer,
    Home,
    Album
} from '../../components';
import { IAlbum } from '@/types/common';
import { getPastAlbums } from '@/services/album';

export default async function History () {
    const albums: IAlbum[] = await getPastAlbums();
    if (!albums) {
        return (
            <p className='error'>
                An error occured loading albums, please try again.
            </p>
        );
    }

    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <h2>PAST ALBUMS</h2>
                { albums.map(album => (
                    <div key={ album.id }>
                        <Album data={album}></Album>
                    </div>
                ))}
            </main>
            <Footer></Footer>
        </div>
    );
}
