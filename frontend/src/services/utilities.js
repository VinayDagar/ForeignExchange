import { message } from "antd";
import axios from "axios";

message.config({
    top: 24,
    duration: 3,
    maxCount: 1,
});

const service = {
    showSuccessMessage(msg, duration = 3) {
        if (!message) return;
        message.success(msg, duration);
    },
    showWarningMessage(msg, duration = 3) {
        if (!message) return;
        message.warn(msg, duration);
    },
    showErrorMessage(msg, duration = 3) {
        if (!message) return;
        message.error(msg, duration);
    },
    showInfoMessage(msg, duration = 3) {
        if (!message) return;
        message.info(msg, duration);
    },
    getCurrencyExchange: async (currency) => {
        try {
            const api = axios.create();
            console.log(process.env.REACT_APP_EXCHANGE_API_HOST)
            const result = await api.get(`${process.env.REACT_APP_EXCHANGE_API_HOST}/latest?base=${currency}`);

            return result;
        } catch (err) {
            message.error(err);
        }
    },
};

window.$utility = service;

export default service;
