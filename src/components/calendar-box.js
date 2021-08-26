import React, { Component } from "react";

export default class CalendarBox extends Component {
    constructor(props) {
        super()

        const reminder = props.month ? props.month.reminders.filter(reminder => reminder.date === props.date)[0] : undefined

        this.state = {
            reminderExists: reminder ? true : false,
            textInput: reminder ? reminder.text : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount() {
    //     if (!this.props.overflow) {
    //     fetch(`https://calendar-api-pdn.herokuapp.com/reminder/get/${this.props.month.id}/${this.props.date}`,
    //     {method: "GET"})
    //     .then(response => response.json)
    //     .then( data => {
    //         if (data.id) {
    //             this.setState({
    //                 reminderExists: true,
    //                 textInput: data.text
    //             })
    //         }
    //     })
    //     .catch(error => console.log("Error getting reminders fool! ", error))
    //     }
    // }

    handleSubmit() {
        if (!this.state.reminderExists && this.state.textInput !== "") {
            fetch("https://calendar-api-pdn.herokuapp.com/reminder/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    text: this.state.textInput,
                    date: this.props.date,
                    month_id: this.props.month.id
                })
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data === "string") {
                    console.log(data)
                }
                else {
                    this.setState({ reminderExists: true })
                }
            })
            .catch(error => console.log("Error posting reminder fool! ", error))
        }
        else if (this.state.reminderExists && this.state.textInput !== "") {
            fetch(`https://calendar-api-pdn.herokuapp.com/reminder/update/${this.props.month.id}/${this.props.date}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ text: this.state.textInput, })
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data === "string") {
                    console.log(data)
                }
                
            })
            .catch(error => console.log("Error updating reminder fool! ", error))
        }
        else if (this.state.reminderExists && this.state.textInput === "") {
            fetch(`https://calendar-api-pdn.herokuapp.com/reminder/delete/${this.props.month.id}/${this.props.date}`, {
                method: "DELETE"
                })
            .then(response => response.json())
            .then(data => this.setState({ reminderExists: false}))
            .catch(error => console.log("Error deleting reminder fool! ", error))
        }

    }

    render() {
        return (
            <div className={`calendar-box ${this.props.overflow ? "overflow": null}`}>
                <span>{this.props.date}</span>
                <textarea value = {this.state.textInput} 
                onBlur = {this.handleSubmit} 
                onChange = {(event => this.setState({ textInput: event.target.value })).bind(this)}
                disabled = {this.props.overflow}></textarea>
            </div>
        )
    }
}