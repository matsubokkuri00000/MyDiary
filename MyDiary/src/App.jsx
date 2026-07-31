function App(){

  return (
    <>
      <h1>----MyDiary----</h1>
      <DiaryForm />
      <DiaryList />
      <DiaryList />
    </>
  )
}

const DiaryForm = ()=>{
  return (
    <>
      <div>
        <label>
          <p>タイトル</p>
          <input></input>
          <p>本文</p>
          <textarea></textarea>
        </label>
      </div>
      <button>保存</button>
      <h1>-------------------</h1>
    </>
  )
}

const DiaryList = ()=>{
  return (
    <>
        <label>
          <p>タイトル</p>
          <p>本文</p>
          <button>削除</button>
          <h1>-------------------</h1>
        </label>
    </>
  )
}

export default App;