import {useEffect, useMemo, useState} from "react";
import axios from "axios";

import AuthContext from "./context";

const AuthProvider = ({ children }) => {
    const [loginError, setLoginError] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);
    const [isAuthPerformed, setIsAuthPerformed] = useState(false);

    useEffect(() => {
        methods.auth()
    }, []);

    const methods = useMemo(() => ({
        login: (login, password) => {
            if (!login || !password) {
                setLoginError('Type login and password');
            } else {
                setLoginError(undefined);
                axios.post('/v1/auth/login', { login, password})
                    .then(({ data }) => setUserInfo(data))
                    .catch(({ response }) => setLoginError(response.data.message))
                    .finally(() => setIsAuthPerformed(true));
            }
        },
        auth: () => {
            axios.get('/v1/auth')
                .then(({ data }) => setUserInfo(data))
                .finally(() => {
                    setIsAuthPerformed(true)
                });
        }
    }), [setLoginError, setUserInfo]);

    const contextValue = useMemo( () => ([{
        loginError,
        isAuthPerformed,
        userInfo
    }, methods]), [methods, loginError, isAuthPerformed, userInfo])

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider