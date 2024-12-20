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
    const [nid, setNid] = React.useState(0);
    
    const [nvariabel, setNvariabel] = React.useState('');
    const handleChange_Nvariable = (event) => {
        setNvariabel(event.target.value);
        console.log(nvariabel);
    };

    const [nvalues, setNvalues] = React.useState();
    const handleChange_Nvalues = (event) => {
        setNvalues(event.target.value);
        console.log(nvalues);
    };

    const getData = () => {
        try {
            setNid(fun.readable(sessionStorage.getItem('variabel_id')));
            setNvariabel(fun.readable(sessionStorage.getItem('variabel_variabel')));
            setNvalues(fun.readable(sessionStorage.getItem('variabel_values')));
        } catch (err) {
            return err;
            // console.error(err);
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`);
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/${nid}`, {
                variabel: nvariabel,
                values: nvalues,
                tokenlogin: fun.random('combwisp', 20)
            }, {
                headers: {
                    'XSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
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

    return (
        <Layoutadmindetil>
            <Myhelmet
                title='Variabel | Admin | Psikotest'
                description='Psikotest Online App'
                keywords='Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind'
                pathURL={`${process.env.NEXT_PUBLIC_FRONTEND}/admin/variabel/edit`}
            />
            <Appbarku headTitle="Edit Variabel" />
            <main className="p-5 mb-14">
                <Box component="form"
                    sx={{ '& > :not(style)': { m: 0, p: 1, width: '50%' },
                        p: 3
                    }}
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
                    <Box sx={{ '& button': { m: 1, width: '200%' } }}>
                        <Button variant="contained" size="large" color="primary" onClick={(e) => submit(e)}>
                            Simpan
                        </Button>
                        <Button variant="contained" size="large" color="secondary" onClick={(e) => cancel(e)}>
                            Batal
                        </Button>
                    </Box>
                </Box>
            </main>
        </Layoutadmindetil>
    )
}