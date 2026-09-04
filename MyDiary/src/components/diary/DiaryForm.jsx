import { useState } from "react";
import "../../styles/diary-form.css";


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

  const handleTitleKeyDown = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
    }
  }

  return (
    <section className="diary-form-section">
      <div className="diary-form-header">
        <h2>入力フォーム</h2>
        <p>思いついたことを自由に書く</p>
      </div>

      <form 
        className="diary-form"
        onSubmit={DiaryChekker}
      >
        
        <div className="form-group">
          <label htmlFor="diary-title">タイトル</label>
          <input 
            id="diary-title"
            value={diary_title} 
            onChange={handleTitle}
            onKeyDown={handleTitleKeyDown}
          />
        </div>

        <div className="form-group">
          <label htmlFor="diary-main">本文</label>
          <textarea 
            id="diary-main"
            value={diary_main} 
            onChange={handleMainDiary}
          />
        </div>

        {errorMessage && (
          <p className="form-error">
            {errorMessage}
          </p>
        )}

        <button 
          className="diary-submit-button"
          type="submit"
          disabled={addLoading}
        >
          {addLoading ? "保存中..." : "保存"}
        </button>

      </form>
    </section>
  )
}

export default DiaryForm;