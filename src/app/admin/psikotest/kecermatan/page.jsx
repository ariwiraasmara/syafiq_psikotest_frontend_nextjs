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

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';

const linkStyle = {
    color: '#fff'
}

const opencloseEdit = (varid) => {
    document.getElementById(varid).classList.toggle('hidden');
}

export default function PsikotestKecermatan(props) {

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
        sessionStorage.setItem('kecermatan_id', id);
        router.push(`/admin/psikotest/kecermatan/detil`);
    } 

    console.log('dataPsikotestKecermatan', dataPsikotestKecermatan);
    return (
        <Layoutadmin>
            <Myhelmet
                title={`Psikotest Kecermatan | Admin | Psikotest`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
            />
            <Appbarku headTitle="Psikotest Kecermatan" />
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