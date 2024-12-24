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

export default function AdminPeserta() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getdata = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('peserta');
            
            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                setData(cachedData); // Menyimpan data dari cache ke state
                
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta`);
                    const data = response.data.data;
                    setData(data);  // Menyimpan data ke state
                    
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
        setLoading(false);
    };

    const filteredData = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return data;
    }, [data]);

    React.useEffect(() => {
        getdata();
    }, []);
    // console.log(data);

    return (
        <Layoutadmin>
            <Myhelmet
                title={`Peserta | Admin | Psikotest Online App`}
                description={`Halaman Peserta dengan otoritas sebagai Admin.`}
                pathURL={`admin/peserta`}
            />
            <Appbarku headTitle={'Peserta'} />
            <main className="p-5 mb-14">
                {loading ? (
                    <div className='text-center'>
                        <p><span className='font-bold text-2lg'>Loading...</span></p>
                    </div>
                ) : (
                    <ListPeserta listpeserta={filteredData} />
                )}
            </main>
        </Layoutadmin>
    )
}