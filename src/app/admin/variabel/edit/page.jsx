// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '../../../layoutadmindetil';
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

export default function EditVariabel() {
    const router = useRouter();
    const [nid, setNid] = React.useState(fun.readable(sessionStorage.getItem('variabel_id')));
    
    const [nvariabel, setNvariabel] = React.useState('');
    const handleChange_Nvariable = (event) => {
        setNvariabel(event.target.value);
    };

    const [nvalues, setNvalues] = React.useState();
    const handleChange_Nvalues = (event) => {
        setNvalues(event.target.value);
    };

    const getData = () => {
        try {
            // setNid(fun.readable(sessionStorage.getItem('variabel_id')));
            setNvariabel(fun.readable(sessionStorage.getItem('variabel_variabel')));
            setNvalues(fun.readable(sessionStorage.getItem('variabel_values')));
        } catch (err) {
            console.error(err);
            return err;
        }
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
                values: nvalues,
                tokenlogin: fun.random('combwisp', 20)
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
                sessionStorage.removeItem('variabel_id');
                sessionStorage.removeItem('variabel_variabel');
                sessionStorage.removeItem('variabel_values');
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
            sessionStorage.removeItem('variabel_id');
            sessionStorage.removeItem('variabel_variabel');
            sessionStorage.removeItem('variabel_values');
            return router.push('/admin/variabel');
        }
        catch(err) {
            console.log('Terjadi Kesalahan Membatalkan Update Variabel', err);
        }
    };
    
    React.useEffect(() => {
        getData();
    }, []);

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Edit Variabel | Admin | Psikotest`}
                description={`Halaman Edit Variabel dengan otoritas sebagai Admin.`}
                pathURL={`admin/variabel/edit`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Edit Variabel" />
        );
    });

    return (
        <Layoutadmindetil>
            <MemoHelmet />
            <MemoAppbarku />
            <main className="p-5 mb-14">
                <Box component="form"
                    sx={{ '& > :not(style)': { m: 0, p: 1, width: '100%' },
                        p: 3
                    }}
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
                            <Button variant="contained" size="large" fullWidth color="secondary" onClick={(e) => cancel(e)} type="button">
                                Batal
                            </Button>
                        </div>
                    </Box>
                </Box>
            </main>
        </Layoutadmindetil>
    )
}