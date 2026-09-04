import useDiaries from "../hooks/useDiaries";
import DiaryForm from "../components/diary/DiaryForm";
import DiaryList from "../components/diary/DiaryList";

const DiaryPage = () => {
    const {diaryList, deletingID, updatingID, fetchLoading, addLoading, addDiary, deleteDiary, updateDiary} = useDiaries();

     return (
        <>
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