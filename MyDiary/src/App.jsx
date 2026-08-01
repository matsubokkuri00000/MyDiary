import { useState } from "react";
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";
import { v4 as uuidv4 } from 'uuid';

function App(){

  return (
    <>
      <h1>Diary</h1>

      <p>------入力コンポーネント------</p>
      <DiaryForm />

      <p>------日記一覧------</p>
      <DiaryList />
    </>
  )
}


export default App;