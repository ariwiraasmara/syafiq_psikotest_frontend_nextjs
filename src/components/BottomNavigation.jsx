// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)import myfunction from '../libraries/myfunction';
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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

  const logout = async () => {
      try {
          axios.defaults.withCredentials = true;
          axios.defaults.withXSRFToken = true;
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`);
          if(response.data.success) {
              localStorage.removeItem('islogin');
              localStorage.removeItem('isadmin');
              localStorage.removeItem('email');
              localStorage.removeItem('nama');
              localStorage.removeItem('pat');
              localStorage.removeItem('csrfToken');
              sessionStorage.removeItem('peserta_id');
              sessionStorage.removeItem('psikotest_kecermatan_id');
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
        <BottomNavigationAction
          label="Logout"
          icon={<AppSettingsAltOutlinedIcon />}
          selected={props.value === 3}
          sx={{
            color: '#fff',
            '&.Mui-selected': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
          onClick={() => [logout(), setValue(0)]}
        />
      </BottomNavigation>
  );
}