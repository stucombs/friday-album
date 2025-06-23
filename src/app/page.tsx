import styles from "./page.module.css";
import {
  PageTitle,
  Album,
  Cover,
  Footer
}from "./components";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/blank-album.png"
            alt="Album Icon"
            width={200}
            height={200}
            priority
          />
          <PageTitle></PageTitle>
          <Cover></Cover>
          <Album></Album>
          <Link href="/about">WHY FRIDAY</Link>
          <Link href="/history">PAST ALBUMS</Link>
      </main>
      <Footer></Footer>
    </div>
  );
}
