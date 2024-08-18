import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { authUserData } from '../../slice/authSlice';
import { Outlet } from 'react-router-dom';

export const AppHeader: FC = () => {
  const user = useSelector(authUserData);

  return <AppHeaderUI userName={user?.name} />;
};
