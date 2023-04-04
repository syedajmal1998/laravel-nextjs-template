import { toast } from 'react-hot-toast';
import axios from "~/lib/axios";

export function fetchUserRoles() {
    return axios.get('autocomplete/user_roles').then(res => res.data).catch(err => {
        toast.error(err?.response?.data?.message)
        return err
    })
}