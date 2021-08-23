import React from "react";

export default function header(props) {
    return (
        <div className="header-wrapper">
            <button onClick = {() => props.handleMonthChange("previous")}>Previous</button>
            <h2>{props.monthName}</h2>
            <button onClick = {() => props.handleMonthChange("next")}>Next</button>
        </div>
    )
}