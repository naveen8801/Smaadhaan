import React, { useState } from 'react';
import './UserCard.css';
import call_logo from './../../../assets/call.svg';
import { sendsms, acceptrequest } from './../../../api/api';

function UserCard(props) {
  const [accepted, setaccepted] = useState(props.accepted);
  const AcceptHandler = async () => {
    const data = {
      phone_number: props.contact_no,
    };
    const acceptdata = {
      userid: props.id,
    };
    try {
      const smssend = await sendsms(data);
      const accept = await acceptrequest(acceptdata);
      console.log(smssend);
      console.log(accept);
      setaccepted(!accepted);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="usercard">
      <h3 className="title_">{props.name}</h3>
      <h5 className="value">
        <strong>{props.problem}</strong>
      </h5>
      <div>
        <h5 className="value">
          <span>
            <img src={call_logo} className="call-logo" />
          </span>
          {props.contact_no}
        </h5>
      </div>
      {!accepted ? (
        <button  onClick={AcceptHandler} className="btn">
          Accept
        </button>
      ) : null}
    </div>
  );
}

export default UserCard;
