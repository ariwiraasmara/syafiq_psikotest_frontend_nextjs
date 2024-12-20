// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../layoutadmin';
import axios from 'axios';
import * as React from 'react';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';
import ListPeserta from '@/components/ListPeserta';
  
export default function AdminDashboard() {
    const [nama, setNama] =  React.useState('');
    const [dataPeserta, setDataPeserta] = React.useState([]);
    const getDataPeserta = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta`);
            setDataPeserta(response.data.data);
        } catch (err) {
            return err;
            // console.error(err);
        }
    }
    React.useEffect(() => {
        getDataPeserta();
        setNama(localStorage.getItem('nama'));
    }, [nama]);
    // console.log(dataPeserta);

    return (
        <Layoutadmin>
            <Myhelmet
                title={`Dashboard | Psikotest Online App`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`/admin/dashboard`}
            />
            <Appbarku headTitle="Dashboard" />
            
            <main className="p-4 mb-14">
                <div>
                    <h1 className="text-xl font-bold">Selamat Datang, {nama}</h1>
                </div>

                <div className="mt-4">
                    <p><span className="font-bold">Daftar Tes Psikotest Terbaru</span></p>
                    <ListPeserta listpeserta={dataPeserta} />
                </div>
            </main>
        </Layoutadmin>
    )
}