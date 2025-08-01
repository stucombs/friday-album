'use client';
import {
    Home,
    Footer
} from '@/app/components';
import Link from 'next/link';

export default function Backlog () {
    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <Link href="/admin">RETURN TO ADMIN</Link>
                <h2>View Backlog</h2>
            </main>
            <Footer></Footer>
        </div>
    )
};
