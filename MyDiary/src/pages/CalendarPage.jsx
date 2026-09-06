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
                    <h2 className="calendar-title">
                        Calendar
                    </h2>
                    <DayPicker 
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ja}
                    />   
                </div>

                <div className="calendar-right">
                    <p>
                        選択中の日付：{selectedDate?.toLocaleDateString()}
                    </p>  
                    <p>
                        ここに選択した日の投稿を表示
                    </p>

                        <p>ここに選択した日の投稿を表示</p>
    <p>テスト日記1</p>
    <p>テスト日記2</p>
    <p>テスト日記3</p>
    <p>テスト日記4</p>
    <p>テスト日記5</p>
    <p>テスト日記6</p>
    <p>テスト日記7</p>
    <p>テスト日記8</p>
    <p>テスト日記9</p>
    <p>テスト日記10</p>
        <p>ここに選択した日の投稿を表示</p>
    <p>テスト日記1</p>
    <p>テスト日記2</p>
    <p>テスト日記3</p>
    <p>テスト日記4</p>
    <p>テスト日記5</p>
    <p>テスト日記6</p>
    <p>テスト日記7</p>
    <p>テスト日記8</p>
    <p>テスト日記9</p>
    <p>テスト日記10</p>
                </div>
                
            </div>       
        </section>
    )
}

export default CalendarPage;