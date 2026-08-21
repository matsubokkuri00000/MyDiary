import Diary from "./Diary";

const DiaryList = ({ diaryList, handleDeleteDiary, handleUpadateDiary, deleteLoading, updateLoading, deletingID })=>{
  const result = diaryList.map((diary)=>{
      return <Diary 
                key={diary.id}
                diary={diary}
                handleDeleteDiary={handleDeleteDiary}
                handleUpadateDiary={handleUpadateDiary}
                deleteLoading={deleteLoading}
                updateLoading={updateLoading}
                deletingID={deletingID}
              />
  });

  return result;
}

export default DiaryList;
