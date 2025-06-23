import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer () {
    return (
      <footer className={styles.footer}>
          <p>A concept by <a href="https://stucombs.com">Stu Combs</a></p>
          <p>Hosted with&nbsp;
            <Link href="https://vercel.com/" passHref>
              <Image
                src="/vercel.svg"
                alt='Vercel'
                width={12}
                height={12}
                style={{ display: 'inline' }}
              />
            </Link>
          </p>
      </footer>
    );
}