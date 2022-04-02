import React from "react";
import "../css/Votewindow.css";

import { useEffect } from "react";
import CanvasJSReact from "../components/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const VoteWindow = (props) => {
  const [selected_candidate, setselected_candidate] = React.useState("A");
  // const data = [
  //   {
  //     name: "A",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Congresspartylogo%E2%80%A6.png",
  //   },
  //   {
  //     name: "B",
  //     logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/AP_LOGO_2016.png/270px-AP_LOGO_2016.png",
  //   },
  //   {
  //     name: "C",
  //     logo: "https://e7.pngegg.com/pngimages/762/313/png-clipart-homeland-solidarity-party-sabah-logo-political-party-business-people-logo.png",
  //   },
  //   {
  //     name: "D",
  //     logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/People%27s_Action_Party_of_Singapore_logo.svg/1200px-People%27s_Action_Party_of_Singapore_logo.svg.png",
  //   },
  // ];
  let candidates = null;
  // candidates = data.map(candidate =><span className={"badge  text-dark candid "+(selected_candidate==candidate.name?" select":"bg-light")} onClick ={()=>setselected_candidate(candidate.name)}>{candidate.name}<img className="party-logo" src={candidate.logo}></img></span>)

  useEffect(async() => {
    const candidate_names = await props.Web3States.contractInst.methods.getCandidates().call();
    const candidate_urls = await props.Web3States.contractInst.methods.getUrls().call();
    alert(candidate_names);
    alert(candidate_urls);
    let count = 0;
    candidates = candidate_names.map((candidate) => (
      <span
        className={
          "badge  text-dark candid " +
          (selected_candidate == candidate ? " select" : "bg-light")
        }
        onClick={() => setselected_candidate(candidate)}
      >
        {candidate}
        <img className="party-logo" src={candidate_urls[count++]}></img>
      </span>
    ));
  },[]);

  const submitHandler = () => {};
  return (
    <>
      <form className="vote_container">
        <div className="vote_text">CANDIDATES</div>

        <div className="vote_input-box">{candidates}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-dark" id="eci_log_in" formAction>
            CONFIRM VOTE
          </button>
        </div>
      </form>
    </>
  );
};

export default VoteWindow;
