import React, { useState } from 'react';
import styles from './login.module.css';
import { login } from './../../api/api';
import { useHistory } from 'react-router-dom';
import { useDataLayerValues } from '../../ContextApi/datalayer';

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(false);

  const [{ isAuth }, dispatch] = useDataLayerValues();

  let history = useHistory();

  const loginButtonHandler = async () => {
    if (username.trim() === '' || password.trim() === '') {
      seterror(true);
      return;
    } else {
      seterror(false);
      await loginuser();
    }
  };

  const loginuser = async () => {
    const data = {
      username: username,
      password: password,
    };
    try {
      const newuser = await login(data);
      console.log(newuser);
      dispatch({
        type: 'SET_AUTH',
        isAuth: true,
      });
      history.push('./profile');
    } catch (err) {
      console.log(err);
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
          Please input valid username & password
        </p>
      ) : null}
      <h2 className={styles.heading}>Login</h2>
      <input
        value={username}
        type="text"
        className={styles.input}
        placeholder="Username"
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        value={password}
        type="password"
        className={styles.input}
        placeholder="Password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={loginButtonHandler} className="btn">
        Login
      </button>
    </div>
  );
}

export default Login;
