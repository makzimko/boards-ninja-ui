import { useMemo } from "react";

import AuthContext from "./context";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const methods = useMemo(() => ({
        login: (login, password) => {
            axios.post('/v1/auth/login', { login, password})
                .then((q) => {
                    console.log('LOGIN', q)
                })
        }
    }), []);

    const contextValue = useMemo( () => ([{}, methods]), [methods])

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider