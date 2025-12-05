import { message } from "antd";

message.config({
  duration: 3,
  maxCount: 1, // only one toast at a time
});

const msg = {
  success: (text) => message.success(text),
  error: (text) => message.error(text),
  info: (text) => message.info(text),
  warning: (text) => message.warning(text),
  loading: (text) => message.loading(text),
};

export default msg;
