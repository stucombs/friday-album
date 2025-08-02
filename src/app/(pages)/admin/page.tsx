import {
    Home,
    Footer,
    NoAccess
} from '@/app/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/services/auth.service';
import Link from 'next/link';

export default async function Admin () {
    const session = await getServerSession(authOptions);

    if( !session ) return <NoAccess></NoAccess>;

    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <h2>🔒 Admin Pages 🔒</h2>
                <Link href="/admin/add-album">ADD ALBUM</Link>
                <Link href="/admin/backlog">VIEW BACKLOG</Link>
                <Link href="/api/auth/signout">SIGNOUT</Link>
            </main>
            <Footer></Footer>
        </div>
    );
}
