import styles from './footer.module.css';

export default function Footer () {
    return (
      <footer className={styles.footer}>
          <p>A concept by <a href="https://stucombs.com">Stu Combs</a></p>
      </footer>
    );
}