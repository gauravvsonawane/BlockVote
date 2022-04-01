import React from 'react';
import { useState } from 'react';
import '../css/VoterReg.css';

const VoterReg = (props) => {

    const[name, setName] = useState("");
    const[mob, setMob] = useState("");
    const[address, setAddress] = useState("");
    const[aadhar, setAadhar] = useState("");
    const[voter, setVoter] = useState("");
    const[party, setParty] = useState("");
    const[ticket, setTicket] = useState("");
    const[symbol, setSymbol] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    const handleChangeMob = (event) => {
        setMob(event.target.value);
    }
    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    }
    const handleChangeAadhar = (event) => {
        setAadhar(event.target.value);
    }
    const handleChangeVoter = (event) => {
        setVoter(event.target.value);
    }
    const handleChangeParty = (event) => {
        setParty(event.target.value);
    }

    const onSubmitVoter = async (e) => {
        e.preventDefault();
        try{
            await props.Web3States.contractInst.methods.addVoter(name, mob, address, aadhar, voter, props.Web3States.accounts[0])
            .send({ from: props.Web3States.accounts[0] });
        }
        catch(error){
            alert(error.message);
            return false;
        }
        const state = await props.Web3States.contractInst.methods.getAddVoterState().call();
            if(state == 2){
                alert("Voter already exists!");
                return false;
            }
            else if(state==1) {
                alert("Voter added succesfully!");
            }
    }

    const onSubmitCandidate = async (e) => {
        e.preventDefault();
        try{
            await props.Web3States.contractInst.methods.addCandidate(name, mob, address, aadhar, voter, props.Web3States.accounts[0], party, symbol)
            .send({ from: props.Web3States.accounts[0] });
        }
        catch(error){
            alert(error.message);
            return false;
        }
        const state = await props.Web3States.contractInst.methods.getAddVoterState().call();
        if(state == 2){
            alert("Candidate already exists!");
            return false;
        }
        else if(state==1) {
            alert("Candidate added succesfully!");
        }
        
    }

    const onVotePoll = async(e) => {
        e.preventDefault();
        const authenticated = await props.Web3States.contractInst.methods.authenticateVoter(props.Web3States.accounts[0]).call();
        if(authenticated) {
            props.callback_vote_win();
        }
        else {
            alert(props.Web3States.accounts[0]);
            props.callback_voter_log();
        }
    }

    const handleChangeTicket = (event) => {
        setTicket(event.target.value);
    }

    const handleChangeSymbol = (event) => {
        setSymbol(event.target.value);
    }

    return (
        <div>
            
            <div className="entire">
                <div className="voter-reg-box">
                    <div className="voter-reg-title-box">
                        <h2 className="voter-reg-title">Voter Registration</h2>
                    </div>

                    <div className="voter-form">
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="vr-name" placeholder="Name" value={name} onChange={handleChangeName}/>
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control" id="vr-mobilenum" placeholder="Enter Mobile Number" value={mob} onChange={handleChangeMob}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="vr-address" placeholder="Enter Address" value={address} onChange={handleChangeAddress}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="vr-aadhar" placeholder="Enter Aadhar Number" value={aadhar} onChange={handleChangeAadhar}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="vr-voterid" placeholder="Enter Voter Id Number" value={voter} onChange={handleChangeVoter}/>
                            </div>


                            <div className="btn-mid">
                                <button type="submit" className="btn btn-dark mx-2 mt-3" onClick={onSubmitVoter}>Register as Voter</button>
                            </div>
                        </form> 
                    </div>
                </div>

                <div className="candidate-reg-box">
                    <div className="candidate-reg-title-box">
                        <h2 className="candidate-reg-title">Candidate Registration</h2>
                    </div>
                    <div className="candidate-form">
                        <form>
                            <div className="mb-4">
                                <input type="text" className="form-control" id="vr-party" placeholder="Political Party" value={party} onChange={handleChangeParty}/>
                            </div>

                            <div className="mb-4">
                                <input type="text" className="form-control" id="vr-symbol" placeholder="URL of Symbol" value={symbol} onChange={handleChangeSymbol}/>
                            </div>

                            <div className="mb-4">
                                <input type="text" className="form-control" id="vr-ticket" placeholder="URL of Ticket" value={ticket} onChange={handleChangeTicket}/>
                            </div>

                            <div className="btn-mid">
                                <button type="submit" className="btn btn-dark mx-2 mt-3" onClick={onSubmitCandidate}>Register as Voter and Candidate</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="btn-mid">
                <button className="btn btn-dark mx-2 mt-3 mb-5" onClick={onVotePoll}>Already Registered? Go To Voting Poll</button>
            </div>            
                 
               
        </div>
    );
}

const ImageThumb = ({ image }) => {
    console.log(URL.createObjectURL(image));
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
};


export default VoterReg;