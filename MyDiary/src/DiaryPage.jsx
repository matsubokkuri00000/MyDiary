import useDiaries from "./useDiaries";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import LoadingUI from "./LoadingUI";

const DiaryPage = () => {
    const {diaryList, deletingID, updatingID, fetchLoading, addLoading, addDiary, deleteDiary, upadateDiary} = useDiaries();

     return (
        <>
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