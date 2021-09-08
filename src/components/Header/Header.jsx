import { Link } from "react-router-dom";

import styles from './Header.module.scss';

const Header = () => {
    return <div className={styles.wrapper}>
            <Link to="/">
                Boards ninja
            </Link>
        </div>

};

export default Header;