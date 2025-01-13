// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import {
    checkCompatibility,
	openDB,
    saveDataToDB
} from '@/indexedDB/db';
import { random } from '@/libraries/myfunction';

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

export default function Peserta() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);

    const [nama, setNama] = React.useState('');
    const handleChange_Nama = (event) => {
        event.preventDefault();
        setNama(event.target.value);
    }

    const [no_identitas, setNo_identitas] = React.useState('');
    const handleChange_No_identitas = (event) => {
        event.preventDefault();
        setNo_identitas(event.target.value);
    }

    const [email, setEmail] = React.useState('');
    const handleChange_Email = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const [tgl_lahir, setTgl_lahir] = React.useState('');
    const handleChange_Tgl_lahir = (event) => {
        event.preventDefault();
        setTgl_lahir(event.target.value);
    }

    const [asal, setAsal] = React.useState('');
    const handleChange_Asal = (event) => {
        event.preventDefault();
        setAsal(event.target.value);
    }

    const [tgl_tes, setTgl_tes] = React.useState('');
    const [datex, isDatex] = React.useState(false);
    const [sesiPsikotestKecermatan, setSesiPsikotestKecermatan] = React.useState(0);
    const [isSession, setIsSession] = React.useState();

    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() + 1;
    const date = getDate.getDate();
    const today = `${year}-${month}-${date}`;

    const UseDB = async() => {
		try {
			const db = await openDB();  // Tunggu hasil promise selesai
			console.info("Database berhasil dibuka:", db);
			// Anda dapat melanjutkan menggunakan db untuk operasi lebih lanjut
		} catch (error) {
			console.error("Terjadi kesalahan saat membuka database:", error);
		}
	}

    const indexedDB = () => {
		if(checkCompatibility) {
			UseDB();
			saveDataToDB();
            if ('storage' in navigator && 'persist' in navigator.storage) {
                navigator.storage.persist().then((isPersistent) => {
                    if (isPersistent) {
                        console.log('Penyimpanan persisten berhasil.');
                    } else {
                        console.log('Penyimpanan tidak persisten.');
                    }
                }).catch((error) => {
                    console.error('Gagal mengakses persist:', error);
                });
            } else {
                console.log('StorageManager API tidak didukung di browser ini');
            }
		}
	}

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
            if(localStorage.getItem('tgl_tes_peserta_psikotest')) {
                setTgl_tes(localStorage.getItem('tgl_tes_peserta_psikotest'));
                isDatex(true);
            }
            if(sessionStorage.getItem('sesi_psikotest_kecermatan')) {
                setSesiPsikotestKecermatan(sessionStorage.getItem('sesi_psikotest_kecermatan'));
                setIsSession(true);
            }
        }
        catch(e) {
            console.log(e);
            setLoading(false);
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
                    tgl_tes: tgl_tes
                }, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    headers: {
                        'X-API-KEY': process.env.APP_FAST_API_KEY,
                        'XSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json',
                        'tokenlogin': random('combwisp', 50),
                    }
                });

                console.info('response', response);
                if(parseInt(response.data.success) == 1) {
                    sessionStorage.setItem('id_peserta_psikotest', response.data.res);
                    sessionStorage.setItem('nama_peserta_psikotest', nama);
                    sessionStorage.setItem('no_identitas_peserta_psikotest', no_identitas);
                    sessionStorage.setItem('email_peserta_psikotest', email);
                    sessionStorage.setItem('tgl_lahir_peserta_psikotest', tgl_lahir);
                    sessionStorage.setItem('asal_peserta_psikotest', asal);
                    sessionStorage.setItem('sesi_psikotest_kecermatan', 1);
                    localStorage.setItem('tgl_tes_peserta_psikotest', today);
                    router.push(`/peserta/psikotest/kecermatan/`);
                }
                else if(response.data.success === 'datex') {
                    isDatex(true);
                    if(sessionStorage.getItem('sesi_psikotest_kecermatan') > 0 && sessionStorage.getItem('sesi_psikotest_kecermatan') < 6) {
                        isSession(true);
                        sessionStorage.setItem('sesi_psikotest_kecermatan', 1);
                    }
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

    const continueSession = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            sessionStorage.setItem(`sesi_psikotest_kecermatan`, 1);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom1`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom2`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom3`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom4`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom5`);
            router.push(`/peserta/psikotest/kecermatan/`);
        }
        catch(err) {
            console.error('Terjadi Kesalahan', err);
            setLoading(false);
        }
        setLoading(false);
    }

    const onBack = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            localStorage.removeItem(`ispeserta`);
            localStorage.removeItem(`tgl_tes_peserta_psikotest`);
            sessionStorage.removeItem(`sesi_psikotest_kecermatan`);
            sessionStorage.removeItem(`id_peserta_psikotest`);
            sessionStorage.removeItem(`nama_peserta_psikotest`);
            sessionStorage.removeItem(`no_identitas_peserta_psikotest`);
            sessionStorage.removeItem(`email_peserta_psikotest`);
            sessionStorage.removeItem(`tgl_lahir_peserta_psikotest`);
            sessionStorage.removeItem(`asal_peserta_psikotest`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom1`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom2`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom3`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom4`);
            sessionStorage.removeItem(`nilai_total_psikotest_kecermatan_kolom5`);
            router.push(`/`);
        }
        catch(err) {
            console.error('Terjadi Kesalahan', err);
            setLoading(false);
        }
        setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        indexedDB();
        checkData();
    }, []);

    if(loading) {
        return (
            <h2 className='text-center p-8'>
                <p><span className='font-bold text-2lg'>
                    Sedang memuat data... Mohon Harap Tunggu...
                </span></p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Formulir Peserta | Psikotest Online App`}
                pathURL={`/peserta`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
                onetime={true}
            />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Peserta`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer />
        );
    });

    const FormIsSession = () => {
        if(datex) {
            console.info('today', tgl_tes);
            console.info('tgl_tes', today);
            console.info('isSession', isSession);
            if(isSession) {
                console.info('sesiPsikotestKecermatan', sesiPsikotestKecermatan);
                return(
                    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" >
                        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                            <Box component="form"
                                sx={{ '& > :not(style)': { m: 0, p: 3, width: '100%' },
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    border: '3px solid white' ,
                                    borderRadius: 3,
                                    textAlign: 'center',
                                    p: 3
                                }}
                                onSubmit={(e) => continueSession(e)}
                                noValidate
                                autoComplete="off"
                            >
                                <h1 className='font-bold underline text-2lg uppercase'>Anda masih punya sesi!</h1>
                                <Box sx={{ m: 1 }}>
                                    <div>
                                        <Button variant="contained" size="large" fullWidth color="primary" type="submit">
                                            Lanjut
                                        </Button>
                                    </div>
                                    <div className='mt-4'>
                                        <Button variant="contained" size="large" fullWidth color="secondary" onClick={(e) => onBack(e)} rel='follow' title='Kembali' href='/' type="button">
                                            Kembali
                                        </Button>
                                    </div>
                                </Box>
                            </Box>
                        </div>
                    </div>
                );
            }
            else {
                return(
                    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" >
                        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
                            <Link rel='follow' title='Kembali' href='/' onClick={(e) => onBack(e)} sx={{ color: 'white' }}>
                                <h1 className='font-bold underline text-2lg uppercase'>
                                    Silahkan datang esok hari lagi!
                                </h1>
                                <h2 className='underline uppercase'>
                                    Silahkan Klik disini untuk kembali ke halaman Beranda
                                </h2>
                            </Link>
                        </div>
                    </div>
                );
            }
        }
    }

    if(datex) {
        return(
            <>
                <MemoHelmet />
                <MemoNavBreadcrumb />
                <FormIsSession />
                <MemoFooter />
            </>
        );
    }
    else {
        return (
            <>
                <MemoHelmet />
                <MemoNavBreadcrumb />
                <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" >
                    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                        <Box component="form"
                            sx={{ '& > :not(style)': { m: 0, p: 3, width: '100%' },
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '3px solid white' ,
                                borderRadius: 3,
                                textAlign: 'center',
                                p: 3
                            }}
                            onSubmit={(e) => submit(e)}
                            noValidate
                            autoComplete="off">
                            <h1 className="hidden">Halaman Formulir Peserta Psikotest</h1>
                            <span className="text-2xl text-bold uppercase font-bold">Peserta</span>
                            <TextField  type="text" id="nama" variant="outlined" required focused
                                        placeholder="Nama..." label="Nama..."
                                        onChange = {(event)=> handleChange_Nama(event)}
                                        defaultValue={nama}
                                        fullWidth sx={styledTextField} />
                            <TextField  type="number" id="no_identitas" variant="outlined" required focused
                                        placeholder="Nomor Identitas... (NIK / NIP / NISN)" label="Nomor Identitas... (NIK / NIP / NISN)"
                                        onChange = {(event)=> handleChange_No_identitas(event)}
                                        defaultValue={no_identitas}
                                        fullWidth sx={styledTextField} />
                            <TextField  type="text" id="Email" variant="outlined" focused
                                        placeholder="Email..." label="Email..."
                                        onChange = {(event)=> handleChange_Email(event)}
                                        defaultValue={email}
                                        fullWidth sx={styledTextField} />
                            <TextField  type="date" id="tgl_lahir" variant="outlined" required focused
                                        placeholder="Tanggal Lahir..." label="Tanggal Lahir..."
                                        onChange = {(event)=> handleChange_Tgl_lahir(event)}
                                        defaultValue={tgl_lahir}
                                        fullWidth sx={styledTextField} />
                            <TextField  type="text" id="asal" variant="outlined" focused
                                        placeholder="Asal..." label="Asal..."
                                        onChange = {(event)=> handleChange_Asal(event)}
                                        defaultValue={asal}
                                        fullWidth sx={styledTextField} />
                            <Box sx={{ m: 1 }}>
                                <div>
                                    <Button variant="contained" size="large" fullWidth color="primary" type="submit">
                                        Lanjut
                                    </Button>
                                </div>
                                <div className='mt-4'>
                                    <Button variant="contained" size="large" fullWidth color="secondary" onClick={(e) => onBack(e)} rel="follow" title="Beranda" href="/" type="button">
                                        Kembali
                                    </Button>
                                </div>
                            </Box>
                        </Box>
                    </div>
                </div>
                <MemoFooter />
            </>
        );
    }
}