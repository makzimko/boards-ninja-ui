import { useCallback, useState } from "react";

import styles from './LoginForm.module.scss'
import classNames from "classnames";

const LoginForm = ({ onLogin, error }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onChangeLogin = useCallback((e) => {
        setLogin(e.target.value)
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        onLogin(login, password)
    }, [login, password, onLogin]);

    return <div className={styles.wrapper}>
        <form onSubmit={onSubmit}>
            <input className={classNames(styles.input)} value={login} onChange={onChangeLogin} placeholder="Login"/>
            <input className={classNames(styles.input)} value={password} onChange={onChangePassword } type="password" placeholder="Password" />
            {error && <div className={styles.error}>{error}</div>}
            <button className={styles['submit-button']} type="submit">Login</button>
        </form>
    </div>
};

export default LoginForm;