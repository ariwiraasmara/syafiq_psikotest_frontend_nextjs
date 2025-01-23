// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '@/components/layout/Layoutadmin';
import axios from 'axios';
import * as React from 'react';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const ListPeserta = dynamic(() => import('@/components/admin/ListPeserta'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

export default function AdminDashboard() {
    const textColor = localStorage.getItem('text-color');
    const textColorRGB = localStorage.getItem('text-color-rgb');
    const borderColor = localStorage.getItem('border-color');
    const borderColorRGB = localStorage.getItem('border-color-rgb');
    const [nama, setNama] = React.useState('');
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('/admin/dashboard');

            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                setData(cachedData); // Menyimpan data dari cache ke state

                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/dashboard_admin`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-KEY': process.env.APP_FAST_API_KEY,
                            'XSRF-TOKEN': csrfToken,
                            'islogin' : readable(localStorage.getItem('islogin')),
                            'isadmin' : readable(localStorage.getItem('isadmin')),
                            'Authorization': `Bearer ${readable(localStorage.getItem('pat'))}`,
                            'remember-token': readable(localStorage.getItem('remember-token')),
                            'tokenlogin': random('combwisp', 50),
                            'email' : readable(localStorage.getItem('email')),
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
                    const apiData = apiResponse.data.data;

                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');

                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('/admin/dashboard');
                        await cache.delete('/admin/dashboard');
                        // console.log('Data lama dihapus dari cache');

                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('/admin/dashboard', newResponse);
                        // console.log('Data baru disimpan ke cache');

                        // Update data dengan data terbaru dari API
                        setData(apiData);
                    }
                } catch (error) {
                    console.info('Terjadi kesalahan saat mengambil data terbaru:', error);
                }
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.info('Data tidak ditemukan di cache');

                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/dashboard_admin`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-KEY': process.env.APP_FAST_API_KEY,
                            'XSRF-TOKEN': csrfToken,
                            'islogin' : localStorage.getItem('islogin'),
                            'isadmin' : localStorage.getItem('isadmin'),
                            'Authorization': `Bearer ${localStorage.getItem('pat')}`,
                            'remember-token': localStorage.getItem('remember-token'),
                            'tokenlogin': random('combwisp', 50),
                            'email' : localStorage.getItem('email'),
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
                    const data = response.data.data;
                    setData(data);  // Menyimpan data ke state

                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('/admin/dashboard');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('/admin/dashboard', cacheResponse);
                    console.info('Data disimpan ke cache');
                } catch (error) {
                    console.info('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.info('Terjadi Error AdminDashboard-getData:', error);
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
        setNama(localStorage.getItem('nama'));
    }, [nama]);
    // console.log(data);

    console.table('Data Peserta Terbaru', data);

    
    if(loading) {
        return (
            <h2 className={`text-center p-8 font-bold text-2lg text-${textColor}`}>
                <p>Sedang memuat data...<br/></p>
                <p>Mohon Harap Tunggu...</p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Dashboard | Psikotest Online App`}
                pathURL={`/admin/dashboard`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
                onetime={false}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Dashboard" />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Dashboard`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer hidden={`hidden`} />
        );
    });

    return (
        <>
            <Layoutadmin>
                <MemoHelmet />
                <MemoAppbarku />
                <MemoNavBreadcrumb />
                <div className={`p-4 mb-14 ${textColor}`}>
                    <div>
                        <h1 className="hidden">Halaman Dashboard | Admin</h1>
                        <h2 className={`text-xl font-bold`}>Selamat Datang, {nama}</h2>
                    </div>
                    <div className="mt-4">
                        <h2 className="font-bold">Daftar 10 Peserta Tes Psikotest Terbaru</h2>
                        {loading ? (
                            <h2 className={`text-center ${textColor}`}>
                                <p><span className='font-bold text-2lg'>
                                    Sedang memuat data... Mohon Harap Tunggu...
                                </span></p>
                                <CircularProgress color="info" size={50} />
                            </h2>
                        ) : (
                            <ListPeserta listpeserta={data} isLatest={true} textColor={textColor} borderColor={borderColor} />
                        )}
                    </div>
                </div>
                <MemoFooter />
            </Layoutadmin>
        </>
    )
}