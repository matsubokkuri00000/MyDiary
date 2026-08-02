import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const DiaryForm = ({ setDiaryList })=>{
  const [diary_title, setTitle] = useState("");
  const [diary_main, setMainDiary] = useState("");

  
  const handleTitle = (event)=>{
    setTitle(event.target.value);
  }
  const handleMainDiary = (event)=>{
    setMainDiary(event.target.value);
  }

  const handleSaveButton = ()=>{

    setDiaryList(diary_title, diary_main);
  
    setTitle("");
    setMainDiary("");
  }



  return (
    <>
      <p>------入力フォーム------</p>
      
      <div>
        <label>
          <p>タイトル：{diary_title}</p>
          <input value={diary_title} onChange={handleTitle}/>
        </label>
      </div>

      <div>
        <label>
          <p>本文：</p>
          <textarea value={diary_main} onChange={handleMainDiary}/>
        </label>
      </div>

      <button onClick={handleSaveButton}>保存</button>
    </>
  )
}

export default DiaryForm;