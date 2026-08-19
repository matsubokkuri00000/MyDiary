import { useContext } from "react";
import Auth from "./Auth";
import AuthContext from "./AuthContext";
import DiaryPage from "./DiaryPage";

function App (){
  const { user, loading, getCurrentUser, signUp, signIn, signOut } = useContext(AuthContext);

  return (
    <>
      {user && loading === false 
        ? <DiaryPage />
        : <Auth />
      }
    </>
  )
}

export default App;