import './App.css'
import Weather from './components/Weather'
import weatherVideo from  './assets/weather.mp4'



function App() {

  return (
    <div className="App">
      <Weather />
      <video src={weatherVideo} autoPlay loop muted />
    </div>
  )
}

export default App
