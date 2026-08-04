import Diary from "./Diary";

const DiaryList = ({ diaryList, handleDeleteDiary, handleUpadateDiary })=>{
  const result = diaryList.map((diary)=>{
      return <Diary 
                key={diary.id} diary={diary}
                handleDeleteDiary={handleDeleteDiary}
                handleUpadateDiary={handleUpadateDiary}
              />
  });

  return result;
}

export default DiaryList;
