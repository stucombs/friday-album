export {};

declare global {
  interface IAlbum {
    id: number;
    title: string;
    artist: string;
    release_year: number;
    genre: IGenre;
    number_tracks: number;
    am_link: string;
    spotify_link: string;
    cover_url: string;
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
    number_tracks?: string;
    am_link?: string;
    spotify_link?: string;
    cover_url?: string;
  }

  interface ICoverArt {
    id: number;
    cover_url: string;
  }
}
