import React, { Component } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';
import Favorites from './components/favorites';
import City from './components/City';


@inject('WeatherStore')
@observer
class App extends Component{
  constructor(){
    super()
    this.state={
      showFav: false,
      darkMode: false
    }
  }
  
  ShowFav = () => this.setState({ showFav: true });

  ShowCity = () => this.setState({ showFav: false });

  toggleDarkMode = () => this.setState({darkMode: !this.state.darkMode})
  

  render(){
    const openWindow = this.state.showFav ? 
    <Favorites ShowCity={this.ShowCity}/> : 
    <City />;

    const style = {
      display: 'grid',
      textAlign: 'center',
      alignSelf: 'auto',
      color: 'white',
      backgroundColor: '#282c34',
      height: '100vh',
      gridTemplateColumns: '100%',
      gridTemplateRows: '5% 10% 5% 70%'
  }

    const viewMode = this.state.darkMode ? 
    <span onClick={this.toggleDarkMode}>Bright</span> :
    <span onClick={this.toggleDarkMode}>Dark</span>

    return(
        <div className="appContainer" style={this.state.darkMode ? style : null} >
            <div className="navbar">
              <span onClick={this.ShowCity}>Search </span>
              <span onClick={this.ShowFav} >My Cities</span>
              {viewMode}
            </div>
         <h1 className="header">Herolo Weather App</h1>
         <span></span>
          {openWindow}
        </div>
    )
  }
}

export default App;
