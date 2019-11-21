import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../styles/favorite.css'


@inject('WeatherStore')
@observer
class Favorite extends Component{

removeCity = () => {
    let name = this.props.name
    console.log(name)
    this.props.WeatherStore.removeCityFromFav(name)
}

showCity = () => {
    this.props.showCity()
    let key = this.props.city.key
    console.log(key)
    this.props.WeatherStore.findCityCurrentCond(key)
}

render(){
    let name = this.props.name
    let key = this.props.key
    let temp = this.props.temp
    let unit = this.props.unit
    let unitSymbole = unit == "Celsius"? "C": "F"
    let tempImperial = this.props.city.tempImperial
    let currentText = this.props.city.currentText
    let theCityFixed = name.slice(0,1).toUpperCase()
            let x = name.slice(1, name.length)
            let theName = theCityFixed+x

    return(
        <div className="favorite">
       <div id={this.props.name} className="favoriteName">
           <div>Hi from {theName}, it's {temp}  &#176; {unitSymbole} and {currentText} </div>
       </div>
       <div className="favoriteButtons">
           <a onClick={this.removeCity} href="#" className="myButton2">Remove from Favorites</a>
           <a onClick={this.showCity} href="#" className="myButton2">See Forecast</a>
       </div>
        </div>
    )
}
}

export default Favorite