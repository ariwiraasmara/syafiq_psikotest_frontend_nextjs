// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../layoutadmin';
import axios from 'axios';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Helmet from '@/components/Helmet';
import Appbarku from '@/components/Appbarku';
import ListPeserta from '@/components/ListPeserta';
  
export default function Dashboard(props) {

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
    }, []);
    // console.log(dataPeserta);

    return (
        <Layoutadmin>
            <Helmet title="Dashboard | Psikotest Online App"
                    description="Psikotest Online App"
                    keywords="Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind"
            />
            <Appbarku headTitle="Dashboard" />
            
            <main className="p-5 mb-14">
                <div>
                    <h1 className="text-xl font-bold">Selamat Datang</h1>
                </div>

                <div className="mt-4">
                    <p><span className="font-bold">Daftar Tes Psikotest Terbaru</span></p>
                    <ListPeserta listpeserta={dataPeserta} />
                </div>
            </main>
        </Layoutadmin>
    )
}