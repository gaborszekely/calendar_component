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
      year: new Date().getFullYear(),
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
    if (this.state.month !== prevState.month) {
      this.fillCalendarDays();
    }
  }

  updateMonth(diff) {
    const changed = this.state.month + diff;

    if (changed < 0) {
      this.setState(prevState => ({
        month: 12 + changed,
        year: prevState.year - 1
      }));
    } else if (changed > 11) {
      this.setState(prevState => ({
        month: changed - 12,
        year: prevState.year + 1
      }));
    } else {
      this.setState({ month: changed });
    }
  }

  fillCalendarDays() {
    const { month, year } = this.state;
    const calendarDays = [];

    // If month's starting date is not a Sunday, fill in days from previous month
    const startDay = getFirstDay(year, month);

    if (startDay > 0) {
      const previousMonthEnd = getPrevMonthEnd(year, month);
      const startPoint = previousMonthEnd - startDay + 1;
      for (let i = startPoint; i <= previousMonthEnd; i++) {
        calendarDays.push({ date: i, month: new Date().getMonth() - 1 });
      }
      this.setState({ showPrevMonth: true });
    }

    // Fill in current month's days
    const daysInCurrentMonth = getDaysInMonth(year, month);
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      calendarDays.push({ date: i, month: new Date().getMonth() });
    }

    // If month's ending date is not on a Saturday, fill in remaining days to complete calendar
    const endDay = getEndingDay(year, month);
    if (endDay < 6) {
      for (let i = 1; i <= 6 - endDay; i++) {
        calendarDays.push({ date: i, month: new Date().getMonth() + 1 });
      }
      this.setState({ showNextMonth: true });
    }

    this.setState({ calendarDays });
  }

  render() {
    const { calendarDays, month, year } = this.state;
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    return (
      <div className="page__wrapper">
        <div>
          <button onClick={() => this.updateMonth(-1)}>Back</button>
          <button onClick={() => this.updateMonth(1)}>Forward</button>
        </div>
        <h1>
          {months[month]} {year}
        </h1>
        <div className="calendar">
          {days.map(day => (
            <div key={day}>{day}</div>
          ))}
          {calendarDays.map((item, index) => (
            <div
              key={`${item.month}-${index}`}
              style={{
                backgroundColor: item.month === currentMonth ? "#fff" : "#ccc",
                border: "1px solid #666"
              }}
            >
              <span
                className={
                  currentMonth === month && currentDate === item.date
                    ? "current-day"
                    : ""
                }
              >
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
