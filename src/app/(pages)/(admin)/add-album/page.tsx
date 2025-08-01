'use client';
import { useState } from "react";
import {
    Footer,
    Home
} from "@/app/components";
import Link from "next/link";

export default function AddAlbum () {
    const  [formData, setFormData] = useState({
        title: '',
        artist: '',
        release_year: null,
        genre_id: null,
        number_tracks: null,
        am_link: '',
        spotify_link: '',
        cover_url: ''
    });
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <Link href="/admin">RETURN TO ADMIN</Link>
                <h2>Add a new Album</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <label>
                        Title
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Artist
                        <input
                            type="text"
                            name="artist"
                            id="artist"
                            value={formData.artist}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </form>
            </main>
            <Footer></Footer>
        </div>
    );
}
