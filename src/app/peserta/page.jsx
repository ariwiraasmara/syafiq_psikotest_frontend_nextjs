// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutpeserta from '../layoutpeserta';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import fun from '@/libraries/myfunction';

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
    const [loading, setLoading] = React.useState(true);
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

    const checkData = () => {
        setLoading(true);
        try {
            localStorage.setItem('islogin', false);
            localStorage.setItem('isadmin', false);
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

            if(sessionStorage.getItem('nama_peserta_psikotest')) setNama(sessionStorage.getItem('nama_peserta_psikotest'));
            if(sessionStorage.getItem('no_identitas_peserta_psikotest')) setNo_identitas(sessionStorage.getItem('no_identitas_peserta_psikotest'));
            if(sessionStorage.getItem('email_peserta_psikotest')) setEmail(sessionStorage.getItem('email_peserta_psikotest'));
            if(sessionStorage.getItem('tgl_lahir_peserta_psikotest')) setTgl_lahir(sessionStorage.getItem('tgl_lahir_peserta_psikotest'));
            if(sessionStorage.getItem('asal_peserta_psikotest')) setAsal(sessionStorage.getItem('asal_peserta_psikotest'));
        }
        catch(e) {
            console.log(e);
        }
        setLoading(false);
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!nama || !no_identitas || !tgl_lahir) alert('Nama, No Identitas, dan Tanggal Lahir harus diisi.');
            else {
                axios.defaults.withCredentials = true;
                axios.defaults.withXSRFToken = true;
                const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                });
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/setup`, {
                    nama: nama,
                    no_identitas: no_identitas,
                    email: email,
                    tgl_lahir: tgl_lahir,
                    asal: asal,
                }, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    headers: {
                        'XSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json',
                        'tokenlogin': fun.random('combwisp', 50),
                    }
                });

                console.info('response', response);
                if(response.data.success) {
                    sessionStorage.setItem('id_peserta_psikotest', response.data.res);
                    sessionStorage.setItem('nama_peserta_psikotest', nama);
                    sessionStorage.setItem('no_identitas_peserta_psikotest', no_identitas);
                    sessionStorage.setItem('email_peserta_psikotest', email);
                    sessionStorage.setItem('tgl_lahir_peserta_psikotest', tgl_lahir);
                    sessionStorage.setItem('asal_peserta_psikotest', asal);
                    sessionStorage.setItem('sesi_psikotest_kecermatan', 1);
                    sessionStorage.setItem('tgl_tes_peserta_psikotest', today);

                    // sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom1`, '25');
                    // sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom2`, '20');
                    // sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom3`, '35');
                    // sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom4`, '10');
                    // sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom5`, '50');
                    router.push(`/peserta/psikotest/kecermatan/`);
                    // router.push(`/peserta/psikotest/kecermatan/hasil?identitas=${no_identitas}&tgl_text=${today}`);
                }
                else {
                    alert('Terjadi Kesalahan Setup Peserta');
                }
            }
        }
        catch(err) {
            console.error('Terjadi Kesalahan', err);
            alert('Terjadi Kesalahan');
        }
        setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        checkData();
    }, []);

    if(loading) {
        return (
            <div className='text-center p-8'>
                <p><span className='font-bold text-2lg'>Loading...</span></p>
            </div>
        );
    }

    return (
        <Layoutpeserta>
            <Myhelmet
                title='Formulir Peserta | Psikotest Online App'
                description='Halaman Formulir Peserta'
                pathURL='peserta'
                onetime={true}
            />
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
                                        defaultValue={nama}
                                        fullWidth sx={styledTextField} />
                            <TextField  type="number" id="no_identitas" variant="outlined" required focused
                                        placeholder="Nomor Identitas... (NIK / NIP / NISN)" label="Nomor Identitas... (NIK / NIP / NISN)"
                                        onChange = {(event)=> setNo_identitas(event.target.value)}
                                        defaultValue={no_identitas}
                                        fullWidth sx={styledTextField} />
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
                                <Button variant="contained" size="large" fullWidth onClick={(e) => submit(e)}>
                                    Lanjut
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            </main>
        </Layoutpeserta>
    );
}