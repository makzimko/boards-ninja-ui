import { useMemo } from "react";

import AuthContext from "./context";

const AuthProvider = ({ children }) => {
    const methods = useMemo(() => ({
        login: (...args) => console.log('LOGIN', args)
    }), []);

    const contextValue = useMemo( () => ([{}, methods]), [methods])

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider