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

      setTimeout(() => {
        setErrorMessage("");
      }, 3000)
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
          <label className="visually-hidden" htmlFor="diary-title">タイトル</label>
          <input 
            id="diary-title"
            value={diary_title} 
            onChange={handleTitle}
            onKeyDown={handleTitleKeyDown}
            placeholder="タイトル（任意）"
          />
        </div>

        <div className="form-group">
          <label className="visually-hidden"  htmlFor="diary-main">本文</label>
          <textarea 
            id="diary-main"
            value={diary_main} 
            onChange={handleMainDiary}
            placeholder="今の気持ち、考えたこと、気づき、なんでも書いてみよう"
          />
        </div>

        <div className="form-message">
          {errorMessage && (
            <p className="form-error">
              {errorMessage}
            </p>
          )}
        </div>

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