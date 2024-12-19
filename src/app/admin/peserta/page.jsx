// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';
import ListPeserta from '@/components/ListPeserta';
import encodeHtmlEntities from '@/libraries/myfunction';

const linkStyle = {
    color: '#fff'
}
  
export default function Peserta(props) {
    const [dataPeserta, setDataPeserta] = React.useState([]);
    const getDataPeserta = async () => {
        try {
            const cacheResponse = await caches.match('peserta');
            
            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                setDataPeserta(cachedData); // Menyimpan data dari cache ke state
                
                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta`);
                    const apiData = apiResponse.data.data;
                    
                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');
                        
                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('peserta');
                        await cache.delete('peserta');
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('peserta', newResponse);
                        // console.log('Data baru disimpan ke cache');
                        
                        // Update dataPeserta dengan data terbaru dari API
                        setDataPeserta(apiData);
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
                }
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.log('Data tidak ditemukan di cache');
                
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta`);
                    const data = response.data.data;
                    setDataPeserta(data);  // Menyimpan data ke state
                    
                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('peserta');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('peserta', cacheResponse);
                    console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat memeriksa cache:', error);
        }
    };

    React.useEffect(() => {
        getDataPeserta();
    }, []);
    // console.log(dataPeserta);

    return (
        <Layoutadmin>
            <Myhelmet
                title={`Peserta | Admin | Psikotest Online App`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
            />
            <Appbarku headTitle={'Peserta'} />
            <main className="p-5 mb-14">
                <ListPeserta listpeserta={dataPeserta} />
            </main>
        </Layoutadmin>
    )
}