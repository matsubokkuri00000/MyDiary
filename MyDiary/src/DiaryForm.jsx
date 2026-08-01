import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DiaryForm = ()=>{
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [diaryList, setDiaryList] = useState([]);

  const handleInputTitle = (event)=>{
    setTitle(event.target.value);
  }

  const handleInputDiary = (event)=>{
    setDiary(event.target.value)
  }

  const handleEntryDiary = ()=>{
    const newDiarys = [
      ...diaryList,
      {
        id:uuidv4(),
        title:title,
        diary:diary
      }
    ]

    setDiaryList(newDiarys);

    setTitle("");
    setDiary("");
    console.log(newDiarys);
  }

  return (
    <>
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

export default DiaryForm;
