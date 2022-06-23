import { atom } from 'recoil';
import { Notification } from './types';

const notificationListState = atom<Notification[]>({
  key: 'Notification',
  default: [],
});

export default notificationListState;
