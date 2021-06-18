import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDataLayerValues } from '../../ContextApi/datalayer';
import { logout } from './../../api/api';

function Navbar() {
  const [{ isAuth }, dispatch] = useDataLayerValues();
  const LogoutHandler = async () => {
    try {
      const logout_ = await logout();
      const datauser = {
        org_id: '',
        username: '',
        org_name: '',
        location: '',
      };
      dispatch({
        type: 'SET_DETAILS',
        details: datauser,
      });
      dispatch({
        type: 'SET_AUTH',
        isAuth: false,
      });
      dispatch({
        type: 'SET_ACCEPTEDUSER',
        AcceptedUser: [],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Navbar">
      <div className="flexbox-item1">
        <h2 className="heading-title">Smaadhaan</h2>
      </div>
      <div className="flexbox-item2">
        <div className="sub-flexbox-item">
          <Link to="/">
            <h3 className="nav-links">Dashboard</h3>
          </Link>
          {isAuth ? (
            <h3 className="nav-links" onClick={LogoutHandler}>
              Logout
            </h3>
          ) : (
            <Link to="/helping-hands">
              <h3 className="nav-links">Helping Hands</h3>
            </Link>
          )}
          {isAuth ? (
            <Link to="/profile">
              <h3 className="nav-links">Profile</h3>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
