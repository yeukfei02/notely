import { Navigate } from 'react-router-dom';

function PrivateRoute(props: any) {
  const token = localStorage.getItem('token');
  const users_id = localStorage.getItem('users_id');
  if (!token && !users_id) {
    return <Navigate to="/" />;
  }

  return props.children;
}

export default PrivateRoute;
