import axios from "axios";
import { axiosJWt } from "./UserService";




export const getAllProduct = async(search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`);

    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`);
    }

    return res.data;

}

export const createProduct = async(data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
        return res.data

    } catch (error) {
        console.error('AxiosError:', error);

    }


}

export const getDetailsProduct = async(id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
        return res.data;

    } catch (error) {
        console.error('AxiosError:', error);

    }


}

export const updateProduct = async(id, access_token, data) => {
    try {
        const res = await axiosJWt.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const deleteProduct = async(id, access_token, data) => {
    try {
        const res = await axiosJWt.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const deleteManyProduct = async(data, access_token) => {
    try {
        const res = await axiosJWt.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}


export const getAllTypeProduct = async() => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`);
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const getProductType = async(type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`);
        return res.data;
    }

}



export const getLatestProduct = async(data) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/latest-product`, data);
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}