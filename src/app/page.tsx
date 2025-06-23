/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import styles from "./page.module.css";
import {
  PageTitle,
  Album,
  Cover,
  Footer,
  Loader
}from "./components";
import Image from "next/image";
import Link from 'next/link';
import { getActiveAlbum } from '@/services/album';
import { useEffect, useState } from 'react';
import { IAlbum } from '@/types/common';

export default function Home() {
  const [activeAlbum, setActiveAlbum] = useState<IAlbum>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getActiveAlbum();
        setActiveAlbum(data);
        setLoading(false);
      } catch(err: any) {
        setError(err.message || 'An unknown error occurred');
        setLoading(false);
      }
    }

    fetchAlbum();
  }, []);

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
          {loading ? (
              <Loader></Loader>
            ) : (
              <>
                <Cover data={activeAlbum?.cover_url}></Cover>
                <Album data={activeAlbum} error={error}></Album>
              </>
            )}
          <Link href="/about">WHY FRIDAY</Link>
          <Link href="/history">PAST ALBUMS</Link>
      </main>
      <Footer></Footer>
    </div>
  );
}
