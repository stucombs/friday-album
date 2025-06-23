export interface IAlbum {
    id: number;
    name: string;
    artist: string;
    release_year: number;
    genre: string;
    number_tracks: number;
    am_link: string;
    spotify_link: string;
    title: string;
    cover_url: string;
};

export interface ICoverArt {
    id: number;
    cover_url: string;
}