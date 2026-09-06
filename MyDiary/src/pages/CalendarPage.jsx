import { useState } from "react";
import { ja } from "date-fns/locale"
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css"
import "../styles/calendar.css"

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <section className="calendar-page">
            <div className="calendar-layout">

                <div className="calendar-left">
                    <DayPicker 
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        
                    />   
                </div>

                <div className="calendar-right">
                    <p>
                        選択中の日付：{selectedDate?.toLocaleDateString()}
                    </p>  
                    <p>
                        ここに選択した日の投稿を表示
                    </p>
                </div>
                
            </div>       
        </section>
    )
}

export default CalendarPage;