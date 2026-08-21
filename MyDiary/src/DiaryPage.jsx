import { useContext } from "react";
import AuthContext from "./AuthContext";
import useDiaries from "./useDiaries";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import LoadingUI from "./LoadingUI";

const DiaryPage = () => {
    const {diaryList, deletingID, updatingID, fetchLoading, addLoading, updateLoading, errorMessage, successMessage, addDiary, deleteDiary, upadateDiary} = useDiaries();
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
                        {diaryList.length > 0 
                            ? (
                                <DiaryList 
                                    diaryList={diaryList}
                                    handleDeleteDiary={deleteDiary}
                                    handleUpadateDiary={upadateDiary}
                                    updatingID={updatingID}
                                    deletingID={deletingID}
                                />
                            ) 
                            : (
                                <p>保存された日記はありません</p>
                            ) 
                        }
                    </>
                )
            }
        </>
     )
}

export default DiaryPage;