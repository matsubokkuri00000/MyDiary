import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { supabase } from "./supabase";
import useDiaries from "./useDiaries";

function App (){
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
  
  return (
    <>
      <button onClick={handleSignUp}>
        ユーザ登録
      </button>
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