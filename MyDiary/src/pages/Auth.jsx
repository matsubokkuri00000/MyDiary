import { useContext, useState, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import { Turnstile } from "@marsidev/react-turnstile";

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null); 
    
    const { errorMessage, signUp, signIn } = useContext(AuthContext);

    const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    const turnstileRef = useRef(null);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailAddress = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSignUp = async () => {

        if( !email.trim() || !password ){
            setInputError("メールアドレスとパスワードを入力してください");
            return;
        }

        if(!emailPattern.test(email)){
            setInputError("正しいメールアドレスを入力してください");
            return;
        }

        if(password.length < 6){
            setInputError("6文字以上のパスワードを入力してください");
            return;
        }

        if(!captchaToken){
            setInputError("認証が完了するまでお待ちください");
            return;
        }


        setInputError("");

        await signUp(email.trim(), password, captchaToken);

        turnstileRef.current?.reset();
        setCaptchaToken(null);
    }

    const handleSignIn = async (event) => {
        event.preventDefault();

        if( !email.trim() || !password ){
            setInputError("メールアドレスとパスワードを入力してください");
            return;   
        }

        if(!emailPattern.test(email)){
            setInputError("正しいメールアドレスを入力してください");
            return;
        }

        if(!captchaToken){
            setInputError("認証が完了するまでお待ちください");
            return;
        }

        setInputError("");

        await signIn(email.trim(), password, captchaToken);

        turnstileRef.current?.reset();
        setCaptchaToken(null);
    }

    return(
        <>
            <h1>ログイン画面</h1>

            <form onSubmit={handleSignIn}>
                <div>
                    <label>
                        <p>メールアドレス</p>
                        <input 
                            value={email}
                            onChange={handleEmailAddress}
                            placeholder="email address"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <p>パスワード</p>
                        <input 
                            type="password"
                            value={password}
                            onChange={handlePassword}
                            placeholder="password"
                        />
                    </label>
                </div>

                <Turnstile
                    ref={turnstileRef}
                    siteKey={turnstileSiteKey}
                    onSuccess={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                />

                <button
                    type="button"
                    onClick={handleSignUp}
                >
                    ユーザ登録
                </button>

                <button 
                    type="submit"
                >
                    ログイン
                </button>
            </form>

            {inputError && <p>{inputError}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}

export default Auth;