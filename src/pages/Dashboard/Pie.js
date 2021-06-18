import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import './chart.css';
const Piechart = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get(
        'https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api/all-data'
      )
      .then((res) => {
        console.log(res.data.dateRequest);
        for (const dataObj in res.data.problemDetails) {
          empSal.push(res.data.problemDetails[dataObj]);
          empAge.push(dataObj);
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: 'Requests per category',
              data: empSal,
              backgroundColor: ['#2541B2', '#FF449F', '#0A1931', '#480032'],
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
    <div className="main_div_pie_chart">
      <h2 className="chart-heading">Requests per Problem</h2>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Piechart;
