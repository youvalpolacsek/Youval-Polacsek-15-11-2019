import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@inject('WeatherStore')
@observer
class Current extends Component {

render(){
    let currentText = this.props.WeatherStore.currentText
    let tempCelcius = this.props.WeatherStore.tempCelcius
    let tempImperial = this.props.WeatherStore.tempImperial
    // let currentCondition = this.props.WeatherStore.currentCondition
    // let currentText = currentCondition.map(c => c.Link)
    // console.log(currentText)
    return(
        <div>it's {tempCelcius} <span>&#176;</span> outside and {currentText}</div>
    )
}

}


export default Current