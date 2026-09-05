import useDiaries from "../hooks/useDiaries";
import DiaryForm from "../components/diary/DiaryForm";
import DiaryList from "../components/diary/DiaryList";
import Toast from "../components/toast/Toast";

const DiaryPage = () => {
    const {diaryList, deletingID, updatingID, fetchLoading, addLoading, addDiary, deleteDiary, updateDiary, successMessage, errorMessage} = useDiaries();

     return (
        <>
            <Toast 
                message={successMessage || errorMessage}
                type={errorMessage ? "error" : "success"}
            />

            {fetchLoading
                ? (
                    <p>Now Loading...</p>
                )
                : (
                    <>
                        <DiaryForm 
                            handleAddDiary={addDiary}
                            addLoading={addLoading}
                        />
                        
                        {diaryList.length > 0 
                            ? (
                                <DiaryList 
                                    diaryList={diaryList}
                                    handleDeleteDiary={deleteDiary}
                                    handleupdateDiary={updateDiary}
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