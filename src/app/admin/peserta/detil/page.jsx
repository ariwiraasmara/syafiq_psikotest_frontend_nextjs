// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '../../../layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';
import TabHasilPsikotestPeserta from '@/components/TabHasilPsikotestPeserta';
import fun from '@/libraries/myfunction';

export default function AdminPesertaDetil() {
    const router = useRouter();
    const sessionID = sessionStorage.getItem('admid_peserta');
    const safeID = fun.readable(sessionID);

    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        const expirationTime = (Date.now() + 3600000) * 24; // 24 jam ke depan dalam milidetik
        try {
            const cacheResponse = await caches.match('peserta/detil');
            
            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);
                
                const cachedData = await cacheResponse.json();
                
                // Set data dari cache ke state
                setData(cachedData); // Menyimpan data dari cache ke state
                
                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/${safeID}`);
                    const apiData = apiResponse.data.data[0];
                    const responseStore = {
                        data: apiData,
                        expirationTime: expirationTime
                    }
                    
                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');
                        
                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('peserta/detil');
                        await cache.delete('peserta/detil');
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(responseStore), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('peserta/detil', newResponse);
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/${safeID}`);
                    const data = response.data.data[0];
                    setData(data);  // Menyimpan data ke state
                    const responseStore = {
                        data: data,
                        expirationTime: expirationTime
                    }
                    
                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('peserta/detil');
                    const cacheResponse = new Response(JSON.stringify(responseStore), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('peserta/detil', cacheResponse);
                    // console.log('Data disimpan ke cache');
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

    const toEdit = (e, id, nama, no_indentitas, email, tgl, asal) => {
        e.preventDefault();
        try {
            sessionStorage.setItem('admid_peserta', id);
            sessionStorage.setItem('admnama_peserta', nama);
            sessionStorage.setItem('admnoidentitas_peserta', no_indentitas);
            sessionStorage.setItem('admemail_peserta', email);
            sessionStorage.setItem('admtgllahir_peserta', tgl);
            sessionStorage.setItem('admasal_peserta', asal);
            router.push(`/admin/peserta/edit`);
        }
        catch(e) {
            console.log(e);
        }
    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Layoutadmindetil>
            <Myhelmet
                title={`Detil Peserta | Admin | Psikotest Online App`}
                description={`Halaman Detil Peserta dengan otoritas sebagai Admin.`}
                pathURL={`admin/peserta/detil`}
            />
            <Appbarku headTitle={'Detil Peserta'}  isback={true} url={`/admin/peserta`} />
            <main className="p-5 mb-14">
                {loading ? (
                    <div className='text-center'>
                        <p><span className='font-bold text-2lg'>Loading...</span></p>
                    </div>
                ) : (
                    <div>
                        <div>
                            <p><span className="font-bold">Nama :</span> {filteredData.nama}</p>
                            <p><span className="font-bold">No. Identitas :</span> {filteredData.no_identitas}</p>
                            <p><span className="font-bold">Email :</span> {filteredData.email}</p>
                            <p><span className="font-bold">Tanggal Lahir :</span> {filteredData.tgl_lahir}</p>
                            <p><span className="font-bold">Usia :</span> {filteredData.usia}</p>
                            <p><span className="font-bold">Asal : </span> {filteredData.asal}</p>
                            <p>
                                <Link onClick={(e) => toEdit(e, filteredData.id, filteredData.nama, filteredData.no_identitas, filteredData.email, filteredData.tgl_lahir, filteredData.asal)}>
                                    <EditIcon />
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4">
                            <TabHasilPsikotestPeserta peserta_id={safeID} />
                        </div>
                    </div>
                )}
            </main>
        </Layoutadmindetil>
    );
}
