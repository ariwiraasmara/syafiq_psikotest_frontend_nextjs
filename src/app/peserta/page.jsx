// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import layout from '../layout';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';

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
}

export default function PesertaTes() {
    const router = useRouter();
    const [nama, setNama] = React.useState('');
    const [no_identitas, setNo_identitas] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tgl_lahir, setTgl_lahir] = React.useState('');
    const [asal, setAsal] = React.useState('');

    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() + 1;
    const date = getDate.getDate();
    const today = `${year}-${month}-${date}`;

    const submitData = () => {
        if (!nama || !no_identitas || !tgl_lahir) alert('Nama, No Identitas, dan Tanggal Lahir harus diisi.');
        else {
            sessionStorage.setItem('nama', nama);
            sessionStorage.setItem('no_identitas', no_identitas);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('tgl_lahir', tgl_lahir);
            sessionStorage.setItem('asal', asal);
            sessionStorage.setItem('sesi_psikotest_kecermatan', 1);
            sessionStorage.setItem('tgl_tes', today);

            /*
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, {
                _method: 'POST',
                email: emaillogin,
                password: passlogin,
                tokenlogin: Math.random()
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                }
            });
            console.log('response', response);
            */
            sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom1`, '25');
            sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom2`, '20');
            sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom3`, '35');
            sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom4`, '10');
            sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom5`, '50');
            // router.push(`/peserta/psikotest/kecermatan/`);
            router.push(`/peserta/psikotest/kecermatan/hasil?identitas=${no_identitas}`);
        }
        
    }

    return (
    <main>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                
                <Box component="form" 
                    sx={{ '& > :not(style)': { m: 0, p: 3, width: '100%' },
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '3px solid white' ,
                        borderRadius: 3,
                        textAlign: 'center',
                        p: 3
                    }}
                    noValidate
                    autoComplete="off">
                    <h1 className="text-2xl text-bold uppercase font-bold">Peserta</h1>
                    <TextField  type="text" id="nama" variant="outlined" required focused
                                placeholder="Nama..." label="Nama..."
                                onChange = {(event)=> setNama(event.target.value)}
                                fullWidth sx={styledTextField} />

                    <TextField  type="text" id="no_identitas" variant="outlined" required focused
                                placeholder="Nomor Identitas... (NIK / NIP / NISN)" label="Nomor Identitas... (NIK / NIP / NISN)"
                                onChange = {(event)=> setNo_identitas(event.target.value)}
                                fullWidth sx={styledTextField} />

                    <TextField  type="text" id="Email" variant="outlined" focused
                                placeholder="Email..." label="Email..."
                                onChange = {(event)=> setEmail(event.target.value)}
                                fullWidth sx={styledTextField} />

                    <TextField  type="date" id="tgl_lahir" variant="outlined" required focused
                                placeholder="Tanggal Lahir..." label="Tanggal Lahir..."
                                onChange = {(event)=> setTgl_lahir(event.target.value)}
                                fullWidth sx={styledTextField} />

                    <TextField  type="text" id="asal" variant="outlined" focused
                                placeholder="Asal..." label="Asal..."
                                onChange = {(event)=> setAsal(event.target.value)}
                                fullWidth sx={styledTextField} />

                    <Box sx={{ '& button': { m: 1, width: '96%' } }}>
                        <Button variant="contained" size="large" onClick={() => submitData()}>
                            Lanjut
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    </main>
    )
}