import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:8088/hotel-api',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response;
        } else {
            this.$message.error(response.data.msg)
            Promise.reject();
        }
    },
    error => {
        this.$message.error("请求错误")
        return Promise.reject();
    }
);

export default service;