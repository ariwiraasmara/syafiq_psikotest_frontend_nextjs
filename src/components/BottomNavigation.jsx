// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';

import { random } from '@/libraries/myfunction';
import Cookies from 'js-cookie';

export default function NavigasiBawah() {
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
                return router.push('/admin');
            }
            return alert('Tidak Bisa Logout!');
        }
        catch(e) {
            console.log('Terjadi kesalahan', e);
            alert(`Terjadi Kesalahan untuk logout`);
        }
    };

    return(
        <React.StrictMode>
            <BottomNavigation
                showLabels
                sx={{ position: 'fixed', bottom: 0, width: '100%', background: '#000' }}
            >
            <BottomNavigationAction
                label="Dashboard"
                icon={<HomeOutlinedIcon />}
                defaultValue={0}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                rel='follow'
                title='Halaman Dashboard | Admin'
                href='/admin/dashboard'
                onClick={(event) => router.push('/admin/dashboard') }
            />
            <BottomNavigationAction
                label="Peserta"
                icon={<PeopleAltOutlinedIcon />}
                defaultValue={1}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                rel='follow'
                title='Halaman Daftar Peserta | Admin'
                href='/admin/peserta'
                onClick={(event) => router.push('/admin/peserta')}
            />
            <BottomNavigationAction
                label="Psikotest"
                icon={<AssignmentOutlinedIcon />}
                defaultValue={2}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                rel='follow'
                title='Halaman Daftar Psikotest | Admin'
                href='/admin/psikotest'
                onClick={(event) => router.push('/admin/psikotest')}
            />
            <BottomNavigationAction
                label="Variabel"
                icon={<AppSettingsAltOutlinedIcon />}
                defaultValue={3}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                rel='follow'
                title='Halaman Daftar Variabel | Admin'
                href='/admin/variabel'
                onClick={(event) => router.push('/admin/variabel')}
            />
            <BottomNavigationAction
                label="Logout"
                defaultValue={4}
                icon={<AppSettingsAltOutlinedIcon />}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                rel='follow'
                title='Logout | Admin'
                href='/logout'
                onClick={(event) => logout()}
            />
            </BottomNavigation>
        </React.StrictMode>
    );
}