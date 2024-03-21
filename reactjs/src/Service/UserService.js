import axios from "axios";
export const axiosJWt = axios.create()

export const loginUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    return res.data

}

export const signupUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    return res.data
}

export const getDetailsUser = async(id, access_token) => {
    try {
        const res = await axiosJWt.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
        return res.data

    } catch (error) {
        console.error('AxiosError:', error);


    }
}

export const getAllUser = async(access_token) => {
    try {
        const res = await axiosJWt.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
        return res.data
    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const refreshToken = async(refreshToken) => {
    console.log('refreshToken', refreshToken)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {}, {
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

export const logoutUser = async() => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
        return res.data

    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const updateUser = async(id, access_token, data) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const deleteUser = async(id, data, access_token) => {

    const res = await axiosJWt.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data

}


export const deleteManyUser = async(data, access_token) => {

    const res = await axiosJWt.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data

}