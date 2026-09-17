import { useState } from "react";
import "../../styles/diary-form.css";
import { Send } from "lucide-react";


const DiaryForm = ({ handleAddDiary, addLoading })=>{
  const [diary_title, setTitle] = useState("");
  const [diary_main, setMainDiary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);


  const handleMainDiary = (event)=>{
    setMainDiary(event.target.value);
  }

  const DiaryChekker = (event) => {
    event.preventDefault();

    if(!diary_title.trim() && !diary_main.trim()){
      setErrorMessage("本文を書いてください");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000)
      return;
    }
    
    setErrorMessage("");

    setIsCooldown(true);

    setTimeout(() => {
      setIsCooldown(false);
    }, 3000);

    handleAddDiary(diary_title, diary_main);

    setTitle("");
    setMainDiary("");
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
          <label className="visually-hidden"  htmlFor="diary-main">本文</label>
          <textarea 
            id="diary-main"
            value={diary_main} 
            onChange={handleMainDiary}
            maxLength={10000}
            placeholder="今の気持ち、考えたこと、気づき、なんでも書いてみよう"
          />

          <p className="diary-character-count">
            {diary_main.length} / 10000
          </p>
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
          disabled={addLoading || isCooldown}
        >
          <Send size={18} />
          <span> {addLoading ? "保存中..." : "保存"}</span>
        </button>

      </form>
    </section>
  )
}

export default DiaryForm;