import { PageTitle, Album, Cover, Footer } from '@components';
import { getActiveAlbum } from '@lib/services/albums.service';
import { authOptions } from '@lib/services/auth.service';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const activeAlbum: IAlbum = await getActiveAlbum();
  const session = await getServerSession(authOptions);

  return (
    <div className="page">
      <main className="main">
        <PageTitle></PageTitle>
        <Cover data={activeAlbum?.cover_url}></Cover>
        <Album data={activeAlbum}></Album>
        <Link href="/about">WHY FRIDAY</Link>
        <Link
          href="https://discord.gg/mW26JsW3SK"
          target="_blank"
          rel="noopener noreferrer"
          className="discord"
        >
          JOIN THE DISCUSSION
        </Link>
        <Link href="/history">PAST ALBUMS</Link>
        {session && <Link href="/admin">ADMIN</Link>}
      </main>
      <Footer></Footer>
    </div>
  );
}
