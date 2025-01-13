'use client';
import Layoutadmin from '@/components/layout/Layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { For } from 'million/react';
import Swal from 'sweetalert2';

import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NewOrEdit = dynamic(() => import('./new_edit'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

const linkStyle = {
    color: '#fff'
}

export default function VariabelSetting() {
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
            
    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        const expirationTime = (Date.now() + 3600000) * 24; // 24 jam ke depan dalam milidetik
        try {
            const cacheResponse = await caches.match('/admin/variabel');
            
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
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
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
                    const apiData = apiResponse.data.data;
                    const responseStore = {
                        data: apiData,
                        expirationTime: expirationTime
                    }
                    
                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');
                        
                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('/admin/variabel');
                        await cache.delete('/admin/variabel');
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(responseStore), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('/admin/variabel', newResponse);
                        // console.log('Data baru disimpan ke cache');
                        
                        // Update dataPeserta dengan data terbaru dari API
                        setData(apiResponse.data.data);
                    }
                    console.info('Get Data Dari Cache');
                    setLoading(false);
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
                }
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.error('Data tidak ditemukan di cache');
                
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
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
                    const responseStore = {
                        data: data,
                        expirationTime: expirationTime
                    }
                    
                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('/admin/variabel');
                    const cacheResponse = new Response(JSON.stringify(responseStore), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('/admin/variabel', cacheResponse);
                    console.log('Data disimpan ke cache');
                    setLoading(false);
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);

    console.table('tabel data variabel', data);

    const toAdd = (e) => {
        e.preventDefault();
        return router.push('/admin/variabel/baru');
    }

    const toEdit = (e, id, nvariabel, nvalue) => {
        e.preventDefault();
        sessionStorage.setItem('admin_variabel_id', id);
        sessionStorage.setItem('admin_variabel_variabel', nvariabel);
        sessionStorage.setItem('admin_variabel_values', nvalue);
        return router.push('/admin/variabel/edit');
    };

    const fDelete = async (e, id, nvariabel, nvalues) => {
        e.preventDefault();
        Swal.fire({
            title: "Anda yakin ingin menghapus data variabel ini?",
            html: `<b>${nvariabel}</b> = <b>${nvalues}</b>`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batalkan",
            icon: "warning",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`);
                    await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/${id}`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
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
                    // Hapus item dari state variabels setelah sukses
                    setData((prev) => prev.filter((item) => item.id !== id));
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Terhapus!",
                    text: "Data Telah Berhasil Dihapus",
                    icon: "success"
                });
            }
        });
    };

    if(loading) {
        return (
            <h2 className='text-center p-8'>
                <p><span className='font-bold text-2lg'>
                    Sedang memuat data... Mohon Harap Tunggu...
                </span></p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Variabel | Admin | Psikotest`}
                pathURL={`/admin/variabel`}
                robots={'index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate'}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Variabel" />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Variabel`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer hidden={`hidden`} />
        );
    });

    return (
        <Layoutadmin>
            <MemoHelmet />
            <MemoAppbarku  />
            <MemoNavBreadcrumb />
            <div className="p-5 mb-14">
                <h1 className="hidden">Halaman Variabel | Admin</h1>
                {loading ? (
                    <h2 className='text-center'>
                        <p><span className='font-bold text-2lg'>
                            Sedang memuat data... Mohon Harap Tunggu...
                        </span></p>
                        <CircularProgress color="info" size={50} />
                    </h2>
                ) : (
                    data ? (
                        <For each={data}>
                            {(data, index) =>
                                <div key={index} className='border-b-2 p-3'>
                                    <div className="static flex flex-row justify-between">
                                        <Link
                                            sx={linkStyle}
                                            className="mr-4"
                                            rel='nofollow'
                                            title={`${data.variabel} = ${data.values} detik`}
                                            onClick={(e) => toEdit(e, data.id, data.variabel, data.values)}
                                            href="#"
                                        >
                                            <div className="order-first">
                                                <p>
                                                    {data.variabel} = {data.values} detik
                                                </p>
                                            </div>
                                        </Link>
                                        <div className="order-last">
                                            <span className='mr-6'>
                                                <Link
                                                    sx={linkStyle}
                                                    className="mr-6"
                                                    rel='nofollow'
                                                    title={`Edit Data`}
                                                    onClick={(e) => toEdit(e, data.id, data.variabel, data.values)}
                                                    href="#"
                                                >
                                                    <EditIcon />
                                                </Link>
                                            </span>
                                            <Link
                                                sx={linkStyle}
                                                rel='nofollow'
                                                title={`Delete Data`}
                                                onClick={(e) => fDelete(e, data.id, data.variabel, data.values)}
                                                href="#"
                                            >
                                                <DeleteIcon />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        </For>
                    ) : (
                        <h2 className='font=bold text-center text-lg'>
                            Belum Ada Data<br/>
                            Data Kosong!
                        </h2>
                    )
                )}
            </div>
            <Fab sx={{
                position: 'absolute',
                bottom: '13%',
                right: '3%',
            }} color="primary" aria-label="add" rel='nofollow' title='Data Baru' href='#' onClick={(e) => toAdd(e)} >
                <AddIcon />
            </Fab>
            <MemoFooter />
        </Layoutadmin>
    );
}
