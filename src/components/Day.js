import React from 'react';
import '../styles/Day.css'
import moment from 'moment'

const Day = (props) => {
    let city = props.city
    let date = moment(props.day.date)
    let x = date._d.toString().split(" ")
    let formatDate = x.splice(0,4).join(" ")
    let minTemperature = props.day.minTemperature
    let maxTemperature = props.day.maxTemperature
    let unit = props.day.unit = "c" ? "Celsius" : "Fahrenheit"
    let WeatherText = props.day.dayWeather
    let icon = props.day.dayIcon

return(
   <div className="day">
    <div id="date">{formatDate}</div>
    <div id="temp">{minTemperature} -{maxTemperature} degrees</div>
    <div id="unit">{unit}</div>
    <div id="weatherText">{WeatherText}</div>
   </div>
)
}

export default Day