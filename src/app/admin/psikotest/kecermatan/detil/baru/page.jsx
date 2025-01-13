// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client'
import Layoutadmindetil from '@/components/layout/Layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

const styledTextField = {
    '& .MuiOutlinedInput-notchedOutline': {
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
        borderColor: 'rgba(000, 000, 000, 0.8)', // warna hover
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white', // warna hover
    },
    '& marginTop': 5
}

export default function PsikotestKecermatanDetilBaru() {
    const router = useRouter();
    const [pkid, setPkid] = React.useState(sessionStorage.getItem('admin_psikotest_kecermatan_id'));
    const [lastpage, setLastpage] = React.useState(sessionStorage.getItem('admin_psikotest_kecermatan_tabellastpage'));

    const [soalA, setSoalA] = React.useState(0);
    const handleChange_soalA = (event) => {
        setSoalA(event.target.value);
        console.log('soalA', soalA);
    };

    const [soalB, setSoalB] = React.useState(0);
    const handleChange_soalB = (event) => {
        setSoalB(event.target.value);
        console.log('soalB', soalB);
    };

    const [soalC, setSoalC] = React.useState(0);
    const handleChange_soalC = (event) => {
        setSoalC(event.target.value);
        console.log('soalC', soalC);
    };

    const [soalD, setSoalD] = React.useState(0);
    const handleChange_soalD = (event) => {
        setSoalD(event.target.value);
        console.log('soalD', soalD);
    };

    const [jawaban, setJawaban] = React.useState(0);
    const handleChange_jawaban = (event) => {
        setJawaban(event.target.value);
        console.log('jawaban', jawaban);
    };

    const getData = () => {
        try {
            setPkid(sessionStorage.getItem('admin_psikotest_kecermatan_id'));
            setLastpage(sessionStorage.getItem('admin_psikotest_kecermatan_tabellastpage'));
        }
        catch(e) {
            console.log(e);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);

    const submit = async(e) => {
        e.preventDefault();
        try {
            const soaljawaban = {
                soal: [[parseInt(soalA), parseInt(soalB), parseInt(soalC), parseInt(soalD)]],
                jawaban: parseInt(jawaban)
            };
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${pkid}`, {
                soal_jawaban: soaljawaban,
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
            if(response.data.success) {
                return router.push(`/admin/psikotest/kecermatan/detil/?page=${lastpage}`);
            }
            else {
                console.log('response', response);
                return alert('Terjadi Kesalahan Variabel');
            }
        }
        catch(er) {
            console.log('Terjadi Kesalahan Mengiri Data Baru', er);
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        return router.push(`/admin/psikotest/kecermatan/detil/?page=${lastpage}`);
    };

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Detil Psikotest Kecermatan Baru | Admin | Psikotest`}
                pathURL={`admin/psikotest/kecermatan/detil/baru`}
                robots={`none, nosnippet, noarchive, notranslate, noimageindex`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Detil Psikotest Kecermatan" />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Psikotest / Kecermatan / Detil / Baru`} hidden={`hidden`} />
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
            <MemoAppbarku />
            <MemoNavBreadcrumb />
            <div className="p-5 mb-14">
                <h1 className='hidden'>Halaman Psikotest Kecermatan Detil Baru | Admin </h1>
                <h2 className="font-bold text-center text-lg">Tambah Soal dan Jawaban Psikotest Kecermatan ${kolom_x} Baru</h2>
                <h3 className='mt-4'>
                    <span className='font-bold mr-2'>Soal :</span>
                    [
                        <span className='ml-2 mr-2'>{soalA}</span>
                        <span className='mr-2'>{soalB}</span>
                        <span className='mr-2'>{soalC}</span>
                        <span className='mr-2'>{soalD}</span>
                    ]
                </h3>
                <h3 className='mt-2'><span className='font-bold'>Jawaban :</span> {jawaban}</h3>
                <Box component="form"
                    sx={{ '& > :not(style)': { m: 0, p: 1, width: '100%' } }}
                    onSubmit={(e) => submit(e)}
                    noValidate
                    autoComplete="off">
                    <TextField id={`soala`} label="Soal A"
                                onChange={handleChange_soalA} focused
                                defaultValue={soalA} variant="outlined"
                                sx={styledTextField} />
                    <TextField id={`soalb`} label="Soal B"
                                onChange={handleChange_soalB} focused
                                defaultValue={soalB} variant="outlined"
                                sx={styledTextField} />
                    <TextField id={`soalc`} label="Soal C"
                                onChange={handleChange_soalC} focused
                                defaultValue={soalC} variant="outlined"
                                sx={styledTextField} />
                    <TextField id={`soald`} label="Soal D"
                                onChange={handleChange_soalD} focused
                                defaultValue={soalD} variant="outlined"
                                sx={styledTextField} />
                    <TextField id={`jawaban`} label="Jawaban"
                                onChange={handleChange_jawaban} focused
                                defaultValue={jawaban} variant="outlined"
                                sx={styledTextField} />
                    <Box sx={{ m: 1 }}>
                        <div>
                            <Button variant="contained" size="large" color="primary" fullWidth type="submit">
                                Simpan
                            </Button>
                        </div>
                        <div className="mt-4">
                            <Button variant="contained" size="large" color="secondary" fullWidth onClick={(e) => cancel(e)} sx={{marginTop: 2}} type="button">
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