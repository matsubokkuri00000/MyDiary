import { useState } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { v4 as uuidv4 } from 'uuid';

function App(){
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState();
  const [diaryList, setDiaryList] = useState([])
 
  const handleInputTitle = (event)=>{
    setTitle(event.target.value);
  }

  const handleInputDiary = (event)=>{
    setDiary(event.target.value);
  }

  const handleEntryDiary = ()=>{
    const newDiarys = [
      ...diaryList,
      {
        id: uuidv4(),
        title: title,
        Diary:diary
      }
    ]

    setDiaryList(newDiarys);

    setTitle("");
    setDiary("");
    console.log(newDiarys);
  }

  return (
    <>
      <h1>Diary</h1>
      <div>
        <p>タイトル</p>
        <input value={title} onChange={handleInputTitle}></input>
      </div>

      <div>
        <p>本文</p>
        <textarea value={diary} onChange={handleInputDiary}></textarea>
      </div>

      <button onClick={handleEntryDiary}>保存</button>

    </>
  )
}


export default App;