import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { LineCharts } from './charts/line'
import { VictoryBar } from 'victory'
import { LineChart2 } from './charts/victory'
import { ApiFetch } from './hooks/api'
import MultilineChart from './charts/multid3'
import { data as myData } from '../src/charts/constants.js'
import MainChart from './charts/maincharts'

const dims = {
  width: 600,
  height: 300,
  margin: { top: 30, right: 30, bottom: 30, left: 60 }
};
function App() {
  const [count, setCount] = useState(0)
  const { loading, data, error } = ApiFetch('https://api.github.com/users/defunkt', {});

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {`${JSON.stringify(Object.keys(data)[19])}`}
      
      <LineCharts />
      <LineChart2 />
      <MainChart />
      </>
  )
}

export default App
