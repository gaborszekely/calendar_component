import React, { Component } from "react";
import "./App.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDay = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const getPrevMonthEnd = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getEndingDay = (year, month) => {
  return new Date(year, month, getDaysInMonth(year, month)).getDay();
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth(),
      showPrevMonth: false,
      showNextMonth: false,
      calendarDays: []
    };

    this.fillCalendarDays = this.fillCalendarDays.bind(this);
    this.updateMonth = this.updateMonth.bind(this);
  }

  componentDidMount() {
    this.fillCalendarDays();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.month === prevState.month) return;
    this.fillCalendarDays();
  }

  updateMonth(change) {
    this.setState(prevState => ({
      month: prevState.month + change
    }));
  }

  fillCalendarDays() {
    const { month } = this.state;
    const currentYear = new Date().getFullYear();
    const calendarDays = [];

    // If month's starting date is not a Sunday, fill in days from previous month
    const startDay = getFirstDay(currentYear, month);

    if (startDay > 0) {
      const previousMonthEnd = getPrevMonthEnd(currentYear, month);
      const startPoint = previousMonthEnd - startDay + 1;
      for (let i = startPoint; i <= previousMonthEnd; i++) {
        calendarDays.push({ date: i, month: new Date().getMonth() - 1 });
      }
      this.setState({ showPrevMonth: true });
    }

    // Fill in current month's days
    const daysInCurrentMonth = getDaysInMonth(currentYear, month);
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      calendarDays.push({ date: i, month: new Date().getMonth() });
    }

    // If month's ending date is not on a Saturday, fill in remaining days to complete calendar
    const endDay = getEndingDay(currentYear, month);
    if (endDay < 6) {
      for (let i = 1; i <= 6 - endDay; i++) {
        calendarDays.push({ date: i, month: new Date().getMonth() + 1 });
      }
      this.setState({ showNextMonth: true });
    }

    this.setState({ calendarDays });
  }

  render() {
    const { calendarDays, month } = this.state;
    const currentMonth = new Date().getMonth();

    return (
      <div className="page__wrapper">
        <div>
          <button onClick={() => this.updateMonth(-1)}>Back</button>
          <button onClick={() => this.updateMonth(1)}>Forward</button>
        </div>
        <h1>{months[month]}</h1>
        <div className="calendar">
          {days.map(day => (
            <div key={day}>{day}</div>
          ))}
          {calendarDays.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: item.month !== currentMonth ? "#ccc" : "#fff",
                border: "1px solid #666"
              }}
            >
              {item.date}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
