import { Home, Footer, NoAccess } from '@components';
import { authOptions } from '@lib/services/auth.service';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session) return <NoAccess></NoAccess>;

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>🔒 Admin Pages 🔒</h3>
        <Link href="/admin/add-album">ADD ALBUM</Link>
        <Link href="/admin/backlog">VIEW BACKLOG</Link>
        <Link href="/admin/settings">SETTINGS</Link>
        <Link href="/api/auth/signout">SIGNOUT</Link>
      </main>
      <Footer></Footer>
    </div>
  );
}
