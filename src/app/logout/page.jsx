// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
export default function Logout() {
    const router = useRouter();
    React.useEffect(() => {
        //? Sesi Cookies
        Cookies.remove('islogin');
        Cookies.remove('isadmin');
        Cookies.remove('isauth');

        //? Sesi Local Storage Data Admin
        localStorage.removeItem('islogin');
        localStorage.removeItem('isadmin');
        localStorage.removeItem('email');
        localStorage.removeItem('nama');
        localStorage.removeItem('pat');
        localStorage.removeItem('csrfToken');
        localStorage.removeItem('remember-token');
        sessionStorage.removeItem('nav_id');

        //? Sesi Data Halaman Peserta
        sessionStorage.removeItem('admid_peserta');
        sessionStorage.removeItem('admnama_peserta');
        sessionStorage.removeItem('admnoidentitas_peserta');
        sessionStorage.removeItem('admemail_peserta');
        sessionStorage.removeItem('admtgllahir_peserta');
        sessionStorage.removeItem('admasal_peserta');

        //? Sesi Data Halaman Psikotest Kecermatan
        sessionStorage.removeItem('psikotest_kecermatan_id');
        sessionStorage.removeItem('psikotest_kecermatan_idsoal');
        sessionStorage.removeItem('psikotest_kecermatan_soalA');
        sessionStorage.removeItem('psikotest_kecermatan_soalB');
        sessionStorage.removeItem('psikotest_kecermatan_soalC');
        sessionStorage.removeItem('psikotest_kecermatan_soalD');
        sessionStorage.removeItem('psikotest_kecermatan_jawaban');
        sessionStorage.removeItem('psikotest_kecermatan_tabellastpage');
        
        //? Sesi Data Halaman Variabel
        sessionStorage.removeItem('variabel_id');
        sessionStorage.removeItem('variabel_variabel');
        sessionStorage.removeItem('variabel_values');
        return router.push('/');
    }, []);
}