import React from "react";
import DayOfWeek from "./day-of-week"
import CalendarBox from "./calendar-box"

export default function calendarWrapper(props) {

    const renderCalendarBoxes = () => {
        const calendarBoxesArray = []
        for (let i = 0; i < 42; i+1) {
            calendarBoxesArray.push(
                <CalendarBox />
            )
        }
        return calendarBoxesArray
    }

    return (
        <div className="calendar-wrapper">
            <DayOfWeek day = "Sunday" />
            <DayOfWeek day = "Monday" />
            <DayOfWeek day = "Tuesday" />
            <DayOfWeek day = "Wednesday" />
            <DayOfWeek day = "Thursday" />
            <DayOfWeek day = "Friday" />
            <DayOfWeek day = "Saturday" />
            {renderCalendarBoxes()}
        </div>
    )
}