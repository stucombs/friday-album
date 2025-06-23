import styles from './history.module.css';
import {
    Footer,
    Album,
    Home
} from '../components';

export default function History () {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Home></Home>
                <h2>PAST ALBUMS</h2>
                <Album></Album>
            </main>
            <Footer></Footer>
        </div>
    );
}