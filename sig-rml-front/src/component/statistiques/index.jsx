import React from 'react';
import PieChart from './pichart'; 
import PieChart2 from './pichart2'; 
import PieChart3 from './pichart3'; 
import Admin from '../admin'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LineChart from './linechart';
import './index.css';
//import Nav from '../nav';

const Statistic = () => {
    return (
      <>
      <Admin />
     
        <div className='row col-lg-12 col-md-12 col-sm-12 mt-2 div-position'>
          {/*<div className="row mx-auto col-md-12 col-lg-8 col-sm-12">
            <Admin />
          </div>*/}
          <div className="row col-lg-8 col-md-12 col-sm-12 d-flex mx-auto mt-2 mb-2">
            <div className="col-lg-4 col-md-12 col-sm-12 p-2">
                <input 
                      type="date" 
                      className="form-control" 
                      placeholder="Date debut..." 
                      value="Date Debut"
                      
                  />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 p-2">
                      <input 
                      type="date" 
                      className="form-control" 
                      placeholder="Date fin..." 
                      value="Date Fin"
                      
                  />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 p-2">
                      <button className='btn btn-info col-lg-12 col-md-12 col-sm-12'>Filtrer</button>
                      
                  
              </div>
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