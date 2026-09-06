import { useState } from "react";
import { ja } from "date-fns/locale"
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css"
import "../styles/calendar.css"
import { supabase } from "../services/supabase";

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectDiaries, setSelectDiaries] = useState([]);

    const fetchDiariesDate = async (date) => {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(0, 0, 0, 0);

        const { data, error } = await supabase
            .from("diaries")
            .select("*")
            .gte("created_at", startDate.toISOString())
            .lt("created_at", nextDate.toISOString())
            .order("created_at", { ascending: true });

        console.log(data);
        console.log(error);

        setSelectDiaries(data);
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date);

        if(date){
            fetchDiariesDate(date)
        }
    }

    return (
        <section className="calendar-page">
            <div className="calendar-layout">

                <div className="calendar-left">
                    <h2 className="calendar-title">
                        Calendar
                    </h2>
                    <DayPicker 
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        locale={ja}
                    />   
                </div>

                <div className="calendar-right">
                    <p>
                        選択中の日付：{selectedDate?.toLocaleDateString()}
                    </p>  

                    {selectDiaries.map((diary) => (
                        <p key={diary.id}>
                            {diary.main_text}
                        </p>
                    ))}
 
                </div>
                
            </div>       
        </section>
    )
}

export default CalendarPage;