import { useContext } from "react";
import { Redirect } from 'react-router-dom';
import {useRecoilValue} from "recoil";

import { default as LoginFormComponent } from "../../components/LoginForm/LoginForm";
import useAuthActions, {loginErrorState, userInfoState} from "../../atoms/auth";

import styles from './LoginForm.module.css'


const LoginForm = () => {
    const userInfo = useRecoilValue(userInfoState);
    const loginError = useRecoilValue(loginErrorState);
    const { login } = useAuthActions();

    if (userInfo) {
        return <Redirect to="/" />
    } else {
        return <div className={styles.wrapper}>
            <div className={styles.title}>Login to Boards Ninja</div>
            <LoginFormComponent onLogin={login} error={loginError} />
            {/*<AuthContext.Consumer>*/}
            {/*    {([{ loginError }, { login }]) => <LoginFormComponent onLogin={login} error={loginError} /> }*/}
            {/*</AuthContext.Consumer>*/}
        </div>
    }
};

export default LoginForm;