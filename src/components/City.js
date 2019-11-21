import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios'
import Day from './Day'
import Current from './Current'
import '../styles/city.css'

@inject('WeatherStore')
@observer
class City extends Component{
    constructor(){
        super()
        this.state={
            theCity: "",
            cityName: "",
            cityNamesList: [],
            cityCurrentCondition: "",
            cityForecast: ""
        }
      }

      handleCityChange = (e) => {
            this.setState({ theCity : e.target.value })
            this.autoComplete()
        };
        
        autoComplete = async () => {
            let cityName = this.state.theCity
            if (cityName.length >=2){
                let cityNames = await axios.get(`http://localhost:5000/city/${cityName}`)
                this.setState({cityNamesList: cityNames.data })
                // console.log(cityNames[0].key)
        }
        }

        findForecast = async () => {
            let cityKey = this.state.cityNamesList[0].key
            let theForecast = await axios.get(`http://localhost:5000/cityForecast/${cityKey}`)
            // console.log(theForecast)
            this.setState({cityForecast:theForecast})
            // console.log(this.state.cityForecast.data)
        }


        findCurrentCondition = async () => {
            let cityKey = this.state.cityNamesList[0].key
            let currentCondition = await axios.get(`http://localhost:5000/cityCurrent/${cityKey}`)
            console.log(cityKey) 
            this.setState({cityCurrentCondition:currentCondition}) 
            this.findForecast()
            this.props.WeatherStore.findCityCurrentCond(cityKey)
            let theCityFixed = this.state.theCity.slice(0,1).toUpperCase()
            let x = this.state.theCity.slice(1, this.state.theCity.length)
            let theName = theCityFixed+x
            this.setState({cityName :theName})
        }

        componentDidMount = async () => {
            let cityKey = "215854"
            this.setState({theCity : "Tel Aviv"})
            let theForecast = await axios.get(`http://localhost:5000/cityForecast/${cityKey}`)
            this.setState({cityForecast:theForecast})
            this.props.WeatherStore.findCityCurrentCond(cityKey)
            this.setState({cityName : this.state.theCity})
        }
       
        saveCityToFav = () => {
            let cityKey = this.state.cityNamesList[0].key
            this.props.WeatherStore.saveCityToFav(cityKey, this.state.theCity)
        }


        render(){
            let cities = this.state.cityNamesList
            let cityCurrentCondition = this.state.cityCurrentCondition 
            let cityForecast = this.state.cityForecast.data
            let coldIcon = "https://cdn3.iconfinder.com/data/icons/weather-16/256/Snowflake-512.png"
            let sunIcon = "https://cdn4.iconfinder.com/data/icons/sun-11/50/44-512.png"
            let weatherIcon = this.props.WeatherStore.tempCelcius >=22 ? sunIcon : coldIcon

          return(
              <div>
                  <div className="citySearchContainer">
                  <input name="cityName" list = "cityNames"
                  className="css-input"
                  value={this.state.theCity} 
                  onChange={this.handleCityChange}
                  placeholder="Search City"></input>
                <datalist id="cityNames">
                {cities.length >=1 ? cities.map(c=>  <option  className="cityNames" value={c.name}>{c.name}</option>): null} 
                </datalist>
                  <a onClick={this.findCurrentCondition} href="#" className="myButton">Search City</a>
                  <a  value={this.state.theCity} onClick={this.saveCityToFav} href="#" className="myButton">Save City</a>
                  </div>
                  <br></br>
                  <div id="city">
                      <span id="cityName">{this.state.cityName}</span>
                      <img className="weatherIcon" src={weatherIcon}></img>
                  </div>
                      <div>
                          <h2>
                      <Current temp={cityCurrentCondition.tempCelcius} text={cityCurrentCondition.WeatherText}/>
                          </h2>
                      </div>
                  <div className="forceastContainer">
                   {cityForecast ? cityForecast.map(d => d = <Day key={d.date} day={d} city={this.state.theCity}/>) : null}
                  </div>
                  
              </div>
          )
      }
}


export default City;