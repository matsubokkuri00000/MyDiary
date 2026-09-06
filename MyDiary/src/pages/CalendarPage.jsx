import { useState , useEffect} from "react";
import { ja } from "date-fns/locale"
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css"
import "../styles/calendar.css"
import useCalendarDiaries from "../hooks/useCalendarDiaries";
import Toast from "../components/toast/Toast";
import Loading from "../components/loading/Loading";
import DiaryList from "../components/diary/DiaryList";

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {
        selectedDiaries,
        deleteDiary, 
        deletingID,
        updateDiary,
        updatingID,
        loading, 
        errorMessage, 
        successMessage,
        fetchByDate
    } = useCalendarDiaries();

    const handleDateSelect = (date) => {
        if(!date){
            return;
        }

        setSelectedDate(date);

    }

    useEffect(()=>{
        fetchByDate(selectedDate);
    }, [selectedDate]);

    return (
        <>
            <Toast 
                message={errorMessage || successMessage}
                type={errorMessage ? "error" : "success"}
            />

            <section className="calendar-page">
                <div className="calendar-layout">

                    <div className="calendar-left">
                        <h2 className="calendar-title">
                            Calendar
                        </h2>
                        <DayPicker 
                            mode="single"
                            selected={selectedDate}
                            required
                            onSelect={handleDateSelect}
                            locale={ja}
                        />   
                    </div>

                    <div className="calendar-right">
                        <p>
                            選択中の日付：{selectedDate?.toLocaleDateString()}
                        </p>  

                        {loading
                            ? (
                                <Loading />
                            )
                            : (
                                <>
                                    {selectedDiaries.length > 0
                                        ? (
                                            <DiaryList 
                                                diaryList={selectedDiaries}
                                                handleDeleteDiary={(ID) => 
                                                    deleteDiary(ID, selectedDate)
                                                }
                                                handleupdateDiary={(ID, newTitle, newDiary) => 
                                                    updateDiary(ID, newTitle, newDiary, selectedDate)
                                                }
                                                deletingID={deletingID}
                                                updatingID={updatingID}
                                            />
                                        )
                                        : (
                                            <p>この日の日記はありません</p>
                                        )
                                    }
                                </>
                            )
                        }
    
                    </div>
                    
                </div>       
            </section>
        
        </>
        
    )
}

export default CalendarPage;