'use client';
import {
    Home,
    Footer
} from '@/app/components';
import Link from 'next/link';

export default function Admin () {
    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <h2>Admin Pages 🔒</h2>
                <Link href="/add-album">ADD ALBUM</Link>
                <Link href="/backlog">VIEW BACKLOG</Link>
            </main>
            <Footer></Footer>
        </div>
    );
}
