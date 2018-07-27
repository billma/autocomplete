import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AutoComplete extends Component {
  render() {
    const {
      value,
      handleChange,
      items
    } = this.props;
    const list = items.map((item, i) => {
      if (!value || item.value.includes(value)) { 
        return <li
          key={i}
          onMouseDown={()=>{
            handleChange(item.value);
          }} >
            {item.label}
          </li>
      }
    });
    return (
      <div className="autocomplete">
        <input
           className="autocomplete-input"
           type="text"
           value={value}
           onChange= { (e) => {
             const value = e.target.value;
             handleChange(value);
           }}
         />
        <ul className="autocomplete-suggest">
           { list }
        </ul>
      </div>
    )
  }
}


/*class App extends Component {
  state={
    value:'',
    items: [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Orange', value: 'orange'},
    ]
  }
  handleChange =(value)=> {
    this.setState({ value })
    // fetch item
  }
  
  render() {
    return (
      <div className="App">
        <AutoComplete
          items={this.state.items}
          value={this.state.value}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}*/



const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const getDaysInMonth = (year, monthIndex) =>{
  return new Date(year, monthIndex + 1, 0).getDate();
}

const getStartDay = (year, monthIndex) => {
  return new Date(year, monthIndex, 1).getDay();
}


class Day extends Component {
  onClick=() => {
    const { day, onClick } = this.props;
    onClick(day);
  }
  render() {
    const {day, current } = this.props 
    return (
      <div
        className={`day ${ day === current ? 'selected ' : '' }`}
        onClick={this.onClick}
      >{day}</div>
    );
  }
}
class DatePicker extends Component {
  state=this.getState()
  componentDidMount() {
    const { value } = this.props;
    const date = new Date(value);
    if (value) this.setState(this.getState(date));
  } 
  getState(date) {
    const currentDate = date || new Date(); 
    const monthIndx = currentDate.getMonth();
    const year = currentDate.getFullYear(); 
    const day = currentDate.getDate();
    const value = `${monthIndx+1}/${day}/${year}`;
    return {
      value,
      currentDate,
      monthIndx,
      year,
      day
    }
  }
  switchMonth =(i) => {
    let { monthIndx, year, day } = this.state;
    let newDate;
    let newMonthIndx = monthIndx + i; 
    if (newMonthIndx >= 12 || newMonthIndx < 0) {
      year = year + i;
      newMonthIndx= newMonthIndx >=12 ? 0: 11;
    }
    return this.setState(this.setState(this.getState(new Date( year, newMonthIndx, day ))));
  } 
  next=()=>{
    this.switchMonth(1);
  }
  prev=()=>{
    this.switchMonth(-1);
  }

  chooseDate = (day) => {
    const { monthIndx, year} = this.state;
    const { onChange } = this.props;
    const newDate = new Date(year, monthIndx, day);
    this.setState(this.getState(newDate));
  }

  render() {
    const {
      value,
      currentDate,
      monthIndx,
      year,
      day,
    } = this.state;
    const daysInMonth = getDaysInMonth(year, monthIndx);
    const startDay =  getStartDay(year, monthIndx);
    const data = Array(startDay + daysInMonth).fill(0).map((x, i)=>{
      if (i >= startDay) return i- startDay + 1;
      return x;
    })
    const calView = data.map((calDay, key)=> {
      if(!calDay) return <div key={key} className="block"></div>
      return <Day 
        key={key}
        onClick={this.chooseDate}
        day= {calDay}
        current = {day}
      /> 
    })

    return (
      <div className="datepicker">
        <input type="text" value={ value }  onChange={this.props.onChange}/>

        <div className="calender">
          <div className="control">
            <button className="prev" onClick={ this.prev } >prev</button>
            <div className="current">{ `${monthNames[monthIndx]} ${year}`}</div>
            <button className="next" onClick={ this.next }>next</button>
          </div>
          <div className="content">
            <div className="weekday">Sun</div>
            <div className="weekday">Mon</div>
            <div className="weekday">Tue</div>
            <div className="weekday">Wed</div>
            <div className="weekday">Thur</div>
            <div className="weekday">Fri</div>
            <div className="weekday">Sat</div>
            { calView }
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  state = {
    value: '06/02/2017'
  } 
  onChange=(e)=>{
    this.setState({ value: e.target.value });
  }
  render() {
    return (
      <div className="App">
        <DatePicker
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
