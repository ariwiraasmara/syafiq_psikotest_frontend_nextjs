// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import myfunction from './libraries/myfunction';
import * as React from 'react';
// import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';

export const metadata = {
  title: "Admin | Psikotest",
  description: "Admin Psikotest Online App",
};


export default function RootLayout({ children }) {

  // const fun = new myfunction();
  // const islogin = myfunction.checkCookie('islogin');
  // myfunction.checkCookie('islogin');
  // console.log(`islogin : ${islogin}`);
  // const email = myfunction.checkCookie('email');
  const islogin = true;
  // const location = useLocation();
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // const pathname = router.pathname;
    // if (pathname === '/admin/dashboard') {
    //   setValue(0);
    // } else if (pathname === '/admin/peserta') {
    //   setValue(1);
    // } else if (pathname === '/admin/psikotest') {
    //   setValue(2);
    // } else if (pathname === '/admin/variabel') {
    //   setValue(3);
    // }

    if(value === 0) {
      
    }
    
  }, [router.pathname]);
  
  return (
    <div>
      {children}

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(`value : ${value}`);
        }}
        sx={{ position: 'fixed', bottom: 0, width: '100%', background: '#000' }}
      >
        <BottomNavigationAction
          label="Beranda"
          icon={<HomeOutlinedIcon />}
          selected={value === 0}
          sx={{
            color: '#fff',
            '&.Mui-selected': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
          onClick={() => [router.push('/admin/dashboard'), setValue(0)]}
        />
        <BottomNavigationAction
          label="Peserta"
          icon={<PeopleAltOutlinedIcon />}
          selected={value === 1}
          sx={{
            color: '#fff',
            '&.Mui-selected': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
          onClick={() => [router.push('/admin/peserta'), setValue(1)]}
        />
        <BottomNavigationAction
          label="Tes"
          icon={<AssignmentOutlinedIcon />}
          selected={value === 2}
          sx={{
            color: '#fff',
            '&.Mui-selected': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
          onClick={() => router.push('/admin/psikotest')}
        />
        <BottomNavigationAction
          label="Variabel"
          icon={<AppSettingsAltOutlinedIcon />}
          selected={value === 3}
          sx={{
            color: '#fff',
            '&.Mui-selected': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
          onClick={() => router.push('/admin/variabel')}
        />
      
      </BottomNavigation>
    </div>
  );
}
