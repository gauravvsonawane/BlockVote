import React from 'react';
import '../css/Votewindow.css';

import { useEffect } from 'react';
import CanvasJSReact from '../components/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const VoteWindow = () => {

    const [selected_candidate , setselected_candidate] = React.useState("A");
    const data = [{name : "A"},{name : "B"},{name : "C"},{name : "D"}]
    let candidates = null;
    candidates = data.map(candidate =><span className={"badge  text-dark candid "+(selected_candidate==candidate.name?" bg-warning":"bg-light")} onClick ={()=>setselected_candidate(candidate.name)}>{candidate.name}</span>)

    useEffect(() => {
      //  candidates = data.map(candidate =><span className={"badge  text-dark candid "+(selected_candidate==candidate.name?" bg-success":"bg-light")} onClick ={()=>setselected_candidate(candidate.name)}>{candidate.name}</span>)
      });

    const submitHandler = () =>{

    }
    return (
       <>
      <form className='vote_container'>

<div className='vote_text'>CANDIDATES</div>

<div className='vote_input-box'>

{candidates}
</div>
<div style = {{display : "flex",justifyContent : "center"}}>
     <button className='btn btn-dark'  id='eci_log_in' formAction >CONFIRM VOTE</button>
</div>
</form>
            
       </>
    );
}

export default VoteWindow;