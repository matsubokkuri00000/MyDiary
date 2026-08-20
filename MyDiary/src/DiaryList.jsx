import Diary from "./Diary";

const DiaryList = ({ diaryList, handleDeleteDiary, handleUpadateDiary, deleteLoading, updateLoading })=>{
  const result = diaryList.map((diary)=>{
      return <Diary 
                key={diary.id} diary={diary}
                handleDeleteDiary={handleDeleteDiary}
                handleUpadateDiary={handleUpadateDiary}
                deleteLoading={deleteLoading}
                updateLoading={updateLoading}
              />
  });

  return result;
}

export default DiaryList;
