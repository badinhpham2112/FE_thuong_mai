import axios from "axios";

export const createComment = async(data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/comment/create`, data);
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}

export const getAllComment = async() => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/comment/get-all-comment`);
        return res.data;


    } catch (error) {
        console.error('AxiosError:', error);

    }

}