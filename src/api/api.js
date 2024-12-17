import axios from 'axios';
import Swal from 'sweetalert2';

const base_url = 'http://127.0.0.1:8000/api';

export function submitLogin() {
    const emaillogin = $('#email-login').val();
    const passlogin = $('#pass-login').val();

    axios.post(`${base_url}/login`, {}, {
        email: emaillogin,
        password: passlogin
    }).then(response => (
        window.location.href = '/admin/dashboard'
    ))
    .catch(err => (
        Swal.fire({
            title: 'User Tidak Ditemukan!',
            icon: 'error',
            text: 'User ini tidak terdaftar!',
            confirmButtonText: 'OK',
        }).then((result) => {
            console.log('email:pass', `${userlogin}:${passlogin}`)
        })
    ))
    .finally(() => this.loading = false)
}

// export async function getVariabelSetting() {
//     return await axios.get(`${base_url}/variabel-setting`)
//                 .then(response => response.json())
//                 .catch(err => {
//                     console.log(err);
//                     return null;
//                 });

// export const getVariabelSetting = async () => {
//     const response = await axios.get(
// 		`${base_url}/variabel-setting`
// 	);
// }

const api_getVariabelSetting = async () => {
    try {
        const response = await axios.get('http://127.0.1:8000/api/variabel-setting');
        return response;
    } catch (err) {
        return err;
        // console.error(err);
    }
}