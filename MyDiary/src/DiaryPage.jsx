import { useContext } from "react";
import AuthContext from "./AuthContext";
import useDiaries from "./useDiaries";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import LoadingUI from "./LoadingUI";

const DiaryPage = () => {
    const {diaryList, fetchLoading, addLoading, deleteLoading, updateLoading, errorMessage, successMessage, addDiary, deleteDiary, upadateDiary} = useDiaries();
    const { user, signOut } = useContext(AuthContext);

     return (
        <>
            <button onClick={signOut}>
                ログアウト
            </button>
            <p>ログイン中のユーザ：{user?.email}</p>

            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}

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
                        />

                        <p>----一覧表示-----</p>
                        <DiaryList 
                            diaryList={diaryList}
                            handleDeleteDiary={deleteDiary}
                            handleUpadateDiary={upadateDiary}
                            deleteLoading={deleteLoading}
                            updateLoading={updateLoading}
                        />
                    </>
                )
            }
        </>
     )
}

export default DiaryPage;