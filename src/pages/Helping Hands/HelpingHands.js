import React from 'react';
import './HelpingHands.css';
import Login from './../../components/LoginForm/Login';
import Register from './../../components/SignInForm/Register';

function HelpingHands() {
  return (
    <div className="helping-hands">
      <Login />
      <Register />
    </div>
  );
}

export default HelpingHands;
