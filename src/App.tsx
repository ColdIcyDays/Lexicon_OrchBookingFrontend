import './App.css'
import {useEffect, useState} from "react";
import {TestLogin} from "./TestComps/TestLogin.tsx";

type WeatherForecast = {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

type TestModel = {
    id : number
    someText : string
}
function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([])
    const [data, setData] = useState<TestModel | undefined>();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

    console.log("App start!");
  useEffect(() => {
    fetch('/WeatherForecast')
        .then(async response => {
          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`)
          }
          //const data = (await response.json()) as WeatherForecast[]
          const indata = (await response.json());
            console.log("Indate is: " + indata);
            console.log(indata);
            console.log(typeof indata);
            console.log(indata.id);
            console.log(indata.someText);

            setData(indata);
            //setData(response.text.toString());
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Loading weather data...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (data == undefined){
      return <p>Undefined</p>
  }

  return (
    <>
      <div>
        <p>Hello, login here:</p>
        <TestLogin/>
      </div>
      <div>
        <p>
            {data.id}
            {data.someText}
        </p>
      </div>
    </>
  )
}

export default App
