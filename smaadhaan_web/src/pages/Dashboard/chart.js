import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Chart = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);

  const chart = () => {
    let empSal = [];
    var empAge = [];
    axios
      .get(
        'https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api/all-data'
      )
      .then((res) => {
        for (const dataObj in res.data.dateRequest) {
          empSal.push(parseInt(res.data.dateRequest[dataObj]));
          empAge.push(dataObj);
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: 'Requests Per Day',
              data: empSal,
              backgroundColor: ['#BF1363'],
              borderColor: ['#BF1363'],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="main_div_line_chart">
      <h1 className="chart-heading">Requests Per Date</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,

            title: { text: 'Request vs Date', display: false },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  labelString: 'Date',
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  labelString: 'Request',
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
