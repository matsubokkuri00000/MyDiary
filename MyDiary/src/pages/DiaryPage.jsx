import useDiaries from "../hooks/useDiaries";
import DiaryForm from "../components/diary/DiaryForm";
//import DiaryList from "../components/diary/DiaryList";
import Toast from "../components/toast/Toast";
import Loading from "../components/loading/Loading.jsx";

const DiaryPage = () => {
    const {fetchLoading, addLoading, addDiary, successMessage, errorMessage} = useDiaries();

     return (
        <>
            <Toast 
                message={ errorMessage || successMessage}
                type={errorMessage ? "error" : "success"}
            />

            {fetchLoading
                ? (
                    <Loading />
                )
                : (
                    <DiaryForm 
                        handleAddDiary={addDiary}
                        addLoading={addLoading}
                    />
                )
            }
        </>
     )
}

export default DiaryPage;