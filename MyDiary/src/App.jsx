import { useState } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { v4 as uuidv4 } from "uuid";

function App (){
  const [diaryList, setDiaryList] = useState([]);

  const handleAddDiary = (diary_title, diary_main)=>{
    const now = new Date();

    const newDiaryList =[
      ...diaryList,
      {
        id:uuidv4(),
        title: diary_title,
        mainText: diary_main,
        date: now.toLocaleString()
      }
    ]

    console.log("更新後配列：", newDiaryList);
    setDiaryList(newDiaryList);
  }

  return (
    <>
      <h1>Diary</h1>
      <DiaryForm setDiaryList={handleAddDiary}/>

        <p>----一覧表示-----</p>
      <DiaryList diaryList={diaryList}/>
    </>
  )
}

export default App;