import Axios from "axios";

function createAxios() {
    const axios = Axios.create();

    axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api/v1`;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.timeout = 120000; // 120 seconds before time out

    axios.interceptors.request.use(
        (conf) => {
            return conf;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("error in interceptor", error);
            if (error && error.response) {
                // if (error.response.status === 401) {
                //     window.location.href = "/";
                // }
                // if (error.response.data) {
                //     return Promise.reject(error.response.data);
                // }
            }
            return Promise.reject(error);
        }
    );
    return axios;
}

// Initialise Axios
const api = createAxios();

const service = {
    getHeaders() {
        return {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-access-token"),
        };
    },
    // POST services
    async postWithoutHeaders(route, body) {
        const { data } = await api.post(route, body);
        return data.object;
    },

    async rawPost(path, payload) {
        const headers = this.getHeaders();

        const { data } = await api.post(path, payload, {
            headers,
        });

        return data.object;
    },

    // GET services
    async getWithoutHeaders(route) {
        const { data } = await api.get(route);
        return data.object;
    },

    // PATCH services
    async patch(route, body) {
        const headers = this.getHeaders();
        const { data } = await api.patch(`${route}`, body, {
            headers,
        });
        return data.object;
    },

    test() {
        console.log("http service is working fine.");
    },
};

window.$http = service;

export default service;
