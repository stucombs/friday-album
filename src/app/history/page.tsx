import styles from './history.module.css';
import {
    Footer,
    Home
} from '../components';

export default function History () {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Home></Home>
                <h2>PAST ALBUMS</h2>
                <p>This page is still under construction, check back later...</p>
            </main>
            <Footer></Footer>
        </div>
    );
}