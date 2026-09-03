import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import AuthContext from "./contexts/AuthContext";
import DiaryPage from "./pages/DiaryPage";
import NotFound from "./pages/NotFound";
import Layout from "./layouts/Layout";
import ToDoList from "./pages/ToDoList";



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
          path="/todolist"
          element={
            user
              ? <ToDoList />
              : <Navigate to="/login"/>
          }
        />

        <Route 
          path="*"
          element={<NotFound />}
        />


      </Routes>  
  )
}

export default App;