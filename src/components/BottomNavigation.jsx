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

export default function NavigasiBawah() {
    const router = useRouter();
    const [svalue, setSvalue] = React.useState(0);

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`);
            if(response.data.success) {
                //? Sesi Local Storage Data Admin
                localStorage.removeItem('islogin');
                localStorage.removeItem('isadmin');
                localStorage.removeItem('email');
                localStorage.removeItem('nama');
                localStorage.removeItem('pat');
                localStorage.removeItem('csrfToken');
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

                //? Sesi Data Halaman Variabel
                sessionStorage.removeItem('variabel_id');
                sessionStorage.removeItem('variabel_variabel');
                sessionStorage.removeItem('variabel_values');
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
                values={svalue}
                sx={{ position: 'fixed', bottom: 0, width: '100%', background: '#000' }}
            >
            <BottomNavigationAction
                label="Beranda"
                icon={<HomeOutlinedIcon />}
                defaultValue={0}
                selected={svalue === 0}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                onClick={(event) =>router.push('/admin/dashboard') }
            />
            <BottomNavigationAction
                label="Peserta"
                icon={<PeopleAltOutlinedIcon />}
                defaultValue={1}
                selected={svalue === 1}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                onClick={(event) => router.push('/admin/peserta')}
            />
            <BottomNavigationAction
                label="Psikotest"
                icon={<AssignmentOutlinedIcon />}
                defaultValue={2}
                selected={svalue === 2}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
                onClick={(event) => router.push('/admin/psikotest')}
            />
            <BottomNavigationAction
                label="Variabel"
                icon={<AppSettingsAltOutlinedIcon />}
                defaultValue={3}
                selected={svalue === 3}
                sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
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
                onClick={(event) => logout()}
            />
            </BottomNavigation>
        </React.StrictMode>
    );
}