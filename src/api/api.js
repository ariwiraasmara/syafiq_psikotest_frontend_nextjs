import axios from 'axios';
import fun from '@/libraries/myfunction';
const base_url = `${process.env.NEXT_PUBLIC_API_BACKEND}/api`;

const getToken = async() => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
        });
        console.info('getToken', response);
        return response;
    }
    catch (err) {
        console.error('Error : getToken', err);
        return err;
    }
}

const getUniqueToken = async() => {
    try {
        const response = await axios.get(`${base_url}/api/generate-token-first`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
        });
        console.info('getUniqueToken', response);
        return response;
    }
    catch (err) {
        console.error('Error : getUniqueToken', err);
        return err;
    }
}

const getDashboard = async(islogin, isadmin, pat, remember_token, email) => {
    try {
        const csrfToken = getToken;
        const response = await axios.get(`${base_url}/dashboard`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'XSRF-TOKEN': csrfToken,
                'islogin' : islogin,
                'isadmin' : isadmin,
                'Authorization': `Bearer ${pat}`,
                'remember-token': remember_token,
                'tokenlogin': fun.random('combwisp', 50),
                'email' : email,
                '--unique--': 'I am unique!',
                'isvalid': 'VALID!',
                'isallowed': true,
                'key': 'key',
                'values': 'values',
                'isdumb': 'no',
                'challenger': 'of course',
                'pranked': 'absolutely'
            }
        });
        console.info('getDashboard', response);
        return response;
    }
    catch (err) {
        console.error('Error : getDashboard', err);
        return err;
    }
}

const getVariabel = async(id) => {
    try {
        const response = await axios.get(`${base_url}/variabel-setting/${id}`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
        });
        console.info('getVariabel', response);
        return response;
    }
    catch(err) {
        console.error('Error : getVariabel', err);
        return err;
    }
}

export {
    getToken,
    getUniqueToken,
    getDashboard,
    getVariabel
};