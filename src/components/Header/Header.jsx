import { Link } from "react-router-dom";

import styles from './Header.module.scss';

const Header = () => {
    return <Link to="/">
        <div className={styles.wrapper}>
            Boards ninja
        </div>
    </Link>
};

export default Header;