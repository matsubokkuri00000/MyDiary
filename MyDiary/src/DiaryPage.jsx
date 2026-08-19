import { useContext } from "react";
import AuthContext from "./AuthContext";
import useDiaries from "./useDiaries";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";

const DiaryPage = () => {
    const { diaryList,loading, addDiary, deleteDiary, upadateDiary } = useDiaries();
    const { user, signOut } = useContext(AuthContext);

     return (
        <>
            <button onClick={signOut}>
                ログアウト
            </button>
            <p>ログイン中のユーザ：{user?.email}</p>

            <h1>Diary</h1>
            <DiaryForm handleAddDiary={addDiary}/>

            <p>----一覧表示-----</p>
            <DiaryList 
                diaryList={diaryList}
                handleDeleteDiary={deleteDiary}
                handleUpadateDiary={upadateDiary}
            />
        </>
     )
}

export default DiaryPage;