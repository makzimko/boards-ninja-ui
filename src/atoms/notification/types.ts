export enum NotificationType {
  'Info' = 'info',
  'Success' = 'success',
  'Error' = 'error',
  'Warning' = 'warning',
}

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
};
