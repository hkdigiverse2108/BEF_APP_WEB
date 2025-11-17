import { message } from "antd";

export type MessageType = "success" | "error" | "info" | "warning" | "loading";

let messageApi: ReturnType<typeof message.useMessage>[0];

export const AntMessageHolder = () => {
  const [api, contextHolder] = message.useMessage();
  messageApi = api;
  return <>{contextHolder}</>;
};

interface ShowMessageOptions {
  duration?: number;
  marginTop?: string | number;
}

/**
 * Common reusable message function
 */
export const AntMessage = (
  type: MessageType,
  content: string,
  options?: ShowMessageOptions
) => {
  if (!messageApi) return;

  messageApi.open({
    type,
    content,
    duration: options?.duration ?? 3,
    style: {
      marginTop: options?.marginTop,
    },
  });
};
