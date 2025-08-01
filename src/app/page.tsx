import {
  PageTitle,
  Album,
  Cover,
  Footer
} from './components';
import Link from 'next/link';
import { getActiveAlbum } from '@/services/albums.service';
import { IAlbum } from '@/types/common';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const activeAlbum: IAlbum = await getActiveAlbum();

  return (
    <div className="page">
      <main className="main">
          <PageTitle></PageTitle>
          <Cover data={activeAlbum?.cover_url}></Cover>
          <Album data={activeAlbum}></Album>
          <Link href="/about">WHY FRIDAY</Link>
          <Link href="/history">PAST ALBUMS</Link>
      </main>
      <Footer></Footer>
    </div>
  );
}
