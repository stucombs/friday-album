'use client';
import {
    Home,
    Footer,
    NoAccess
} from '@/app/components';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function BackLog () {
    const { data: session, status } = useSession();

    if( status === 'unauthenticated' ){
        return <NoAccess></NoAccess>;
    }

    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <Link href="/admin">RETURN TO ADMIN</Link>
                <h2>View Backlog</h2>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default function Backlog () {
    return (
        <SessionProvider>
            <BackLog />
        </SessionProvider>
    );
};
