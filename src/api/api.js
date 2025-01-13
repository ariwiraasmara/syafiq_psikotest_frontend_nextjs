import axios from 'axios';
import { random } from '@/libraries/myfunction';
const base_url = `${process.env.NEXT_PUBLIC_API_BACKEND}/api`;

const csrfToken = async() => {
    try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
        });
        console.info('csrfToken', response);
        return response;
    }
    catch (err) {
        console.error('Error : getToken', err);
        return err;
    }
}

const getUniqueToken = async() => {
    try {
        const response = await axios.get(`${base_url}/generate-token-first`, {
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

const submitLogin = async(email, password) => {
    try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const csrfToken = await csrfToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, {
            email: emaillogin,
            password: passlogin
        }, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
            headers: {
                'Content-Type': 'application/json',
                'XSRF-TOKEN': csrfToken,
                'tokenlogin': fun.random('combwisp', 50)
            }
        });
        console.info('submitLogin', response);
        return response;
    }
    catch (err) {
        console.error('Error : submitLogin', err);
        return err;
    }
}

const getDashboard = async(islogin, isadmin, pat, remember_token, email) => {
    try {
        const csrfToken = getToken;
        const response = await axios.get(`${base_url}/dashboard_admin`, {
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
    csrfToken,
    getUniqueToken,
    submitLogin,
    getDashboard,
    getVariabel
};