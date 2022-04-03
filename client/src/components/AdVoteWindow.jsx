import React from "react";
import "../css/Votewindow.css";
import { useState } from 'react';
import { useEffect } from "react";
import CanvasJSReact from "../components/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const AdVoteWindow = (props) => {
  const [selected_candidate, setselected_candidate] = useState("");
  const [candidates, setCandidates] = useState(null);
  let choice = 0;
  const setChoice = (indx) => {
    choice = indx;
  }
  var candidate_names;
  var candidate_urls;
  useEffect(async() => {
    candidate_names = await props.Web3States.contractInst.methods.getCandidates().call();
    candidate_urls = await props.Web3States.contractInst.methods.getUrls().call();
    let c = null;
    let count = 0;
    c = candidate_names.map((candidate) => (
      <span
        className={
          "badge  text-dark candid rad " +
          (selected_candidate == candidate ? " select" : "bg-light")
        } 
        onClick={() => {
          console.log(candidate);
          setselected_candidate(candidate);
        }}
      >
        
        <span className="txt">{candidate}</span>
        {console.log(candidate_urls[count])}
        <img className="party-logo" src={candidate_urls[count++]}></img>
        
        
      </span>
    ));
    setCandidates(c);
  },[selected_candidate]);

  const submitHandler = async () => {
    let candidates_array = await props.Web3States.contractInst.methods.getCandidates().call();
    let choice = (candidates_array.indexOf(selected_candidate));
    try{
      console.log(await props.Web3States.contractInst.methods.voteThroughAdmin(props.voterid, choice)
      .send({ from: props.Web3States.accounts[0] }));
    // alert(props.voterid);
    }
    catch(error){
        alert(error.message);
        return false;
    }
    const state = await props.Web3States.contractInst.methods.getVoteThroughAdminState().call();
    console.log("state", state);
    if(state==1) {
      alert("Vote Casted Successfully");
    }
    else if(state==2) {
      alert("Voter has already voted!");
    }
  };
  return (
    <>
      <div className="vote_container">
        <div className="vote_text">THrough Admin CANDIDATES</div>

        <div className="vote_input-box">{candidates}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-dark" id="eci_log_in" onClick={submitHandler}>
            CONFIRM VOTE
          </button>
        </div>
      </div>
    </>
  );
};

export default AdVoteWindow;
