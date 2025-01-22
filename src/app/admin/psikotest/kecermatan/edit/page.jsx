// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '@/components/layout/Layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

export default function PsikotestKecermatan() {
    const router = useRouter();
    const textColor = localStorage.getItem('text-color');
    const textColorRGB = localStorage.getItem('text-color-rgb');
    const borderColor = localStorage.getItem('border-color');
    const borderColorRGB = localStorage.getItem('border-color-rgb');
    const [loading, setLoading] = React.useState(false);
    const [nid, setNid] = React.useState(readable(sessionStorage.getItem('admin_psikotest_kecermatan_id')));
    const [kolom_x, setKolom_x] = React.useState(readable(sessionStorage.getItem('admin_psikotest_kecermatan_kolom_x')));
    
    const styledTextField = {
        '& .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${borderColor}`,
            color: textColorRGB,
        },
        '& .MuiInputLabel-root': {
            color: textColorRGB,
        },
        '& .MuiOutlinedInput-input': {
            color: textColorRGB,
        },
        '& .MuiOutlinedInput-placeholder': {
            color: textColorRGB,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor, // warna hover
        },
        '&:hover .MuiInputLabel-root': {
            color: textColorRGB, // warna hover
        },
    }

    const [nilai_A, setNilai_A] = React.useState(0);
    const handleChange_nilai_A = (event) => {
        event.preventDefault();
        setNilai_A(event.target.value);
    }
    
    const [nilai_B, setNilai_B] = React.useState(0);
    const handleChange_nilai_B = (event) => {
        event.preventDefault();
        setNilai_B(event.target.value);
    }
    
    const [nilai_C, setNilai_C] = React.useState(0);
    const handleChange_nilai_C = (event) => {
        event.preventDefault();
        setNilai_C(event.target.value);
    }
    
    const [nilai_D, setNilai_D] = React.useState(0);
    const handleChange_nilai_D = (event) => {
        event.preventDefault();
        setNilai_D(event.target.value);
    }
    
    const [nilai_E, setNilai_E] = React.useState(0);
    const handleChange_nilai_E = (event) => {
        event.preventDefault();
        setNilai_E(event.target.value);
    }

    const getData = async() => {
        setLoading(true);
        try {
            // setNid(sessionStorage('admin_psikotest_kecermatan_id'));
            // setKolom_x(sessionStorage('admin_psikotest_kecermatan_kolom_x'));
            setNilai_A(sessionStorage.getItem('admin_psikotest_kecermatan_nilai_A'));
            setNilai_B(sessionStorage.getItem('admin_psikotest_kecermatan_nilai_B'));
            setNilai_C(sessionStorage.getItem('admin_psikotest_kecermatan_nilai_C'));
            setNilai_D(sessionStorage.getItem('admin_psikotest_kecermatan_nilai_D'));
            setNilai_E(sessionStorage.getItem('admin_psikotest_kecermatan_nilai_E'));
        }
        catch(err) {
            console.error('Terjadi Error Kesalahan PsikotestKecermatanEdit-getData', err);
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
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

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/kolompertanyaan/${nid}`, {
                nilai_A: nilai_A,
                nilai_B: nilai_B,
                nilai_C: nilai_C,
                nilai_D: nilai_D,
                nilai_E: nilai_E,
            }, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.APP_FAST_API_KEY,
                    'XSRF-TOKEN': csrfToken,
                    'islogin' : readable(localStorage.getItem('islogin')),
                    'isadmin' : readable(localStorage.getItem('isadmin')),
                    'Authorization': `Bearer ${readable(localStorage.getItem('pat'))}`,
                    'remember-token': readable(localStorage.getItem('remember-token')),
                    'tokenlogin': random('combwisp', 50),
                    'email' : readable(localStorage.getItem('email')),
                    '--unique--': 'I am unique!',
                    'isvalid': 'VALID!',
                    'isallowed': true,
                    'key': 'key',
                    'values': 'values',
                    'isdumb': 'no',
                    'challenger': 'of course',
                    'pranked': 'absolutely'
                }
            });
            // console.log('response', response);
            if(response.data.success) {
                router.push('/admin/psikotest/kecermatan');
            }
            else {
                alert('Terjadi Error : Tidak Dapat Menyimpan Data!');
            }
        }
        catch(er) {
            console.log('Terjadi Error Kesalahan PsikotestKecermatanEdit-submit', er);
        }
        setLoading(false);
    };

    const cancel = (e) => {
        e.preventDefault();
        try {
            sessionStorage.removeItem('psikotest_kecermatan_id');
            sessionStorage.removeItem('psikotest_kecermatan_kolom_x');
            sessionStorage.removeItem('psikotest_kecermatan_nilai_A');
            sessionStorage.removeItem('psikotest_kecermatan_nilai_B');
            sessionStorage.removeItem('psikotest_kecermatan_nilai_C');
            sessionStorage.removeItem('psikotest_kecermatan_nilai_D');
            sessionStorage.removeItem('psikotest_kecermatan_nilai_E');
            return router.push('/admin/psikotest/kecermatan');
        }
        catch(err) {
            console.info('Terjadi Error Kesalahan PsikotestKecermatanEdit-cancel:', err);
        }
    };
    
    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Edit Psikotest Kecermatan | Admin | Psikotest`}
                pathURL={`/admin/psikotest/kecermatan/edit`}
                robots={`none, nosnippet, noarchive, notranslate, noimageindex`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Edit Psikotest Kecermatan" />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Psikotest/ Kecermatan / Edit`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer hidden={`hidden`} />
        );
    });

    return(
    <>
        <Layoutadmindetil>
            <MemoHelmet />
            <MemoNavBreadcrumb />
            <MemoAppbarku />
            <div className={`p-4 ${borderColor}`}>
                <h1 className='hidden'>Halaman Tambah Psikotest Kecermatan Baru | Admin</h1>
                <h2 className={`text-${textColor}`}>
                    <span className='font-bold'>Edit Data Kolom : {kolom_x}</span>
                </h2>
                <Box component="form"
                    sx={{ '& > :not(style)': { marginTop: 3, p: 0, width: '100%' } }}
                    onSubmit={(e) => submit(e)}
                    noValidate
                    autoComplete="off">
                    <TextField  type="number" id="nilai_a" variant="outlined" focused
                                placeholder="Nilai A..." label="Nilai A..."
                                fullWidth sx={styledTextField}
                                onChange={handleChange_nilai_A}
                                defaultValue={nilai_A} />
                    <TextField  type="number" id="nilai_b" variant="outlined" focused
                                placeholder="Nilai B..." label="Nilai B..."
                                fullWidth sx={styledTextField}
                                onChange={handleChange_nilai_B}
                                defaultValue={nilai_B} />
                    <TextField  type="number" id="nilai_c" variant="outlined" focused
                                placeholder="Nilai C..." label="Nilai C..."
                                fullWidth sx={styledTextField}
                                onChange={handleChange_nilai_C}
                                defaultValue={nilai_C} />
                    <TextField  type="number" id="nilai_d" variant="outlined" focused
                                placeholder="Nilai D..." label="Nilai D..."
                                fullWidth sx={styledTextField}
                                onChange={handleChange_nilai_D}
                                defaultValue={nilai_D} />
                    <TextField  type="number" id="nilai_e" variant="outlined" focused
                                placeholder="Nilai E..." label="Nilai E..."
                                fullWidth sx={styledTextField}
                                onChange={handleChange_nilai_E}
                                defaultValue={nilai_E} />
                    <Box>
                        <div>
                            <Button variant="contained" size="large" fullWidth color="primary" type="submit">
                                Simpan
                            </Button>
                        </div>
                        <div className="mt-4">
                            <Button variant="contained" size="large" fullWidth color="secondary" onClick={(e) => cancel(e)} rel='follow' title='Kembali' href='/admin/psikotest/kecermatan' type="button">
                                Batal
                            </Button>
                        </div>
                    </Box>
                </Box>
            </div>
            <MemoFooter />
        </Layoutadmindetil>
    </>
    );
}