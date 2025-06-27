import styles from "./page.module.css";
import {
  PageTitle,
  Album,
  Cover,
  Footer
} from "./components";
import Image from "next/image";
import Link from 'next/link';
import { getActiveAlbum } from '@/services/album';
import { IAlbum } from '@/types/common';

export default async function Home() {
  const activeAlbum: IAlbum = await getActiveAlbum();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/blank-album.png"
            alt="Album Icon"
            width={280}
            height={200}
            style={{
              height: 'auto'
            }}
          />
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
