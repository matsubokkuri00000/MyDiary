import { useState, useEffect, useContext } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { supabase } from "./supabase";
import useDiaries from "./useDiaries";
import Auth from "./Auth";
import AuthContext from "./AuthContext";

function App (){
  const { diaryList, addDiary, deleteDiary, upadateDiary } = useDiaries();
  const { user, loading, getCurrentUser, signUp, signIn, signOut } = useContext(AuthContext);


  return (
    <>
      {user && loading === false ?(
        <>
          <button onClick={signOut}>
            ログアウト
          </button>
          <p>ログイン中のユーザ：{user?.email}</p>

          <h1>Diary</h1>
          <DiaryForm handleAddDiary={addDiary}/>

            <p>----一覧表示-----</p>
          <DiaryList 
            diaryList={diaryList}
            handleDeleteDiary={deleteDiary}
            handleUpadateDiary={upadateDiary}
          />
        </>
      ):(
        <>
          <Auth />
        </>
        )
      }
    </>
  )
}

export default App;