import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="page-footer">
      <p>
        A concept by <a href="https://stucombs.com">Stu Combs</a>
      </p>
      <p>{'</>'} with ❤️ by a human</p>
    </footer>
  );
}
