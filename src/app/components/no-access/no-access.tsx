import styles from './no-access.module.css';
import { Home } from '../home';

export default function NoAccess() {
    return (
        <div className="page">
            <main className="main">
                <Home></Home>
                <br />
                <br />
                <h3>You do not have access to this page</h3>
            </main>
        </div>
    );
}
