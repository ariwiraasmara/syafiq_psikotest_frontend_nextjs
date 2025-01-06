// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../../layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import dynamic from 'next/dynamic';

import AddIcon from '@mui/icons-material/Add';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import fun from '@/libraries/myfunction';

export default function PsikotestKecermatan() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [dataPsikotestKecermatan, setDataPsikotestKecermatan] = React.useState([]);

    const getDataPsikotestKecermatan = async () => {
        setLoading(true);
        try {
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan-kolompertanyaan`, {
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
            setDataPsikotestKecermatan(response.data.data);
        } catch (err) {
            console.error(err);
            return err;
        }
        setLoading(false);
    }

    React.useEffect(() => {
        getDataPsikotestKecermatan();
    }, []);

    const onDetil = (id) => {
        setLoading(true);
        sessionStorage.setItem('psikotest_kecermatan_id', id);
        router.push(`/admin/psikotest/kecermatan/detil/?page=1`);
    }

    const opencloseEdit = (varid) => {
        document.getElementById(varid).classList.toggle('hidden');
    }

    console.log('dataPsikotestKecermatan', dataPsikotestKecermatan);

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Psikotest Kecermatan | Admin | Psikotest`}
                description={`Halaman Psikotest Kecermatan dengan otoritas sebagai Admin.`}
                pathURL={`admin/psikotest/kecermatan`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Psikotest Kecermatan" isback={true} url={`/admin/psikotest`} />
        );
    });

    return (
        <Layoutadmin>
            <MemoHelmet />
            <MemoAppbarku />
            <main className="p-5 mb-14">
                <div>
                    {loading ? (
                        <div className='text-center'>
                            <p><span className='font-bold text-2lg'>Loading...</span></p>
                            <p><span className='font-bold text-2lg'>Sedang memproses...</span></p>
                        </div>
                    ) : (
                        dataPsikotestKecermatan.map((data, index) => (
                            <Link onClick={() => onDetil(data.id)}>
                                <div key={index} className='border-b-2 p-3'>
                                    <div className="static mt-3 flex flex-row justify-between">
                                        <div className="order-first">
                                            <p>{data.kolom_x}</p>
                                        </div>
                                        <div className="order-last"></div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
            <Fab sx={{
                position: 'absolute',
                bottom: '13%',
                right: '3%',
            }} color="primary" aria-label="add" onClick={() => opencloseEdit('newdata')} >
                <AddIcon />
            </Fab>
        </Layoutadmin>
    )
}