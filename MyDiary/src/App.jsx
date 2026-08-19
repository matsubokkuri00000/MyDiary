import { useContext } from "react";
import Auth from "./Auth";
import AuthContext from "./AuthContext";
import DiaryPage from "./DiaryPage";
import { Route, Routes, Navigate } from "react-router-dom";

function App (){
  const { user, loading, getCurrentUser, signUp, signIn, signOut } = useContext(AuthContext);

  if(loading){
    return <p>認証情報を確認中...</p>
  }

  return (
    <>
      <Routes>
        <Route 
          path="/"
          element={
            user
              ? <Navigate to="/diary" />
              : <Navigate to="/login" />
          }
        />

        <Route 
          path="/login" 
          element={
            user
              ? <Navigate to="/diary" />
              : <Auth />
          }
        />

        <Route 
          path="/diary" 
          element={
            user
             ? <DiaryPage />
             : <Navigate to="/login" />
          }
        />

      </Routes>  
    </>
  )
}

export default App;