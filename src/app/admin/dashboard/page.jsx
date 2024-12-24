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
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('peserta/terbaru');

            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                setData(cachedData); // Menyimpan data dari cache ke state

                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/terbaru`);
                    const apiData = apiResponse.data.data;

                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');

                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('peserta/terbaru');
                        await cache.delete('peserta/terbaru');
                        // console.log('Data lama dihapus dari cache');

                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('peserta/terbaru', newResponse);
                        // console.log('Data baru disimpan ke cache');

                        // Update data dengan data terbaru dari API
                        setData(apiData);
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
                }
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.log('Data tidak ditemukan di cache');

                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/terbaru`);
                    const data = response.data.data;
                    setData(data);  // Menyimpan data ke state

                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('peserta/terbaru');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('peserta/terbaru', cacheResponse);
                    console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        getData();
        setNama(localStorage.getItem('nama'));
    }, [nama]);
    // console.log(data);

    const filteredData = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return data;
    }, [data]);

    return (
        <Layoutadmin>
            <Myhelmet
                title={`Dashboard | Psikotest Online App`}
                description={`Halaman Dashboard dengan otoritas sebagai Admin.`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`admin/dashboard`}
            />
            <Appbarku headTitle="Dashboard" />

            <main className="p-4 mb-14">
                <div>
                    <h1 className="text-xl font-bold">Selamat Datang, {nama}</h1>
                </div>

                <div className="mt-4">
                    <p><span className="font-bold">Daftar Tes Psikotest Terbaru</span></p>
                    {loading ? (
                        <div className='text-center'>
                            <p><span className='font-bold text-2lg'>Loading...</span></p>
                        </div>
                    ) : (
                        <ListPeserta listpeserta={filteredData} />
                    )}
                </div>
            </main>
        </Layoutadmin>
    )
}