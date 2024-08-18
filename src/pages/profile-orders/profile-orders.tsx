import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loadUserOrders, getUserOrders } from '../../slice/ordersSlice';
import { authUserData } from '../../slice/authSlice';
import { isLoading as isLoadingOrders } from '../../slice/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const isLoading = useSelector(isLoadingOrders);
  const dispatch = useDispatch();
  const orders: TOrder[] = [];
  const user = useSelector(authUserData);

  useEffect(() => {
    if (user) dispatch(loadUserOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
