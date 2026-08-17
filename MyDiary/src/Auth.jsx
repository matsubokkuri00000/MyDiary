import { useState } from "react";
import useAuth from "./useAuth";

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, signUp } = useAuth();

    const handleEmailAddress = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
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
                        value={password}
                        onChange={handlePassword}
                        placeholder="password"
                    />
                </label>
            </div>

            <button onClick={()=>signUp(email, password)}>
                ユーザ登録
            </button>
            <button onClick={()=>signIn(email, password)}>
                ログイン
            </button>
        </>
    )
}

export default Auth;