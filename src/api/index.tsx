import axios from 'axios';
import { ResponseData } from './types';

const URL = 'https://covid19.mathdro.id/api';
const URL_DAILY = `${URL}/daily`;
const URL_COUNTRIES = `${URL}/countries`;

export const fetchData = async (country?: string): Promise<ResponseData> => {
    let changeableUrl = URL as string
    
    if (country) {
        changeableUrl = `${URL}/countries/${country}`
    }
    try {
        const { data } = await axios.get<ResponseData>(changeableUrl);

        return data;
    } catch (error) {
        return {} as ResponseData
    }
}