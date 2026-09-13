import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { Turnstile } from "@marsidev/react-turnstile";
import "../styles/auth.css";

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null); 
    const [isSignUp, setIsSignUp] = useState(false);
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const { errorMessage, actionLoading, signUp, signIn } = useContext(AuthContext);

    const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    const turnstileRef = useRef(null);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailAddress = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleAuthModeChange = () => {
        setIsSignUp(!isSignUp);
        setInputError("");
        setSuccessMessage("");
    }

    const handleSignUp = async (event) => {
        event.preventDefault();

        setSuccessMessage("");

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

        const success = await signUp(
            email.trim(),
            password,
            captchaToken
        )

        console.log("signUp success:", success);

        if(success){
            setSuccessMessage(
                "確認メールを送信しました。メールをご確認ください。"
            )
        }

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

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 400px)");

        const handleScreenChange = (event) => {
            setIsNarrowScreen(event.matches);
        };

        setIsNarrowScreen(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleScreenChange);

        return () => {
            mediaQuery.removeEventListener("change", handleScreenChange);
        };
    }, []);

    return(
        <div className="auth-page">
            <div className="auth-card">
                <h1
                    className="auth-title"
                >
                    MyDiary
                </h1>
                <p
                    className="auth-subtitle"
                >
                    日々を、静かに残す...
                </p>
                
                <div className="auth-error-area">
                    {inputError && (
                        <p className="auth-error">
                            {inputError}
                        </p>
                    )}

                    {errorMessage && (
                        <p className="auth-error">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className="auth-success">
                            {successMessage}                                
                        </p>
                    )}
                </div>

                <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                    <div className="auth-field">
                        <label htmlFor="email">メールアドレス</label>

                            <input 
                                id="email"
                                className="auth-input"
                                type="email"
                                placeholder="email address"
                                value={email}
                                onChange={handleEmailAddress}
                            />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">パスワード</label>
                            <input 
                                id="password"
                                className="auth-input"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={handlePassword}
                            />
                    </div>

                    <div className="auth-turnstile">
                        <Turnstile
                            ref={turnstileRef}
                            siteKey={turnstileSiteKey}
                            onSuccess={(token) => setCaptchaToken(token)}
                            onExpire={() => setCaptchaToken(null)}
                            options={{
                                size: isNarrowScreen ? "compact" : "normal"
                            }}
                        />
                    </div>

                    <div className="auth-actions">
                        <button
                            className="auth-submit-button"
                            type="submit"
                            disabled={actionLoading || !captchaToken}
                        >
                            {actionLoading
                                ? "処理中"
                                : isSignUp 
                                    ? "新規登録" 
                                    : "ログイン"
                            }

                        </button>

                        <p className="auth-switch-text">
                            {isSignUp
                                ? "アカウントをお持ちの方"
                                : "アカウントをお持ちでない方"
                            }
                            
                            <button
                                className="auth-switch-button"
                                type="button"
                                onClick={handleAuthModeChange}
                            >
                                {isSignUp ? "ログイン" : "ユーザ登録"}
                            </button>
                        </p>
                    </div>
                </form>
                
            </div>

            <div className="auth-legal-links">
                <Link to="/privacy">
                    プライバシーポリシー
                </Link>

                <span>｜</span>

                <Link to="/terms">
                    利用規約
                </Link>
            </div>
        </div>
    )
}

export default Auth;