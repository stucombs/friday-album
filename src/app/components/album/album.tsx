'use client';
import Image from 'next/image';

import { IAlbum } from '@/types/common';

export default function Album({ data }: { data?: IAlbum }) {
  if (!data) return <p>No album active, check back later!</p>;

  return (
    <div className="card-xl card-width bg-base-300">
      <div className="p-3 gap-2 flex flex-col items-center">
        <p className="card-title">{data?.title}</p>
        <p className="italic">{data?.artist}</p>
        <p>Released: {data?.release_year}</p>
        <p className="capitalize">Genre: {data?.genre.name}</p>
        <div className="flex flex-row justify-center gap-4">
          <div className="hover: cursor-pointer">
            <a
              href={data.am_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image
                src="/apple_music.svg"
                alt="Apple Music"
                width={36}
                height={36}
              />
            </a>
          </div>
          <div className="hover: cursor-pointer">
            <a
              href={data.spotify_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image src="/spotify.png" alt="Spotify" width={36} height={36} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
