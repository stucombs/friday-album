import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="page-footer">
      <p>
        A concept by <a href="https://stucombs.com">Stu Combs</a>
      </p>
      <p>
        Hosted with&nbsp;
        <Link href="https://vercel.com/" target="_blank" passHref>
          <Image
            src="/vercel.svg"
            alt="Vercel"
            width={12}
            height={12}
            className="logo"
            style={{ display: 'inline' }}
          />
        </Link>
      </p>
    </footer>
  );
}
