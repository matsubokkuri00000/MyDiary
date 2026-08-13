import { useEffect, useState } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import useDiaries from "./useDiaries";

function App (){
/*
  const [diaryList, setDiaryList] = useState([]);
*/

  const { diaryList, fetchDiaries, addDiary, deleteDiary, upadateDiary } = useDiaries();

/*
  const handleAddDiary = async (diary_title, diary_main)=>{

    const { error } = await supabase
      .from("diaries")
      .insert([
        {
          title: diary_title,
          main_text: diary_main
        }
      ]);

      if(error){
        console.log(error);
      }

      await fetchDiaries();
  }

  const handleDeleteDiary = async (ID)=> {

    const { error } = await supabase
      .from("diaries")
      .delete()
      .eq("id", ID)

    if(error){
      console.log(error);
      return;
    }

      await fetchDiaries();
  }

  const handleUpadateDiary = async (ID, newTitle, newDiary)=>{

    const { error } = await supabase
      .from("diaries")
      .update({
        title: newTitle,
        main_text: newDiary
      })
      .eq("id", ID)

      if(error){
        console.log(error);
        return;
      }

    await fetchDiaries();
  }

  const fetchDiaries = async ()=>{
    const { data, error } = await supabase
      .from("diaries")
      .select("*");

    if(error){
      console.log(error);
      return;
    }

    const reverseData = [...data].reverse()

    console.log(reverseData);
    setDiaryList(reverseData);
  } 

  useEffect(()=>{

    fetchDiaries();

  },[]);
  */

  
  return (
    <>
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