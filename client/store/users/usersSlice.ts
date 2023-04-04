import { createSlice } from '@reduxjs/toolkit'
import axios from '~/lib/axios'
import { generateFormData } from '~/utils/helpers'

// use typeof usersType is you want to use this time
export const usersType = {
    "data": [
        {
            "id": 0,
            "email": "",
            "name": "",
            "image": "",
            "profile_photo_url": "",
            "email_verified_at": "",
            "roles": [
                "",
            ]
        }
    ],
    "links": {
        "first": "",
        "last": "",
        "prev": "",
        "next": ""
    },
    "meta": {
        "current_page": 0,
        "from": 0,
        "last_page": 0,
        "links": [
            {
                "url": null,
                "label": null,
                "active": false
            },
        ],
        "path": "",
        "per_page": 0,
        "to": 0,
        "total": 0
    },
    isLoading: false
}

const initialState: typeof usersType = {
    data: [],
    links: undefined,
    meta: undefined,
    isLoading: false
}

export const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            if (!action.payload.fresh) {
                const users = [...(state.data || []), ...(action.payload?.users?.data)];
                state.data = users.reduce(function (UUsers: typeof usersType.data, user) {
                    if (!UUsers.some(p => p?.id == user.id)) UUsers.push(user)
                    return UUsers;
                }, [])
            }
            else state.data = action.payload?.users?.data
            state.links = action.payload.users?.links
            state.meta = action.payload.users?.meta
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
})
export const { setUsers, setIsLoading } = users.actions

export const fetchUsers = (params?: any) => async (dispatch) => {
    await dispatch(setIsLoading(true))
    const response = await axios.get(`users`, { params });
    await dispatch(setUsers({ users: response.data, fresh: params?.fresh }));
    await dispatch(setIsLoading(false))
};
export const storeUser = (data) => async (dispatch) => {
    await axios.post(`users`, generateFormData(data));
    await dispatch(fetchUsers({ fresh: true, type: data.type }));
};
export const updateUser = (data) => async (dispatch) => {
    await axios.post(`users/${data.id}`, generateFormData(data, 'put'));
    await dispatch(fetchUsers({ fresh: true, type: data.type }));
};
export const deleteUser = (id) => async (dispatch) => {
    await axios.delete(`users/${id}`);
    await dispatch(fetchUsers());
};

// Action creators are generated for each case reducer function
export default users.reducer