// import axios from 'axios';
import { EERROR_MESSAGES } from '@/assets/data';
import { API } from '../assets';

export const getProductsService = async () => {
    try {
        // const url = 'assets/data.ts';
        const response = await API.getMockProducts();
        if(response.status > 300) {
            throw new Error(response?.message);
        }
        if(response.data) {
            return response.data;
        }
    } catch (error) {
        throw new Error(EERROR_MESSAGES.FAIL_PRODUCT);
    }
}