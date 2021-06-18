import React, { useState, useEffect } from 'react';
// react plugin used to create charts
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import { Spinner } from 'reactstrap';
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from './chart';
import './Dashboard.css';
import Chart from './chart';
import Piechart from './Pie';
// import Map from './Map';
import InfoCard from '../Profile/InfoCard/InfoCard';
import Map from './../../components/Map/Map';

function Dashboard() {
  const [data, setdata] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api/all-data'
      )
      .then((res) => {
        setloading(true);
        setdata(res.data);
        console.log(data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(loading);
  return (
    <>
      <div className="content">
        <div className="flexbox-details">
          <div className="card_detais">
            <h3 className="title_">User Requested</h3>
            <h5 className="value_">{data.user_count}</h5>
          </div>
          <div className="card_detais">
            <h3 className="title_">Org Registered</h3>
            <h3 className="value_">{data.org_count}</h3>
          </div>
        </div>
        <div className="charts">
          <Chart />
          <Piechart />
        </div>
        <div className="mapidd">
          <Map />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
