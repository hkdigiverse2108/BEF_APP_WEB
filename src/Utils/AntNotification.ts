import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import type {
  AntdNotificationType,
  GlobalConfigPropsWithStack,
} from "../Types";

export const AntdNotification = (
  notificationApi: NotificationInstance,
  type: AntdNotificationType,
  message: string,
  description?: string
): void => {
  notification.config({
    placement: "topRight",
    duration: 3,
    stack: {
      threshold: 20,
    },
    style: { backgroundColor: "#037b3d" },
  } as GlobalConfigPropsWithStack);

  notificationApi[type]({
    message,
    description,
  });
};
