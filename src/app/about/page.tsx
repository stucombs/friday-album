import styles from './about.module.css';
import {
    Footer,
    Home
} from "../components";

export default function About () {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Home></Home>
                <h2>WHY FRIDAY</h2>
                <p>All about Friday Album, a group listening concept</p>
            </main>
            <Footer></Footer>
        </div>
    );
}