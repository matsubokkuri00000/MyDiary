import { supabase } from "./supabase";
import { useEffect, useState } from "react";

const useAuth = ()=>{
    const [user, setUser] = useState(null);

    //ログイン情報を取得
    const getCurrentUser = async ()=>{

        try {
            const { data, error } = await supabase.auth.getUser();

            if(error){
                console.log(error);
                return;
            }

            console.log("user ID : ", data.user.id);
            setUser(data.user);

        } catch (error) {
            console.log(error);
        }
    }

    //新規登録
    const signUp = async ()=>{
        
        const { data, error } = await supabase.auth.signUp({
            email: "...",
            password: "..."
        })

        if(error){
            console.log(error);
            return;
        }

        console.log(data);
    }
    
    //ログイン
    const signIn = async ()=>{
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: "matsubokkuri00000@gmail.com",
            password: "lovelove235"
        });

        if(error){
            console.log(error);
            return;
        }

        console.log(data);
        console.log(data.user);
        
        setUser(data.user);
    }

    //ログアウト
    const signOut = async ()=>{

        const { error } = await supabase.auth.signOut();

        if(error){
            console.log(error);
            return;
        }

        setUser(null);

    }

    const handleAuthStateChange = (event, session)=>{
        console.log(event);
        console.log(session);

        setUser(session?.user ?? null);
    }

    useEffect(()=>{

        getCurrentUser();

        supabase.auth.onAuthStateChange(handleAuthStateChange);

    },[])

    return ({
        user,
        getCurrentUser,
        signUp,
        signIn,
        signOut
    })
}

export default useAuth;