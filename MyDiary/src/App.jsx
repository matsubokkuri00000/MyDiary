import { useState, useEffect } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { supabase } from "./supabase";
import useDiaries from "./useDiaries";

function App (){
  const [user, setUser] = useState(null);

  const { diaryList, addDiary, deleteDiary, upadateDiary } = useDiaries();

  const handleSignUp = async ()=>{
    
    const { data, error } = await supabase.auth.signUp({
      email: "...",
      password: "..."
    })

    if(error){
      console.log(error);
      return;
    }

    console.log(data);
  }
  
  const handleSignIn = async ()=>{
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "venulucifer20@gmail.com",
      password: "lovelove235"
    });

    if(error){
      console.log(error);
      return;
    }

    console.log(data);
    console.log(data.user);
    console.log(data.user.id);
  }

  const handleSignOut = async ()=>{

    const { error } = await supabase.auth.signOut();

    if(error){
      console.log(error);
      return;
    }

    setUser(null);

  }

  useEffect(()=>{

    const getCurrentUser = async ()=>{
      const { data, error } = await supabase.auth.getUser();
      
      if(error){
        console.log(error);
        return;
      }

      setUser(data.user);
    }

    getCurrentUser();

  },[]);

  return (
    <>
      <button onClick={handleSignUp}>
        ユーザ登録
      </button>
      <button onClick={handleSignIn}>
        ログイン
      </button>
      <button onClick={handleSignOut}>
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