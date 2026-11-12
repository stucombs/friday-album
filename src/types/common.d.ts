export {};

declare global {
  interface IAlbum {
    id: number;
    title: string;
    artist: string;
    release_year: number;
    genre_name: string;
    am_link: string;
    spotify_link: string;
    cover_url: string;
    active_date?: Date;
  }

  interface IGenre {
    id: number;
    name: string;
    created_at?: Date;
    updated_at?: Date;
  }

  interface IAlbumDto {
    title: string;
    artist: string;
    release_year?: string;
    genre_id?: number;
    am_link?: string;
    spotify_link?: string;
    cover_url?: string;
  }

  interface ICoverArt {
    id: number;
    cover_url: string;
  }
}
