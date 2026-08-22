import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./Auth";
import AuthContext from "./AuthContext";
import DiaryPage from "./DiaryPage";
import NotFound from "./NotFound";
import Layout from "./Layout";



function App (){
  const { user, loading } = useContext(AuthContext);

  if(loading){
    return <p>認証情報を確認中...</p>
  }

  return (
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

        <Route element={<Layout />}>
          <Route 
            path="/diary" 
            element={
              user
              ? <DiaryPage />
              : <Navigate to="/login" />
            }
          />
        </Route>

        <Route 
          path="*"
          element={<NotFound />}
        />

      </Routes>  
  )
}

export default App;