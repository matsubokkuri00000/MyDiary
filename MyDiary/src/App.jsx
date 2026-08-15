import { useState, useEffect } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { supabase } from "./supabase";
import useDiaries from "./useDiaries";
import useAuth from "./useAuth";

function App (){
  const { diaryList, addDiary, deleteDiary, upadateDiary } = useDiaries();
  const { user, getCurrentUser, signUp, signIn, signOut } = useAuth();

  useEffect(()=>{
    console.log("App.jsx 初回レンダリング");
  },[]);

  return (
    <>
      <button onClick={signUp}>
        ユーザ登録
      </button>
      <button onClick={signIn}>
        ログイン
      </button>
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
  )
}

export default App;