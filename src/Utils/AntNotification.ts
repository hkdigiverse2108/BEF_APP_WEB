import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { AntdNotificationType, GlobalConfigPropsWithStack } from "../Types";

export const AntdNotification = (notificationApi: NotificationInstance, type: AntdNotificationType, message: string, color?: string,description?: string): void => {
  notification.config({
    placement: "top",
    duration: 3,
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
