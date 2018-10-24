import React, { Component } from 'react'
import './App.css'
import itinerary from './itinerary.json'
import planeIcon from './assets/plane.png'
import trainIcon from './assets/train.png'
import busIcon from './assets/bus.png'
import us from './assets/us.png'
import ReactJson from 'react-json-view'

class App extends Component {
  constructor() {
    super()
    document.title = itinerary.title
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>{itinerary.title}</h1>
          <img alt="Us!" src={us} />          
        </header>

        {
          itinerary.ready ? 
          itinerary.places.map(this.toItem)
          :
          <ReactJson src={itinerary} theme="monokai" />
        }
      </div>
    );
  }

  toItem(item) {
    var icon
    switch(item.type) {
      case "train":
        icon = trainIcon
        break
      case "bus":
        icon = busIcon
        break
      default:
        icon = planeIcon
    }

    return (
      <div key={item.finish_time} className="header" style={{background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(' + item.header + ') no-repeat center center fixed', backgroundSize: 'cover'}}>
        {/* Activities */}
        <div className="box activities">
          {
            item.activities ?
            <span>
              <h3 style={{color: "orange"}}>Activities</h3>
              <h4>{item.activities.join(', ')}</h4>
            </span>
            :
            null
          }
        </div>

        {/* Place */}
        <div>
          <div className="box">
            <span>
              {
                item.finish ?
                <h2>{item.start.toUpperCase()} <img alt="Mode of transport" className="typeIcon" src={icon} /> {item.finish.toUpperCase()}</h2>
                :
                <h2>{item.start.toUpperCase()}</h2>            
              }
            
              {
                item.type==="airbnb" ?
                <h4><span className="smaller">Check in:</span> {item.start_time}<br/><span className="smaller">Check out:</span> {item.finish_time}</h4>
                :
                <h4>{item.start_time} <span className="smaller">to</span> {item.finish_time}</h4>            
              }
              <h4>{item.address}</h4>  

              {
                item.host ?
                <h4>{item.host} <span className="smaller">/</span> {item.host_phone}</h4>
                :
                null
              }
            </span>
          </div>  
        </div>

        {/* Food & Drink */}
        <div className="box fooddrink">
          {
            item.fooddrink ?
            <span>
              <h3 style={{color: "orange"}}>Food and Drink</h3>
              <h4>{item.fooddrink.join(', ')}</h4>
            </span>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default App;
