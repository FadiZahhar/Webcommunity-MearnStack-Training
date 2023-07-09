
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;