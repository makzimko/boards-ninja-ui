import { default as LoginFormComponent} from '../../components/LoginForm/LoginForm';

import styles from './LoginForm.module.css'
import AuthProvider from "../../providers/Auth/Provider";
import AuthContext from "../../providers/Auth/context";

const LoginForm = () => {
    return <AuthProvider>
        <div className={styles.wrapper}>
            <div className={styles.title}>Login to Boards Ninja</div>
            <AuthContext.Consumer>
                {([_, { login }]) => <LoginFormComponent onLogin={login} /> }
            </AuthContext.Consumer>
        </div>
    </AuthProvider>
};

export default LoginForm;