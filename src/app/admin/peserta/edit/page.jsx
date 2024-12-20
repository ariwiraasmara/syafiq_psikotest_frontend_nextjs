// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '../../../layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';

const styledTextField = {
    '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid rgba(255, 255, 255, 0.9)',
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-placeholder': {
        color: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.8)', // warna hover
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white', // warna hover
    },
    '& marginTop': 5
}

export default function AdminPesertaEdit() {
    const router = useRouter();
    const idpeserta = sessionStorage.getItem('admid_peserta');
    const [nama, setNama] = React.useState('');
    const [no_identitas, setNo_identitas] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tgl_lahir, setTgl_lahir] = React.useState('');
    const [asal, setAsal] = React.useState('');

    const getData = () => {
        setNama(sessionStorage.getItem('admnama_peserta'));
        setNo_identitas(sessionStorage.getItem('admnoidentitas_peserta'));
        setEmail(sessionStorage.getItem('admemail_peserta'));
        setTgl_lahir(sessionStorage.getItem('admtgllahir_peserta'));
        setAsal(sessionStorage.getItem('admasal_peserta'));
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`);
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/${idpeserta}`, {
                email: email,
                tgl_lahir: tgl_lahir,
                asal: asal
            }, {
                headers: {
                    'XSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                }
            });
            if(response.data.success) {
                sessionStorage.removeItem('admnama_peserta');
                sessionStorage.removeItem('admnoidentitas_peserta');
                sessionStorage.removeItem('admemail_peserta');
                sessionStorage.removeItem('admtgllahir_peserta');
                sessionStorage.removeItem('admasal_peserta');
                return router.push('/admin/peserta/detil/');
            }
            else {
                console.log('response', response);
                return alert('Terjadi Kesalahan Variabel');
            }
        }
        catch(e) {
            console.log('Gagal Mengirim Update Data Peserta', );
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        try {
            sessionStorage.removeItem('admnama_peserta');
            sessionStorage.removeItem('admnoidentitas_peserta');
            sessionStorage.removeItem('admemail_peserta');
            sessionStorage.removeItem('admtgllahir_peserta');
            sessionStorage.removeItem('admasal_peserta');
            return router.push('/admin/peserta/detil/');
        }
        catch(e) {
            console.log('Gagal Membatalkan Update Data Peserta', );
        }
    };

    React.useEffect(() => {
        getData();
    }, []);

    return(
        <Layoutadmindetil>
            <Myhelmet
                title={`Detil Peserta | Admin | Psikotest Online App`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`/admin/peserta/edit`}
            />
            <Appbarku headTitle={'Update Peserta'} />
            <main className="p-5 mb-14">
                <div>
                    <p><span className='font-bold'>Nama</span>: {nama}</p>
                    <p><span className='font-bold'>Nomor Identitas</span>: {no_identitas}</p>
                </div>
                <Box component="form"
                    sx={{ '& > :not(style)': { m: 2, p: 1, width: '100%' },
                        p: 3
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField  type="text" id="Email" variant="outlined" focused
                                placeholder="Email..." label="Email..."
                                onChange = {(event)=> setEmail(event.target.value)}
                                defaultValue={email}
                                fullWidth sx={styledTextField} />

                    <TextField  type="date" id="tgl_lahir" variant="outlined" required focused
                                placeholder="Tanggal Lahir..." label="Tanggal Lahir..."
                                onChange = {(event)=> setTgl_lahir(event.target.value)}
                                defaultValue={tgl_lahir}
                                fullWidth sx={styledTextField} />

                    <TextField  type="text" id="asal" variant="outlined" focused
                                placeholder="Asal..." label="Asal..."
                                onChange = {(event)=> setAsal(event.target.value)}
                                defaultValue={asal}
                                fullWidth sx={styledTextField} />

                    <Box sx={{ m: 1 }}>
                        <Button variant="contained" size="large" color="primary" fullWidth onClick={(e) => submit(e)} >
                            Simpan
                        </Button>
                        <Button variant="contained" size="large" color="secondary" fullWidth onClick={(e) => cancel(e)} sx={{marginTop: 2}} >
                            Batal
                        </Button>
                    </Box>
                </Box>
            </main>
        </Layoutadmindetil>
    );
}