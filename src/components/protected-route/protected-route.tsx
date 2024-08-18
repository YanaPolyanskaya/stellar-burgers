import { FC } from 'react';
import { useSelector } from '../../services/store';
import { authUserChecked, authUserData } from '../../slice/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { ReactNode } from 'react';

type TProtectedRoute = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyUnAuth,
  children
}) => {
  const isAuthChecked = useSelector(authUserChecked);
  const user = useSelector(authUserData);
  const location = useLocation();
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
