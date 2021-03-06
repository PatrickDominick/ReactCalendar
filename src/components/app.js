import React, { Component } from 'react';
import Header from "./header";
import Content from "./content-wrapper";
import Footer from "./footer";
import loading from "../../static/assets/loading.gif"


export default class App extends Component {
  constructor() {
    super()

    this.monthList = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
    this.now = this.calculateDateData()
    this.state = {
      monthData: [],
      month: {},
      loading: true
    }

    this.handleMonthChange = this.handleMonthChange.bind(this)
    
  }

  calculateDateData() {
    const now = new Date()
    const month = this.monthList[now.getMonth()]
    const year = now.getFullYear()
    return { month, year }
  }

  componentDidMount() {
    fetch("https://calendar-api-pdn.herokuapp.com/month/get")
    .then(response => response.json())
    .then(data => this.setState({
      monthData: data,
      month: data.filter(month => month.name === this.now.month && month.year === this.now.year)[0],
      loading: false
    }))
    .catch(error => console.log("You done messed up getting month data A A Ron!", error))
  }

  handleMonthChange(direction) {
    const currentMonthIndex = this.monthList.indexOf(this.state.month.name)
    // ToDo: Calculate if index overlfow on either end, and update the year accordingly
    const newMonthName = this.monthList[direction === "next" ? currentMonthIndex +1 : currentMonthIndex - 1]
    const newMonthData = this.state.monthData.filter(month => month.name === newMonthName)[0]
    this.setState({ month: newMonthData })
  }

  render() {
    return (
      <div className='app'>
        {this.state.loading
        ?
        <img src={loading} alt="loading gif" ></img>
        : 
        [<Header monthName={this.state.month.name} handleMonthChange = {this.handleMonthChange}/>,
        <Content month = {this.state.month}/>,
        <Footer year={this.state.month.year} />]}
      </div>
    );
  }
}
