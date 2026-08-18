import { supabase } from "./supabase";
import { createContext, useState } from "react";
import useAuth from "./useAuth";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    //const [users, setUsers] = useState(null);
    const { user, loading, getCurrentUser, signUp, signIn, signOut } = useAuth();

    return (
        <AuthContext.Provider value={{ user, loading, getCurrentUser, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthProvider }
export default AuthContext;