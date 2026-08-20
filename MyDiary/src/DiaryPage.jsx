import { useContext } from "react";
import AuthContext from "./AuthContext";
import useDiaries from "./useDiaries";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import LoadingUI from "./LoadingUI";

const DiaryPage = () => {
    const { diaryList, addLoading, deleteLoading, fetchLoading, updateLoading, addDiary, deleteDiary, upadateDiary } = useDiaries();
    const { user, signOut } = useContext(AuthContext);

     return (
        <>
            <button onClick={signOut}>
                ログアウト
            </button>
            <p>ログイン中のユーザ：{user?.email}</p>

            <h1>Diary</h1>
            {fetchLoading
                ? (
                    <LoadingUI />
                )
                : (
                    <>
                        <DiaryForm 
                            handleAddDiary={addDiary}
                            addLoading={addLoading}
                            deleteLoading={deleteLoading}
                        />

                        <p>----一覧表示-----</p>
                        <DiaryList 
                            diaryList={diaryList}
                            handleDeleteDiary={deleteDiary}
                            handleUpadateDiary={upadateDiary}
                        />
                    </>
                )
            }
        </>
     )
}

export default DiaryPage;