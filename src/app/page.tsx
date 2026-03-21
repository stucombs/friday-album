import { PageTitle, Album, Cover, Footer, Holiday } from '@components';
import { getActiveAlbum } from '@lib/services/albums.service';
import { getSettings } from '@lib/services/settings.service';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
  const activeAlbum: IAlbum = await getActiveAlbum();
  const settings = await getSettings();
  const cookieStore = await cookies();
  const isAdmin =
    cookieStore.get('fa_admin_token')?.value === process.env.API_SECRET;

  return (
    <div className="page">
      <main className="main">
        <PageTitle></PageTitle>
        {settings?.value?.message && (
          <span className="text-lg text-center">{settings.value.message}</span>
        )}
        {settings?.value?.theme && (
          <Holiday theme={settings?.value?.theme}></Holiday>
        )}
        <Cover data={activeAlbum?.cover_url}></Cover>
        <Album data={activeAlbum}></Album>
        <Link href="/about">WHY FRIDAY</Link>
        <Link href="/history">PAST ALBUMS</Link>
        <Link href="/subscribe">SUBSCRIBE</Link>
        <Link
          href="https://discord.gg/mW26JsW3SK"
          target="_blank"
          rel="noopener noreferrer"
          className="discord"
          prefetch={false}
        >
          JOIN THE DISCUSSION
        </Link>
        {isAdmin && <Link href="/admin">ADMIN</Link>}
      </main>
      <Footer></Footer>
    </div>
  );
}
