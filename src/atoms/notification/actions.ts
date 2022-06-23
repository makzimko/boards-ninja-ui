import { useRecoilCallback } from 'recoil';
import { Notification, NotificationType } from './types';
import notificationListState from './atoms';

const defaultNotificationOptions = {
  type: NotificationType.Info,
};

const useNotificationActions = () => {
  const notify = useRecoilCallback(
    ({ set }) =>
      (message: string, options?: Omit<Notification, 'message' | 'id'>) => {
        const id = +new Date();
        set(notificationListState, (prevValue) => [
          ...prevValue,
          {
            id,
            message,
            ...defaultNotificationOptions,
            ...options,
          },
        ]);

        setTimeout(() => {
          set(notificationListState, (prevState) =>
            prevState.filter((item) => item.id !== id)
          );
        }, 3000);
      },
    []
  );

  return { notify };
};

export default useNotificationActions;
