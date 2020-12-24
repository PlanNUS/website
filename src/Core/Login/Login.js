import React, {useState} from 'react';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CorePage from '../CorePage/CorePage';
import '../../Style/Login/Login.css';

export default function Login() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [error, updateError] = useState('');
  const [username, updateUserName] = useState('');
  const [password, updatePassword] = useState('');

  function login() {
    if (username === 'alpha@test1234' && password === 'alpha@test1234') {
      Cookies.set('isAlphaLoggedIn', 'true');
      updateIsLoggedIn(true);
    } else if (username !== 'alpha@test1234') {
      updateError('Wrong username!');
    } else if (password !== 'alpha@test1234') {
      updateError('Wrong password!');
    }
  }

  if (!isLoggedIn) {
    const isLoggedInLocal = Cookies.get('isAlphaLoggedIn');
    if (isLoggedInLocal !== undefined) {
      updateIsLoggedIn(isLoggedInLocal === 'true');
    }
  }

  if (isLoggedIn) {
    return <CorePage />;
  } else {
    return (
      <div id="wholePageCenter">
        <p className="lightWords" id="title">
          Welcome to PlanNUS!
        </p>
        <p className="lightWords" id="subtitle">
          Version 0.0.1a (Alpha)
        </p>
        <br />
        <p className="lightWords">Tester Login</p>
        <div id="splitter" />
        <TextField
          id="outlined"
          label="User"
          variant="outlined"
          onChange={(event) => updateUserName(event.target.value)}
        />
        <div id="splitter" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(event) => updatePassword(event.target.value)}
        />
        <div id="splitter" />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={login}>
          Log In
        </Button>
        <div id="splitter" />
        <p className="lightWords" id="error">
          {error}
        </p>
      </div>
    );
  }
}
