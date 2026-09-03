import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState("");
 
    const { errorMessage, signUp, signIn } = useContext(AuthContext);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailAddress = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    //新規登録
    const handleSignUp = () => {

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


        setInputError("");
        signUp(email.trim(), password);
    }

    const handleSignIn = (event) => {
        event.preventDefault();

        if( !email.trim() || !password ){
            setInputError("メールアドレスとパスワードを入力してください");
            return;   
        }

        if(!emailPattern.test(email)){
            setInputError("正しいメールアドレスを入力してください");
            return;
        }


        setInputError("");
        signIn(email.trim(), password);
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