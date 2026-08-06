import { useEffect, useState } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";

function App (){
  const [diaryList, setDiaryList] = useState([]);

  const handleAddDiary = async (diary_title, diary_main)=>{

    const { error } = await supabase
      .from("diaries")
      .insert([
        {
          title: diary_title,
          main_text: diary_main
        }
      ])
      .select("*");

      if(error){
        console.log(error);
      }

      await fetchDiaries();
  }

  const handleDeleteDiary = (ID)=> {
    const newDiary = diaryList.filter((diary)=>{
      if( diary.id != ID ){
        return diary;
      }
    });

    console.log("削除した日記のID：", ID);
    setDiaryList(newDiary);
  }

  const handleUpadateDiary = (ID, newTitle, newDiary)=>{
    const now = new Date();

    const newDiaryList = diaryList.map((diary)=>{
      if(diary.id === ID){
        return {
          ...diary,
          title: newTitle,
          mainText: newDiary,
          date: now.toLocaleString()
        }
      };

      return diary;
    });
    
    console.log("編集後の配列", newDiaryList);
    setDiaryList(newDiaryList);
  }

  const fetchDiaries = async ()=>{
    const { data, error } = await supabase
      .from("diaries")
      .select("*");

    if(error){
      console.log(error);
      return;
    }

    console.log(data);
    setDiaryList(data);
  } 

  //console.log(supabase);

  useEffect(()=>{

    fetchDiaries();

  },[]);

  
  return (
    <>
      <h1>Diary</h1>
      <DiaryForm handleAddDiary={handleAddDiary}/>

        <p>----一覧表示-----</p>
      <DiaryList 
        diaryList={diaryList}
        handleDeleteDiary={handleDeleteDiary}
        handleUpadateDiary={handleUpadateDiary}
      />
    </>
  )
}

export default App;