import { supabase } from "./supabase";
import { useEffect, useState } from "react";

const useAuth = ()=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //ログイン情報を取得
    const getCurrentUser = async ()=>{

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.getUser();

            if(error){
                console.log(error);
                return;
            }

            console.log("user ID : ", data.user.id);
            setUser(data.user);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //新規登録
    const signUp = async (email, password)=>{
        
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if(error){
            console.log(error);
            return;
        }

        console.log(data);
    }
    
    //ログイン
    const signIn = async (email, password)=>{

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if(error){
                console.log(error);
                return;
            }

            //setUser(data.user);
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    //ログアウト
    const signOut = async ()=>{

        const { error } = await supabase.auth.signOut();

        if(error){
            console.log(error);
            return;
        }

        //setUser(null);

    }

    //Supabase側でログイン状態を監視する
    const handleAuthStateChange = (event, session)=>{
        
        setUser(session?.user ?? null);
    }

    useEffect(()=>{

        getCurrentUser();

        const { data } = supabase.auth.onAuthStateChange(handleAuthStateChange);

        return ()=>{
            data.subscription.unsubscribe();
        }

    },[])

    return ({
        user,
        loading,
        getCurrentUser,
        signUp,
        signIn,
        signOut
    })
}

export default useAuth;