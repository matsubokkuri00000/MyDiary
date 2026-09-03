import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const { user, loading, errorMessage, getCurrentUser, signUp, signIn, signOut } = useAuth();

    return (
        <AuthContext.Provider value={{ user, loading, errorMessage, getCurrentUser, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthProvider }
export default AuthContext;