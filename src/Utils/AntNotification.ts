import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { AntdNotificationType, GlobalConfigPropsWithStack } from "../Types";

export const AntdNotification = (notificationApi: NotificationInstance, type: AntdNotificationType, message: string, duration?: number,description?: string): void => {
  notification.config({
    placement: "top",
    duration: duration ? duration : 5,
    stack: {
      threshold: 20,
    },
    pauseOnHover: true,
  } as GlobalConfigPropsWithStack);

  notificationApi[type]({
    message,
    description,
  });
};
