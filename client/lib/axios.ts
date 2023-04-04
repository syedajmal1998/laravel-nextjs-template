import Axios, { AxiosError } from 'axios'
import { toast } from 'react-hot-toast';
export const baseURL = process.env.NEXT_PUBLIC_API_HOST_URL
const axios = Axios.create({
    baseURL: baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})
axios.interceptors.response.use(function (response) {
    return response;
}, function (error: AxiosError) {
    error?.response?.data?.message && error.response.status != 401 && toast.error(error?.response?.data?.message);
    return Promise.reject(error);
});
export const csrf = () => axios.get(baseURL + '/sanctum/csrf-cookie')

export default axios
