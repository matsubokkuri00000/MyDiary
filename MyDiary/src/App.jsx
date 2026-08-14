import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import useDiaries from "./useDiaries";

function App (){
  const { diaryList, addDiary, deleteDiary, upadateDiary } = useDiaries();
  
  return (
    <>
      <h1>Diary</h1>
      <DiaryForm handleAddDiary={addDiary}/>

        <p>----一覧表示-----</p>
      <DiaryList 
        diaryList={diaryList}
        handleDeleteDiary={deleteDiary}
        handleUpadateDiary={upadateDiary}
      />
    </>
  )
}

export default App;