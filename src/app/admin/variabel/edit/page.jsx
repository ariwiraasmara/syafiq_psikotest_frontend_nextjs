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

export default function EditVariabel() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [nid, setNid] = React.useState(readable(sessionStorage.getItem('admin_variabel_id')));
    
    const [nvariabel, setNvariabel] = React.useState('');
    const handleChange_Nvariable = (event) => {
        event.preventDefault();
        setNvariabel(event.target.value);
    };

    const [nvalues, setNvalues] = React.useState();
    const handleChange_Nvalues = (event) => {
        event.preventDefault();
        setNvalues(event.target.value);
    };

    const getData = () => {
        setLoading(true);
        try {
            // setNid(readable(sessionStorage.getItem('admin_variabel_id')));
            setNvariabel(readable(sessionStorage.getItem('admin_variabel_variabel')));
            setNvalues(readable(sessionStorage.getItem('admin_variabel_values')));
        } catch (err) {
            console.error('Eror getData Edit Variabel', err);
        }
        setLoading(false);
    }

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
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/${nid}`, {
                variabel: nvariabel,
                values: nvalues
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
                sessionStorage.removeItem('admin_variabel_id');
                sessionStorage.removeItem('admin_variabel_variabel');
                sessionStorage.removeItem('admin_variabel_values');
                return router.push('/admin/variabel');
            }
            else {
                console.log('response', response);
                return alert('Terjadi Kesalahan Variabel');
            }
        }
        catch(er) {
            console.log('Terjadi Kesalahan Mengirim Data Update Variabel', er);
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        try {
            sessionStorage.removeItem('admin_variabel_id');
            sessionStorage.removeItem('admin_variabel_variabel');
            sessionStorage.removeItem('admin_variabel_values');
            return router.push('/admin/variabel');
        }
        catch(err) {
            console.log('Terjadi Kesalahan Membatalkan Update Variabel', err);
        }
    };
    
    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Edit Variabel | Admin | Psikotest`}
                pathURL={`/admin/variabel/edit`}
                robots={`none, nosnippet, noarchive, notranslate, noimageindex`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Edit Variabel" />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Variabel / Edit`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer hidden={`hidden`} />
        );
    });

    return (
    <>
        <Layoutadmindetil>
            <MemoHelmet />
            <MemoNavBreadcrumb />
            <MemoAppbarku />
            <div className="p-5 mb-14">
                <h1 className='hidden'>Halaman Edit Variabel | Admin</h1>
                <Box component="form"
                    sx={{ '& > :not(style)': { m: 0, p: 1, width: '100%' } }}
                    onSubmit={(e) => submit(e)}
                    noValidate
                    autoComplete="off">
                    <TextField  type="text" id="variabel" variant="outlined" focused
                                placeholder="Variabel..." label="Variabel..."
                                fullWidth sx={styledTextField}
                                onChange={handleChange_Nvariable}
                                defaultValue={nvariabel} />
                    <TextField  type="text" id="values" variant="outlined" focused
                                placeholder="Nilai..." label="Nilai..."
                                fullWidth sx={styledTextField}
                                onChange={handleChange_Nvalues}
                                defaultValue={nvalues} />
                    <Box sx={{ m: 1 }}>
                        <div>
                            <Button variant="contained" size="large" fullWidth color="primary" type="submit">
                                Simpan
                            </Button>
                        </div>
                        <div className="mt-4">
                            <Button variant="contained" size="large" fullWidth color="secondary" onClick={(e) => cancel(e)} rel='follow' title='Kembali' href='/admin/variabel' type="button">
                                Batal
                            </Button>
                        </div>
                    </Box>
                </Box>
            </div>
            <MemoFooter />
        </Layoutadmindetil>
    </>
    )
}