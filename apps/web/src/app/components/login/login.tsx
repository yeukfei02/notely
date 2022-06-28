import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import logo from '../../../images/logo.png';
import { LOGIN } from '../../../helpers/gqlHelper';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, loginResult] = useMutation(LOGIN);

  const [openLoginSuccess, setOpenLoginSuccess] = useState(false);

  console.log('loginResult.data = ', loginResult.data);
  console.log('loginResult.loading = ', loginResult.loading);
  console.log('loginResult.error = ', loginResult.error);

  useEffect(() => {
    if (loginResult.data) {
      localStorage.setItem('token', loginResult.data.login.token);
      localStorage.setItem('users_id', loginResult.data.login.users_id);
      setOpenLoginSuccess(true);
      setTimeout(() => {
        navigate('/notes');
      }, 1000);
    }
  }, [loginResult.data, navigate]);

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    if (email && password) {
      login({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    }
  };

  const handleJoinAsAGuestClick = () => {
    login({
      variables: {
        input: {
          email: 'admin@admin.com',
          password: 'admin',
        },
      },
    });
  };

  const handleLoginSuccessClose = () => {
    setOpenLoginSuccess(false);
  };

  return (
    <div className="container d-flex justify-content-center w-50 my-4">
      <div>
        <div className="d-flex justify-content-center">
          <img src={logo} alt="" width="55%" height="55%" />
        </div>

        <div className="my-1">
          <div>
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => handleEmailInputChange(e)}
            />
          </div>
          <div className="my-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => handlePasswordInputChange(e)}
            />
          </div>
          <Button
            className="w-100 my-2"
            variant="contained"
            color="primary"
            onClick={() => handleLoginClick()}
          >
            Login
          </Button>
          <div className="my-3">
            Don't have an account? <a href="/signup">Signup</a>
          </div>
        </div>

        <hr />

        <div>
          <Button
            className="w-100 my-2"
            variant="contained"
            color="info"
            onClick={() => handleJoinAsAGuestClick()}
          >
            Join as a Guest
          </Button>
        </div>
      </div>

      <Snackbar
        open={openLoginSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => handleLoginSuccessClose()}
      >
        <Alert
          onClose={() => handleLoginSuccessClose()}
          severity="success"
          sx={{ width: '100%' }}
        >
          Login success
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
