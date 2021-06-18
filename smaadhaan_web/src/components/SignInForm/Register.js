import React, { useState } from 'react';
import styles from './register.module.css';
import { signin } from './../../api/api';
import { useHistory } from 'react-router-dom';
import { useDataLayerValues } from '../../ContextApi/datalayer';

function Register() {
  const [org_name, setorganme] = useState('');
  const [username, setusername] = useState('');
  const [location, setlocation] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(false);

  const [{ isAuth }, dispatch] = useDataLayerValues();

  let history = useHistory();

  const RegisterButtonHandler = async () => {
    if (
      username.trim() === '' ||
      password.trim() === '' ||
      location.trim() === '' ||
      org_name.trim() === ''
    ) {
      seterror(true);
      return;
    } else {
      seterror(false);
      await createuser();
    }
  };

  const createuser = async () => {
    const data = {
      org_name: org_name,
      username: username,
      location: location,
      password: password,
    };
    console.log(data);
    try {
      const newuserid = await signin(data);
      console.log(newuserid.status);
      seterror(false);
      dispatch({
        type: 'SET_AUTH',
        isAuth: true,
      });
      history.push('./profile');
    } catch (err) {
      console.log(err.message);
      seterror(true);
    }
  };

  return (
    <div className={styles.container}>
      {error ? (
        <p
          style={{
            backgroundColor: 'red',
            color: 'white',
            textAlign: 'center',
            width: '100%',
          }}
        >
          Please input valid details
        </p>
      ) : null}
      <h2 className={styles.heading}>Register</h2>
      <input
        value={org_name}
        type="text"
        className={styles.input}
        placeholder="Org Name"
        onChange={(e) => setorganme(e.target.value)}
      />
      <input
        value={username}
        type="text"
        className={styles.input}
        placeholder="Username"
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        value={location}
        placeholder="location"
        type="text"
        className={styles.input}
        placeholder="location"
        onChange={(e) => setlocation(e.target.value)}
      />
      <input
        value={password}
        type="password"
        className={styles.input}
        placeholder="Password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={RegisterButtonHandler} className={styles.btn}>
        Register
      </button>
    </div>
  );
}

export default Register;
