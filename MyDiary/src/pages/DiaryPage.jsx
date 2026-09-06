import useDiaries from "../hooks/useDiaries";
import DiaryForm from "../components/diary/DiaryForm";
import DiaryList from "../components/diary/DiaryList";
import Toast from "../components/toast/Toast";
import Loading from "../components/loading/Loading.jsx";

const DiaryPage = () => {
    const {diaryList, deletingID, updatingID, fetchLoading, addLoading, addDiary, deleteDiary, updateDiary, successMessage, errorMessage} = useDiaries();

     return (
        <>
            <Toast 
                message={ errorMessage || successMessage}
                type={errorMessage ? "error" : "success"}
            />

            {fetchLoading
                ? (
                    <Loading />
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