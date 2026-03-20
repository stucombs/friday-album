import { Home, Footer } from '@components';
import Link from 'next/link';

export default async function Admin() {
  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>Admin Pages 🔒</h3>
        <Link href="/admin/add-album">ADD ALBUM</Link>
        <Link href="/admin/queue">VIEW QUEUE</Link>
        <Link href="/admin/settings">SETTINGS</Link>
        <Link href="/api/auth/logout">SIGNOUT</Link>
      </main>
      <Footer></Footer>
    </div>
  );
}
