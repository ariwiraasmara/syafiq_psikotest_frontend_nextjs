// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PropTypes from 'prop-types';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

NavigasiBawah.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    currentpage: PropTypes.number,
    lastpage: PropTypes.number
};

export default function NavigasiBawah(props) {
    const router = useRouter();

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
                href='/admin/peserta?page=1'
                onClick={(event) => router.push('/admin/peserta?page=1')}
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
                href='/admin/variabel?page=1'
                onClick={(event) => router.push('/admin/variabel?page=1')}
            />
            {/* <BottomNavigationAction
                label="Logout"
                defaultValue={4}
                icon={<LogoutIcon />}
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
                onClick={(event) => router.push('/logout')}
            /> */}
            </BottomNavigation>
        </React.StrictMode>
    );
}