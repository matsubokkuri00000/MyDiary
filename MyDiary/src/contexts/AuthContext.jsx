import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const { user, authLoading, actionLoading, errorMessage, getCurrentUser, signUp, signIn, signOut } = useAuth();

    return (
        <AuthContext.Provider value={{ user, authLoading, actionLoading, errorMessage, getCurrentUser, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthProvider }
export default AuthContext;