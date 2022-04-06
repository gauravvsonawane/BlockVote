import React from "react";
import "../css/Results.css";

import { useEffect, useState } from "react";
import CanvasJSReact from "../components/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Results = (props) => {

const [scoreCard, setscoreCard] = useState(null);
const [options, setoptions] = useState({});

const [options2, setoptions2] = useState({});


var datapoints = {};

  const setDatapoints = (_datapoints) => {
      
    datapoints = _datapoints;

    setoptions2({
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        text: "Overall distribution of votes",
      },
      data: [
        {
          type: "pie",
          indexLabel: "{label}: {y}%",
          startAngle: -90,
          dataPoints: _datapoints,
        },
      ],
    }) 

    setoptions({
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", //"light1", "dark1", "dark2"
        title: {
          text: "Bar Graph ",
        },
        axisY: {
          includeZero: true,
        },
        axisX: {
          labelFontColor: "#00000000",
        },
        data: [
          {
            type: "column", //change type to bar, line, area, pie, etc
            indexLabelFontColor: "#fff",//"#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: _datapoints,
          },
        ],
      }) ;

      
  };


  const prepareData = (xd, yd, indexLabeld, logod) => {
    let datapoints = [];

    for (var count = 0; count < xd.length; count++) {
      datapoints.push({
        x: xd[count],
        y: yd[count],
        indexLabel: indexLabeld[count],
        logo: logod[count],
      });
    }
    return datapoints;
  };
  

  useEffect(async () => {
   const results = await props.Web3States.contractInst.methods.getResults().call();
   
  //  const results = [[71,55,50,65],["A","B","C","D"],["https://upload.wikimedia.org/wikipedia/en/thumb/2/28/People%27s_Action_Party_of_Singapore_logo.svg/1200px-People%27s_Action_Party_of_Singapore_logo.svg.png",
  //       "https://upload.wikimedia.org/wikipedia/commons/e/e6/Congresspartylogo%E2%80%A6.png","https://upload.wikimedia.org/wikipedia/en/thumb/0/04/AP_LOGO_2016.png/270px-AP_LOGO_2016.png",
  //       "https://e7.pngegg.com/pngimages/762/313/png-clipart-homeland-solidarity-party-sabah-logo-political-party-business-people-logo.png"
  //    ]]
    let hold = 10;
    let arr = [];
    for (let w = 0; w < results[0].length; w++) {
      arr.push(hold);
      hold += 10;
    }
    let yhold = [];
    for(let i=0; i<results[1].length;i++) {
      yhold.push(parseInt(results[1][i]));
    }
    let data = prepareData(arr, yhold, results[0], results[2]);
    
    setDatapoints(data);
    setscoreCard( data.map((dataPoint) => (
      <span className="first-n">
        <div>
          {" "}
          <img className="party-logo" src={dataPoint.logo}></img>
          {dataPoint.indexLabel} : {dataPoint.y}
        </div>{" "}
      </span>
    )));
    
  },[]);

  return (
    <>
    
      <div className="winner-container"></div>
      <div className="container container-marg">
         
        {options.length != 0?<CanvasJSChart
          options={options}
        />:""}
        <div style={{ width: "200px", height: "200px" }}></div>
        {options2.length!=0?<CanvasJSChart
          options={options2}
        />:""}
      </div>
      <div className="container2">{scoreCard}</div>
    </>
  );
};

export default Results;