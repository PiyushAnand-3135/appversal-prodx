'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';
import Notifications from '@/components/Notifications';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Notifications />
      {children}
    </Provider>
  );
}
