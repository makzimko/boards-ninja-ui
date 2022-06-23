import React from 'react';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

import notificationListState from '../../atoms/notification/atoms';

import styles from './Notification.module.scss';
import { NotificationType } from '../../atoms/notification';

const notificationIconsMap: Record<NotificationType, string> = {
  [NotificationType.Info]: 'jam-info',
  [NotificationType.Error]: 'jam-close-circle',
  [NotificationType.Warning]: 'jam-alert',
  [NotificationType.Success]: 'jam-check',
};

const Notification = () => {
  const notifications = useRecoilValue(notificationListState);

  return (
    <div className={styles.wrapper}>
      {notifications.map(({ id, message, type }) => (
        <div key={id} className={styles.notification}>
          <span
            className={classNames(
              'jam',
              notificationIconsMap[type],
              styles.icon,
              styles[`icon-${type}`]
            )}
          ></span>
          {message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
