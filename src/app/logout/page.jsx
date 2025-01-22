// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { readable, random } from '@/libraries/myfunction';
export default function Logout() {
    const router = useRouter();

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.APP_FAST_API_KEY,
                    'XSRF-TOKEN': csrfToken,
                    'tokenlogin': random('combwisp', 50)
                }
            });
            if(response.data.success) {
                localStorage.setItem('sesi_admin', response.data.sesi.expire_at);

                //? Sesi Cookies
                Cookies.remove('islogin');
                Cookies.remove('isadmin');
                Cookies.remove('isauth');

                //? Sesi Local Storage Data Admin
                localStorage.removeItem('islogin');
                localStorage.removeItem('isadmin');
                localStorage.removeItem('ispeserta');
                localStorage.removeItem('email');
                localStorage.removeItem('nama');
                localStorage.removeItem('pat');
                localStorage.removeItem('csrfToken');
                localStorage.removeItem('remember-token');
                sessionStorage.removeItem('nav_id');

                //? Sesi Data Halaman Peserta
                sessionStorage.removeItem('admin_id_peserta');
                sessionStorage.removeItem('admin_nama_peserta');
                sessionStorage.removeItem('admin_noidentitas_peserta');
                sessionStorage.removeItem('admin_email_peserta');
                sessionStorage.removeItem('admin_tgllahir_peserta');
                sessionStorage.removeItem('admin_asal_peserta');

                //? Sesi Data Halaman Psikotest Kecermatan
                sessionStorage.removeItem('admin_psikotest_kecermatan_id');
                sessionStorage.removeItem('admin_psikotest_kecermatan_kolom_x');
                sessionStorage.removeItem('admin_psikotest_kecermatan_nilai_A');
                sessionStorage.removeItem('admin_psikotest_kecermatan_nilai_B');
                sessionStorage.removeItem('admin_psikotest_kecermatan_nilai_C');
                sessionStorage.removeItem('admin_psikotest_kecermatan_nilai_D');
                sessionStorage.removeItem('admin_psikotest_kecermatan_nilai_E');
                sessionStorage.removeItem('admin_psikotest_kecermatan_idsoal');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalA');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalB');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalC');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalD');
                sessionStorage.removeItem('admin_psikotest_kecermatan_jawaban');
                sessionStorage.removeItem('admin_psikotest_kecermatan_tabellastpage');

                //? Sesi Data Halaman Variabel
                sessionStorage.removeItem('admin_variabel_id');
                sessionStorage.removeItem('admin_variabel_variabel');
                sessionStorage.removeItem('admin_variabel_values');
                return router.push('/');
            }
            return alert('Tidak Bisa Logout!');
        }
        catch(err) {
            console.log('Terjadi Error Logout-logout:', err);
        }
    };

    React.useEffect(() => {
        logout();
    }, []);
}