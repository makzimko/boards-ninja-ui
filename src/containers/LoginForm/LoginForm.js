import { useContext } from "react";
import { Redirect } from 'react-router-dom';

import { default as LoginFormComponent} from '../../components/LoginForm/LoginForm';
import styles from './LoginForm.module.css'
import AuthContext from "../../providers/Auth/context";

const LoginForm = () => {
    const [{ userInfo }] = useContext(AuthContext);

    if (userInfo) {
        return <Redirect to="/" />
    } else {
        return <div className={styles.wrapper}>
            <div className={styles.title}>Login to Boards Ninja</div>
            <AuthContext.Consumer>
                {([{ loginError }, { login }]) => <LoginFormComponent onLogin={login} error={loginError} /> }
            </AuthContext.Consumer>
        </div>
    }
};

export default LoginForm;