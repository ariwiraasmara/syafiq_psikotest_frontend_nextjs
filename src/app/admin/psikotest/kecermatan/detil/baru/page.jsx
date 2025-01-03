'use client'
import Layoutadmindetil from '../../../../../layoutadmindetil';
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
    const [pkid, setPkid] = React.useState(sessionStorage.getItem('psikotest_kecermatan_id'));
    const [lastpage, setLastpage] = React.useState(sessionStorage.getItem('psikotest_kecermatan_tabellastpage'));

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
            setPkid(sessionStorage.getItem('psikotest_kecermatan_id'));
            setLastpage(sessionStorage.getItem('psikotest_kecermatan_tabellastpage'));
        }
        catch(e) {
            console.log(e);
        }
    }

    React.useEffect(() => {
        // getData();
    });

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
                    'XSRF-TOKEN': csrfToken,
                    'islogin' : fun.readable(localStorage.getItem('islogin')),
                    'isadmin' : fun.readable(localStorage.getItem('isadmin')),
                    'Authorization': `Bearer ${fun.readable(localStorage.getItem('pat'))}`,
                    'remember-token': fun.readable(localStorage.getItem('remember-token')),
                    'tokenlogin': fun.random('combwisp', 50),
                    'email' : fun.readable(localStorage.getItem('email')),
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
                description={`Halaman Menambah data baru pada Detil Kecermatan dengan otoritas sebagai Admin.`}
                pathURL={`admin/psikotest/kecermatan/detil/edit`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Detil Psikotest Kecermatan" />
        );
    });

    return(
        <Layoutadmindetil>
            <MemoHelmet />
            <MemoAppbarku />
            <main className="p-5 mb-14">
                <div className="font-bold text-center text-lg">Data Baru</div>
                <Box component="form"
                    sx={{ '& > :not(style)': { m: 0, p: 1, width: '100%' },
                        p: 3
                    }}
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
            </main>
        </Layoutadmindetil>
    );
}