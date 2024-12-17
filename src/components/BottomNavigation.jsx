// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)import myfunction from '../libraries/myfunction';
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

export default function NavigasiBawah(...props) {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  return(
      <BottomNavigation
        showLabels
        value={props.value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        //   console.log(`value : ${value}`);
        // }}
        sx={{ position: 'fixed', bottom: 0, width: '100%', background: '#000' }}
      >
        <BottomNavigationAction
          label="Beranda"
          icon={<HomeOutlinedIcon />}
          // selected={props.value === 0}
          selected={false}
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
          selected={props.value === 1}
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
          label="Psikotest"
          icon={<AssignmentOutlinedIcon />}
          selected={props.value === 2}
          sx={{
            color: '#fff',
            '&.Mui-selected': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
          onClick={() => [router.push('/admin/psikotest'), setValue(2)]}
        />
        <BottomNavigationAction
          label="Variabel"
          icon={<AppSettingsAltOutlinedIcon />}
          selected={props.value === 3}
          sx={{
            color: '#fff',
            '&.Mui-selected': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
          onClick={() => [router.push('/admin/variabel'), setValue(3)]}
        />
      </BottomNavigation>
  );
}