import './App.css';
import { ChartOptions } from './utils/ChartConfig';
import { useState, useEffect, useRef } from 'react';
import 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(zoomPlugin, ArcElement, Tooltip, Legend);

function App() {

  const chartRef = useRef();
  const [data, setData] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  //data fetching from json file on load
  useEffect(()=>{
    fetch("./Shares.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setIsError(false)
        setData(data)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        setIsError(true)
      });

    return () => {
    }

  },[])

  // chart js data
  const labels = []
  const chartData = { 
    labels,
    datasets: [
      {
        label: 'Common',
        data: data[0]?.shares?.['Common'],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Series A Preferred',
        data: data[0]?.shares?.['Series A Preferred'],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Series A1 Preferred',
        data: data[0]?.shares?.['Series A1 Preferred'],
        borderColor: 'rgb(200, 45, 135)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  //dynamic rendering of content according to data fetching state
  let content = ''

  if (isLoading){
    content = (
      <div className='loading'>
      <span class="loader"></span>
      </div>
    )
  }
  if (data.length!==0){
    content = (
      <div className='success'>
        <Line
          ref={chartRef}
          options={ChartOptions}
          data={chartData}
          />
        <button className='resetBtn' onClick={handleResetZoom}>Reset Zoom</button>
      </div>
    )
  }
  if (isError){
    content = (
      <div className='error'>
        something went wrong!
      </div>
    )
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
