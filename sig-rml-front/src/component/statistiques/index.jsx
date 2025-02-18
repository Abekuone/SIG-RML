import React from 'react';
import PieChart from './pichart'; 
import PieChart2 from './pichart2'; 
import PieChart3 from './pichart3'; 
import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LineChart from './linechart';

const Statistic = () => {
    return (
      <>
        <div className='row col-lg-12 col-md-12 col-sm-12 mt-5'>
          <div className="row mx-auto col-md-12 col-lg-8 col-sm-12">
            <Admin />
          </div>
            <div className="row mx-auto d-flex mx-auto col-md-12 col-lg-12 col-sm-12 mt-3">
              
             <div className="col-md-12 col-sm-12 col-lg-4">
              <PieChart />
             </div>
             <div className="col-md-12 col-sm-12 col-lg-4">
              <PieChart2 />
             </div>
             <div className="col-md-12 col-sm-12 col-lg-4">
              <PieChart3 />
             </div>
              
            </div>
            <div className="row col-md-12 col-sm-12 col-lg-12 mx-auto">
              <LineChart />
            </div>
        </div>
      </>
    );
};


export default Statistic;