import { useContext, useState } from "react";
import useAuth from "./useAuth";
import AuthContext from "./AuthContext";

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, signUp } = useAuth();

    const { users, setUsers } = useContext(AuthContext);

    const handleEmailAddress = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleTestLogin = () => {
        setUsers({
            email: "test@example.com"
        })
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

            <button onClick={handleTestLogin}>
                Contextテストログイン
            </button>
            <p>Contextのユーザ：{users?.email}</p>
        </>
    )
}

export default Auth;