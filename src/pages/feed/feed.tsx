import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loadFeed, getFeedOrders } from '../../slice/feedSlice';
import { Outlet } from 'react-router-dom';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrders);

  useEffect(() => {
    dispatch(loadFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(loadFeed())} />;
};
//   const dispatch = useDispatch();
//   //const ordersError = useSelector(getErrorFeed);
//   const orders: TOrder[] = [];

//   const handleGetFeeds = () => {
//     dispatch(loadFeed());
//   };
//   useEffect(() => {
//     dispatch(loadFeed());
//   }, []);
//   // if (ordersError) {
//   //   return (
//   //     <p style={{ color: 'var(--colors-interface-error)' }}>{ordersError}</p>
//   //   );
//   // }

//   if (!orders.length) {
//     return <Preloader />;
//   }

//   return (
//     <>
//       <FeedUI
//         orders={orders}
//         handleGetFeeds={() => {
//           dispatch(loadFeed());
//         }}
//       />
//       <Outlet />
//     </>
//   );
// };
