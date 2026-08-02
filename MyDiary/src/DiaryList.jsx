const DiaryList = ({ diaryList })=>{
  const result = diaryList.map((diary)=>{
      return (
        <article key={diary.id}>
          <p>タイトル：{diary.title}</p>
          <p>日時：{diary.date}</p>
          <p>本文：{diary.mainText}</p>
          <p>----------------</p>
        </article>
      )
  });

  return result;
}

export default DiaryList;