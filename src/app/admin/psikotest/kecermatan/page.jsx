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

export default function PsikotestKecermatan() {
    const router = useRouter();
    const [dataPsikotestKecermatan, setDataPsikotestKecermatan] = React.useState([]);

    const getDataPsikotestKecermatan = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan-kolompertanyaan`);
            setDataPsikotestKecermatan(response.data.data);
        } catch (err) {
            return err;
            // console.error(err);
        }
    }

    React.useEffect(() => {
        getDataPsikotestKecermatan();
    }, []);

    const onDetil = (id) => {
        sessionStorage.setItem('psikotest_kecermatan_id', id);
        router.push(`/admin/psikotest/kecermatan/detil/?page=1`);
    }

    const opencloseEdit = (varid) => {
        document.getElementById(varid).classList.toggle('hidden');
    }

    console.log('dataPsikotestKecermatan', dataPsikotestKecermatan);
    return (
        <Layoutadmin>
            <Myhelmet
                title={`Psikotest Kecermatan | Admin | Psikotest`}
                description={`Halaman Psikotest Kecermatan dengan otoritas sebagai Admin.`}
                pathURL={`admin/psikotest/kecermatan`}
            />
            <Appbarku headTitle="Psikotest Kecermatan" isback={true} url={`/admin/psikotest`} />
            <main className="p-5 mb-14">
                <div>
                    {dataPsikotestKecermatan.map((data, index) => (
                        <div key={index} className='border-b-2 p-3'>
                            <div className="static mt-3 flex flex-row justify-between">
                                <div className="order-first">
                                    <Link onClick={() => onDetil(data.id)}>
                                        <p>{data.kolom_x}</p>
                                    </Link>
                                </div>
                                <div className="order-last"></div>
                            </div>
                        </div>
                    ))}
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