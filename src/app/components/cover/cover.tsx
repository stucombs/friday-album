/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getAlbumCover } from "@/services/album";
import Image from "next/image"
import { useEffect, useState } from "react";

interface Cover {
    id: number | null,
    cover_url: string;
}

export default function Cover () {
    const [coverUrl, setCoverUrl] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCover = async () => {
            try {
                const data = await getAlbumCover();
                setCoverUrl(data?.cover_url);
            } catch (err: any) {
                setError(err.message || 'An unkown error occurred retrieving cover art');
            }
        }
        fetchCover();
    }, []);

    if (error) return <p className='error'>{error}</p>;

    if( coverUrl )
    return (
        <Image
            src={ coverUrl }
            alt="Album Cover"
            width={250}
            height={250}
        />
    )
}