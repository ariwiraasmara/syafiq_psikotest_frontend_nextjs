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

    const [dataPeserta, setDataPeserta] = React.useState({});

    const getData = async () => {
        const expirationTime = (Date.now() + 3600000) * 24; // 24 jam ke depan dalam milidetik
        try {
            const cacheResponse = await caches.match('peserta/detil');
            
            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);
                
                const cachedData = await cacheResponse.json();
                
                // Set data dari cache ke state
                setDataPeserta(cachedData); // Menyimpan data dari cache ke state
                
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/${safeID}`);
                    const data = response.data.data[0];
                    setDataPeserta(data);  // Menyimpan data ke state
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
    };

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
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`/admin/peserta/detil`}
            />
            <Appbarku isback={true} headTitle={'Detil Peserta'} />
            <main className="p-5 mb-14">
                <div>
                    <p><span className="font-bold">Nama :</span> {dataPeserta.nama}</p>
                    <p><span className="font-bold">No. Identitas :</span> {dataPeserta.no_identitas}</p>
                    <p><span className="font-bold">Email :</span> {dataPeserta.email}</p>
                    <p><span className="font-bold">Tanggal Lahir :</span> {dataPeserta.tgl_lahir}</p>
                    <p><span className="font-bold">Usia :</span> {dataPeserta.usia}</p>
                    <p><span className="font-bold">Asal : </span> {dataPeserta.asal}</p>
                    <p>
                        <Link onClick={(e) => toEdit(e, dataPeserta.id, dataPeserta.nama, dataPeserta.no_identitas, dataPeserta.email, dataPeserta.tgl_lahir, dataPeserta.asal,)}>
                            <EditIcon />
                        </Link>
                    </p>
                </div>

                <div className="mt-4">
                    <TabHasilPsikotestPeserta peserta_id={safeID} />
                </div>
            </main>
        </Layoutadmindetil>
    );
}
