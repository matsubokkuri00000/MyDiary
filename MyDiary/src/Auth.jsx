import { useContext, useState } from "react";
import AuthContext from "./AuthContext";

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState("");
 
    const { errorMessage, signUp, signIn } = useContext(AuthContext);

    const handleEmailAddress = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSignUp = () => {
        if( !email || !password ){
            setInputError("メールアドレスとパスワードを入力してください");
            return;
        }

        setInputError("");
        signUp(email, password);
    }

    const handleSignIn = () => {
        if ( !email || !password ){
            setInputError("メールアドレスとパスワードを入力してください");
            return;   
        }

        setInputError("");
        signIn(email, password);
    }

    return(
        <>
            <h1>ログイン画面</h1>
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

            <button onClick={handleSignUp}>
                ユーザ登録
            </button>
            <button onClick={handleSignIn}>
                ログイン
            </button>

            {inputError && <p>{inputError}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}

export default Auth;