import { supabase } from "../services/supabase";
import { useEffect, useState } from "react";

const useAuth = ()=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    //ログイン情報を取得
    const getCurrentUser = async ()=>{

        try {
            setLoading(true);
            setErrorMessage("");

            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.log(error);

                if (error.name === "AuthSessionMissingError") {
                    setUser(null);
                    return;
                }

                setErrorMessage("ログイン状態の確認に失敗しました");
                return;
            }

            if (!data.user) {
                setUser(null);
                return;
            }

            console.log("user ID : ", data.user.id);
            setUser(data.user);

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setLoading(false);
        }
    }

    //新規登録
    const signUp = async (email, password, captchaToken)=>{
        
        try {
            setLoading(true);
            setErrorMessage("");

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    captchaToken
                }
            })

            if(error){
                console.log(error);
                setErrorMessage("登録に失敗しました");
                return;
            }
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setLoading(false);
        }
    }
    
    //ログイン
    const signIn = async (email, password, captchaToken)=>{

        try {
            setLoading(true);
            setErrorMessage("");

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
                options: {
                    captchaToken
                }
            });

            if(error){
                console.log(error);
                setErrorMessage("ログインできませんでした");
                return;
            }

            //setUser(data.user);
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setLoading(false);
        }
    }

    //ログアウト
    const signOut = async ()=>{

        try {
            setLoading(true);
            setErrorMessage("");

            const { error } = await supabase.auth.signOut();

            if(error){
                console.log(error);
                setErrorMessage("ログアウトに失敗しました");
                return;
            }

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setLoading(false);
        }

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
        errorMessage,
        getCurrentUser,
        signUp,
        signIn,
        signOut
    })
}

export default useAuth;