import { Footer, Home, AddAlbumForm } from '@components';
import Link from 'next/link';

export default function AddAlbum() {
  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <Link href="/admin">RETURN TO ADMIN</Link>
        <h3>ADD A NEW ALBUM</h3>
        <AddAlbumForm></AddAlbumForm>
      </main>
      <Footer></Footer>
    </div>
  );
}
