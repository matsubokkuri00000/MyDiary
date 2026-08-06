import { useState } from "react";

const Diary = ({ diary, handleDeleteDiary, handleUpadateDiary })=>{
    const [isEditing, setEditing] = useState(false);
    const [new_diary_title, setNewTitle] = useState(diary.title);
    const [new_diary_main, setNewMainDiary] = useState(diary.main_text);

    const handleDelete = ()=>{
        handleDeleteDiary(diary.id);
    }

    const handleEditMode = ()=>{
        setEditing(!isEditing);
    }
    
    const handleUpdateTitle = (event)=>{
        setNewTitle(event.target.value);
    }

    const handleUpdateMainDiary = (event)=>{
        setNewMainDiary(event.target.value);
    }

    const handleSaveEditDiary = ()=>{
        handleUpadateDiary(diary.id, new_diary_title, new_diary_main)

        setEditing(!isEditing);
    }


    if(isEditing){
        return (
            <>
                <p>編集中・・・</p>

                <div>
                    <label>
                        <p>タイトル：</p>
                        <input value={new_diary_title} onChange={handleUpdateTitle}></input></label>
                    <label>
                        <p>本文</p>
                        <textarea value={new_diary_main} onChange={handleUpdateMainDiary}></textarea>
                    </label>
                </div>

                <button onClick={handleSaveEditDiary}>保存</button>
                <button onClick={handleEditMode}>キャンセル</button>
            </>
        );
    }

    return (
        <article>
            <p>日時：{new Date(diary.created_at).toLocaleString("ja-JP")}</p>
            <p>タイトル：{diary.title}</p>
            <p>本文：{diary.main_text}</p>

            <button onClick={handleDelete}>削除</button>
            <button onClick={handleEditMode}>編集</button>
            <p>---------------------</p>
        </article>
    )
}

export default Diary;

