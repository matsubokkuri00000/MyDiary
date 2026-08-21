import { useState } from "react"


const DiaryForm = ({ handleAddDiary, addLoading })=>{
  const [diary_title, setTitle] = useState("");
  const [diary_main, setMainDiary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const handleTitle = (event)=>{
    setTitle(event.target.value);
  }
  const handleMainDiary = (event)=>{
    setMainDiary(event.target.value);
  }

  const DiaryChekker = (event) => {
    event.preventDefault();

    if(!diary_title.trim() && !diary_main.trim()){
      setErrorMessage("タイトルか本文を書いてください");
      return;
    }

    setErrorMessage("");

    handleAddDiary(diary_title, diary_main);

    setTitle("");
    setMainDiary("");
  }

  return (
    <>
      <p>------入力フォーム------</p>

      <form onSubmit={DiaryChekker}>
        <div>
          <label>
            <p>タイトル：</p>
            <input 
              value={diary_title} 
              onChange={handleTitle}
            />
          </label>
        </div>

        <div>
          <label>
            <p>本文：</p>
            <textarea 
              value={diary_main} 
              onChange={handleMainDiary}
            />
          </label>
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        <button 
          type="submit"
          disabled={addLoading}
        >
          {addLoading ? "保存中..." : "保存"}
        </button>
      </form>
    </>
  )
}

export default DiaryForm;