import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Favorite from './Favorite';
import '../styles/favorites.css'

@inject('WeatherStore')
@observer
class Favorites extends Component{
    constructor(){
        super()
        this.state={
            showMetric : true
        }
      }

      toggleUnit = () => {
          this.setState({showMetric: !this.state.showMetric})
      }
      
      render(){        
        let theCities = this.props.WeatherStore.cityCondArr
        let showMetric = this.state.showMetric
        //   console.log(theCities)

        let MappedFavorites =  theCities.length >= 1 ? theCities.map(c => <Favorite key={c.key} city={c} unit={showMetric? "Celsius": "Fahrenheit"}temp={showMetric? c.tempCelcius: c.tempImperial}showCity={this.props.ShowCity} name={c.cityName} />):
        <div>You have no favorites yet</div>

        return(
            <div className="favoritesContainer">
                    <a onClick={this.toggleUnit} href="#" className="myButton2">toggle unit</a>
                  {MappedFavorites}
              </div>
          )
      }
}

export default Favorites;