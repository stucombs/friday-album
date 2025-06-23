import styles from './history.module.css';
import {
    Footer,
    Album
} from '../components';

export default function History () {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h2>PAST ALBUMS</h2>
                <Album></Album>
            </main>
            <Footer></Footer>
        </div>
    );
}