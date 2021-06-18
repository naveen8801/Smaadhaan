import React from 'react';
import './InfoCrad.css';

function InfoCard(props) {
  return (
    <div className="card_">
      <h3 className="title__">{props.title}</h3>
      <h5 className="value__">{props.value}</h5>
    </div>
  );
}

export default InfoCard;
