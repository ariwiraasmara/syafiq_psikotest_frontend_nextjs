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

export default function PsikotestKecermatanDetilEdit() {
    const router = useRouter();
    const textColor = localStorage.getItem('text-color');
    const textColorRGB = localStorage.getItem('text-color-rgb');
    const borderColor = localStorage.getItem('border-color');
    const borderColorRGB = localStorage.getItem('border-color-rgb');
    const [loading, setLoading] = React.useState(false);
    const [pkid, setPkid] = React.useState(sessionStorage.getItem('admin_psikotest_kecermatan_id'));
    const [lastpage, setLastpage] = React.useState(sessionStorage.getItem('admin_psikotest_kecermatan_tabellastpage'));

    const [idsoal, setIdsoal] = React.useState(0);
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

    const getData = () => {
        setLoading(true);
        try {
            // setPkid(sessionStorage.getItem('admin_psikotest_kecermatan_id'));
            // setLastpage(sessionStorage.getItem('admin_psikotest_kecermatan_tabellastpage'));
            setIdsoal(sessionStorage.getItem('admin_psikotest_kecermatan_idsoal'));
            setSoalA(sessionStorage.getItem('admin_psikotest_kecermatan_soalA'));
            setSoalB(sessionStorage.getItem('admin_psikotest_kecermatan_soalB'));
            setSoalC(sessionStorage.getItem('admin_psikotest_kecermatan_soalC'));
            setSoalD(sessionStorage.getItem('admin_psikotest_kecermatan_soalD'));
            setJawaban(sessionStorage.getItem('admin_psikotest_kecermatan_jawaban'));
        }
        catch(err) {
            console.info('Terjadi Error PsikotestKecermatanDetilEdit-getData:', err);
        }
        setLoading(false);
    }

    const submit = async(e) => {
        e.preventDefault();
        setLoading(true);
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
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${pkid}/${idsoal}`, {
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
            // console.info('response', response);
            if(response.data.success) {
                sessionStorage.removeItem('admin_psikotest_kecermatan_idsoal');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalA');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalB');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalC');
                sessionStorage.removeItem('admin_psikotest_kecermatan_soalD');
                sessionStorage.removeItem('admin_psikotest_kecermatan_jawaban');
                return router.push(`/admin/psikotest/kecermatan/detil?page=${lastpage}`);
            }
            else {
                alert('Terjadi Error: Tidak Dapat Menyimpan Data!');
            }
        }
        catch(err) {
            console.info('Terjadi Error PsikotestKecermatanDetilEdit-submit', err);
        }
        setLoading(false);
    };

    const cancel = (e) => {
        e.preventDefault();
        setLoading(true);
        sessionStorage.removeItem('admin_psikotest_kecermatan_idsoal');
        sessionStorage.removeItem('admin_psikotest_kecermatan_soalA');
        sessionStorage.removeItem('admin_psikotest_kecermatan_soalB');
        sessionStorage.removeItem('admin_psikotest_kecermatan_soalC');
        sessionStorage.removeItem('admin_psikotest_kecermatan_soalD');
        sessionStorage.removeItem('admin_psikotest_kecermatan_jawaban');
        router.push(`/admin/psikotest/kecermatan/detil/?page=${lastpage}`);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);

    if(loading) {
        return (
            <h2 className={`text-center p-8 font-bold text-2lg text-${textColor}`}>
                <p>Sedang memuat data...<br/></p>
                <p>Mohon Harap Tunggu...</p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Edit Detil Psikotest Kecermatan | Admin | Psikotest`}
                pathURL={`admin/psikotest/kecermatan/detil/edit`}
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
            <NavBreadcrumb content={`Admin / Psikotest / Kecermatan / Detil / Edit`} hidden={`hidden`} />
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
            <div className={`p-4 text-${textColor}`}>
                <h1 className='hidden'>Halaman Edit Psikotest Kecermatan Detil | Admin </h1>
                <h2 className="font-bold text-center">Edit Soal dan Jawaban Psikotest Kecermatan Kolom {pkid} </h2>
                <div className={`font-bold mt-2 text-${textColor}`}>
                    ID : {idsoal}
                    <h3 className='mt-0'>
                        <span className='font-bold mr-2'>Soal :</span>
                        [
                            <span className='ml-2 mr-2'>{soalA}</span>
                            <span className='mr-2'>{soalB}</span>
                            <span className='mr-2'>{soalC}</span>
                            <span className='mr-2'>{soalD}</span>
                        ]
                    </h3>
                    <h3 className='mt-0'>
                        <span className='font-bold'>Jawaban :</span> {jawaban}
                    </h3>
                </div>
                <Box component="form"
                    sx={{ '& > :not(style)': { marginTop: 3, p: 0, width: '100%' } }}
                    onSubmit={(e) => submit(e)}
                    noValidate
                    autoComplete="off">
                    <TextField type="number" id={`soala`} label="Soal A"
                                onChange={handleChange_soalA} focused
                                defaultValue={soalA} variant="outlined"
                                sx={styledTextField} />
                    <TextField type="number" id={`soalb`} label="Soal B"
                                onChange={handleChange_soalB} focused
                                defaultValue={soalB} variant="outlined"
                                sx={styledTextField} />
                    <TextField type="number" id={`soalc`} label="Soal C"
                                onChange={handleChange_soalC} focused
                                defaultValue={soalC} variant="outlined"
                                sx={styledTextField} />
                    <TextField type="number" id={`soald`} label="Soal D"
                                onChange={handleChange_soalD} focused
                                defaultValue={soalD} variant="outlined"
                                sx={styledTextField} />
                    <TextField type="number" id={`jawaban`} label="Jawaban"
                                onChange={handleChange_jawaban} focused
                                defaultValue={jawaban} variant="outlined"
                                sx={styledTextField} />
                    <Box>
                        <div>
                            <Button variant="contained" size="large" color="primary" fullWidth type="submit" >
                                Simpan
                            </Button>
                        </div>
                        <div className="mt-2">
                            <Button variant="contained" size="large" color="secondary" fullWidth onClick={(e) => cancel(e)} sx={{marginTop: 2}} type="button" >
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