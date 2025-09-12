import { Home } from '@components/home';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>Not the track you're looking for</h3>
        <Image
          priority
          src="/empty-cd-case.png"
          alt="missing track"
          height={250}
          width={250}
        />
      </main>
    </div>
  );
}
