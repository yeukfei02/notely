import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo from '../../../images/logo.png';

const SIGNUP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      created_at
      email
      id
      password
      updated_at
    }
  }
`;

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      users {
        created_at
        email
        id
        password
        updated_at
      }
      users_id
    }
  }
`;

function SignupAndLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, signupResult] = useMutation(SIGNUP);
  const [login, loginResult] = useMutation(LOGIN);

  console.log('signupResult.data = ', signupResult.data);
  console.log('signupResult.loading = ', signupResult.loading);
  console.log('signupResult.error = ', signupResult.error);

  console.log('loginResult.data = ', loginResult.data);
  console.log('loginResult.loading = ', loginResult.loading);
  console.log('loginResult.error = ', loginResult.error);

  useEffect(() => {
    if (loginResult.data) {
      localStorage.setItem('token', loginResult.data.login.token);
      navigate('/notes');
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

  const handleSignupClick = () => {
    if (email && password) {
      signup({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    }
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

  return (
    <div className="container w-50 my-5">
      <div className="d-flex justify-content-center">
        <img src={logo} alt="" width="55%" height="55%" />
      </div>

      <div>
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
        <Button
          className="w-100 my-2"
          variant="outlined"
          color="error"
          onClick={() => handleSignupClick()}
        >
          Signup
        </Button>
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
  );
}

export default SignupAndLogin;
