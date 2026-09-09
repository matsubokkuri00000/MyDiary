import { useState, useRef, useEffect} from "react";
import { Pencil, Trash2 } from "lucide-react";
import "../../styles/diary-card.css";

const Diary = ({ 
    diary, 
    handleDeleteDiary, 
    handleupdateDiary, 
    deletingID, 
    updatingID ,
    variant
})=>{
    const [isEditing, setEditing] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [new_diary_title, setNewTitle] = useState(diary.title);
    const [new_diary_main, setNewMainDiary] = useState(diary.main_text);

    const menuRef = useRef(null);

    const handleDelete = ()=>{
        const result = window.confirm("この日記を削除しますか？");

        if(!result){
            return ;
        }


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

    const handleSaveEditDiary = async ()=>{
        const success = await handleupdateDiary(
            diary.id, 
            new_diary_title, 
            new_diary_main
        );

        if(success){
            setEditing(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ){
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    if(isEditing){
        return (
            <article className={`diary-card ${variant === "calendar" ? "calendar" : ""}`}>
                <p className="diary-editing-label">
                    編集中・・・
                </p>

                <div className="diary-edit-form">
                    <div className="diary-edit-group">
                        <label htmlFor={`edit-title-${diary.id}`}>
                            タイトル
                        </label>

                        <input
                            id={`edit-title-${diary.id}`}
                            value={new_diary_title}
                            onChange={handleUpdateTitle}
                        />
                    </div>

                    <div className="diary-edit-group">
                        <label htmlFor={`edit-main-${diary.id}`}>
                            本文
                        </label>

                        <textarea
                            id={`edit-main-${diary.id}`}
                            value={new_diary_main}
                            onChange={handleUpdateMainDiary}
                        />
                    </div>
                </div>

                <div className="diary-card-actions">
                    <button
                        className="diary-save-button"
                        onClick={handleSaveEditDiary}
                        disabled={updatingID !== null}
                    >
                        {updatingID === diary.id ? "更新中..." : "保存"}
                    </button>

                    <button 
                        className="diary-cancel-button"
                        onClick={handleEditMode}
                    >
                        キャンセル
                    </button>
                </div>
            </article>
        );
    }

    if (variant === "calendar" && !isEditing) {
        return (
            <article className="diary-card calendar-diary-card">
                <div className="calendar-diary-row">

                    <p className="calendar-diary-time">
                        {new Date(diary.created_at).toLocaleTimeString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </p>

                    <p className="calendar-diary-body">
                        {diary.main_text}
                    </p>

                    <div 
                        className="calendar-diary-menu-wrapper"
                        ref={menuRef}
                    >
                        <button
                            className="calendar-diary-menu-button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            ︙
                        </button>

                        {isMenuOpen && (
                            <div className="calendar-diary-menu">
                                <button
                                    className="calendar-menu-delete"
                                    onClick={handleDelete}
                                    disabled={deletingID !== null}
                                    aria-label = "削除"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <button
                                className="calendar-menu-edit"
                                    onClick={() => {
                                        handleEditMode();
                                        setIsMenuOpen(false);
                                    }}
                                    aria-label = "編集"
                                >
                                    <Pencil size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </article>
        );
    }

    return(
        <article className={`diary-card ${variant === "calendar" ? "calendar" : ""}`}>
            <div className="diary-card-meta">
                <p>作成日時：{new Date(diary.created_at).toLocaleString("ja-JP")}</p>

                {diary.created_at != diary.updated_at && (
                    <p>更新日時：{new Date(diary.updated_at).toLocaleString("ja-JP")}</p>
                )}

            </div>
            
            <h3 className="diary-card-title">
                {diary.title}
            </h3>


            <p className="diary-card-body">
                {diary.main_text}
            </p>

            
            <div className="diary-card-actions">
                <button 
                className="diary-delete-button"
                    onClick={handleDelete}
                    disabled={deletingID !== null}
                >
                    {deletingID === diary.id ? "削除中..." : "削除" }
                </button>

                <button 
                    className="diary-edit-button"
                    onClick={handleEditMode}
                >
                    編集
                </button>
            </div>
        </article>
    )
}

export default Diary;

