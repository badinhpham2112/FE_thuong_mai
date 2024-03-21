import axios from "axios";
import { axiosJWt } from "./UserService";



export const createOrder = async(data) => {
    try {
        const res = await axiosJWt.post(`${process.env.REACT_APP_API_URL}/order/create`, data);
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const getAllOrder = async(id) => {
    const res = await axiosJWt.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`);
    return res.data;




}

export const getDetailsOrder = async(id) => {
    try {
        const res = await axiosJWt.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`);
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}


export const CancelOrder = async(id, access_token, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    try {
        const res = await axiosJWt.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`, { data }, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const getAllOrderUser = async(access_token) => {
    try {
        const res = await axiosJWt.get(`${process.env.REACT_APP_API_URL}/order/get-all-order-user`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
        return res.data
    } catch (error) {
        console.error('AxiosError:', error);

    }



}