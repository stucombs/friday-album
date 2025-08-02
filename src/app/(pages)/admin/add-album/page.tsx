'use client';
import {
    Footer,
    Home,
    AddAlbumForm
} from '@/app/components';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function AddAlbum(){
    const { data: session, status } = useSession();

    if( status === 'unauthenticated' ){
        return (
            <div className="page">
                <main className="main">
                    <Home></Home>
                    <p>You do not have access to this content</p>
                </main>
            </div>
        );
    }

    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <Link href="/admin">RETURN TO ADMIN</Link>
                <h2>Add a new Album</h2>
                <AddAlbumForm></AddAlbumForm>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default function AuthWrapper () {
    return (
        <SessionProvider>
            <AddAlbum />
        </SessionProvider>
    );
};
