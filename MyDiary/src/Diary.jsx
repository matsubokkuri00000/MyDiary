import { useState } from "react";

const Diary = ({ diary, handleDeleteDiary, handleUpadateDiary })=>{
    const [isEditing, setEditing] = useState(false);

    const handleDelete = ()=>{
        handleDeleteDiary(diary.id);
    }

    const handleEditMode = ()=>{
        setEditing(!isEditing);
    }
    
    if(isEditing){
        return (
            <>
                <p>展開中</p>
                <button onClick={handleEditMode}>キャンセル</button>
            </>
        );
    }

    return (
        <article>
            <p>タイトル：{diary.title}</p>
            <p>日時：{diary.date}</p>
            <p>本文：{diary.mainText}</p>
            <p>編集モード：{isEditing}</p>
            <button onClick={handleDelete}>削除</button>
            <button onClick={handleEditMode}>編集</button>
            <p>---------------------</p>
        </article>
    )
}

export default Diary;

