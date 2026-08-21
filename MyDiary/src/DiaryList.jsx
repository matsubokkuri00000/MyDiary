import Diary from "./Diary";

const DiaryList = ({ diaryList, handleDeleteDiary, handleUpadateDiary, updateLoading, deletingID })=>{
  const result = diaryList.map((diary)=>{
      return <Diary 
                key={diary.id}
                diary={diary}
                handleDeleteDiary={handleDeleteDiary}
                handleUpadateDiary={handleUpadateDiary}
                updateLoading={updateLoading}
                deletingID={deletingID}
              />
  });

  return result;
}

export default DiaryList;
