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
import { BChart } from './charts/balancewrapper'
import { BarWrapper } from './charts/barwrapper'

function App() {
  const [count, setCount] = useState(0)
  const { loading, data, error } = ApiFetch('https://api.github.com/users/defunkt', {});

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="chart">
        <BChart />
        <BarWrapper />
      </div>
    </>
  )
}

export default App
