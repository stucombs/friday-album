'use client';

import Image from 'next/image';

export function Album({ data }: { data?: IAlbum }) {
  if (!data) return <p>No album active, check back later!</p>;

  return (
    <div className="card-xl card-width bg-base-300">
      <div className="p-3 gap-2 flex flex-col items-center">
        {data?.active_date && (
          <p className="italic">
            {new Date(data.active_date + 'T00:00').toLocaleDateString()}
          </p>
        )}
        <p className="card-title">{data?.title}</p>
        <p className="italic">{data?.artist}</p>
        <p>
          <span className="capitalize">{data?.genre_name}</span> |{' '}
          {data?.release_year}
        </p>
        {/* <p className="capitalize">{data?.genre.name}</p> */}
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
                width={40}
                height={40}
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
              <Image
                src="/spotify_music.svg"
                alt="Spotify"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
