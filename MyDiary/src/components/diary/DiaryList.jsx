import Diary from "./Diary";
import "../../styles/diary-list.css"

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

  return (
    <div className="diary-list">
      {result}
    </div>
  );
}

export default DiaryList;
