import Diary from "./Diary";

const DiaryList = ({ diaryList, handleDeleteDiary, handleupdateDiary, updateLoading, deletingID, updatingID })=>{
  const result = diaryList.map((diary)=>{
      return <Diary 
                key={diary.id}
                diary={diary}
                handleDeleteDiary={handleDeleteDiary}
                handleupdateDiary={handleupdateDiary}
                updateLoading={updateLoading}
                deletingID={deletingID}
                updatingID={updatingID}
              />
  });

  return result;
}

export default DiaryList;
