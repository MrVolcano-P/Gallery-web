import { message } from "antd"

export const Error = (text) => {
    message.error(text)
}

export const Success = (text) => {
    message.success(text)
}