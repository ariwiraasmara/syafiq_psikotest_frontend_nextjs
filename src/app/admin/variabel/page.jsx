'use client';
import Layoutadmin from '../../layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { For } from 'million/react';
import Swal from 'sweetalert2';

import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NewOrEdit = dynamic(() => import('./new_edit'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import fun from '@/libraries/myfunction';

const linkStyle = {
    color: '#fff'
}

export default function VariabelSetting() {
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const opencloseEdit = (varid) => {
        document.getElementById(varid).classList.toggle('hidden');
    }
            
    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        const expirationTime = (Date.now() + 3600000) * 24; // 24 jam ke depan dalam milidetik
        try {
            const cacheResponse = await caches.match('variabel');
            
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
                            'tokenlogin': fun.random('combwisp', 50),
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
                        const cache = await caches.open('variabel');
                        await cache.delete('variabel');
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(responseStore), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('variabel', newResponse);
                        // console.log('Data baru disimpan ke cache');
                        
                        // Update dataPeserta dengan data terbaru dari API
                        setData(apiResponse.data.data);
                    }
                    console.info('Get Data Dari Cache');
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
                            'tokenlogin': fun.random('combwisp', 50),
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
                    const cache = await caches.open('variabel');
                    const cacheResponse = new Response(JSON.stringify(responseStore), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('variabel', cacheResponse);
                    console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        getData();
    }, []);
    
    // Filter data menggunakan useMemo (hanya jika ada operasi pengolahan data)
    const filteredData = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return data;
    }, []);

    console.table('tabel data variabel', filteredData);

    const toEdit = (e, id, nvariabel, nvalue) => {
        e.preventDefault();
        sessionStorage.setItem('variabel_id', id);
        sessionStorage.setItem('variabel_variabel', nvariabel);
        sessionStorage.setItem('variabel_values', nvalue);
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
                            'islogin' : fun.readable(localStorage.getItem('islogin')),
                            'isadmin' : fun.readable(localStorage.getItem('isadmin')),
                            'Authorization': `Bearer ${fun.readable(localStorage.getItem('pat'))}`,
                            'remember-token': fun.readable(localStorage.getItem('remember-token')),
                            'tokenlogin': fun.random('combwisp', 50),
                            'email' : fun.readable(localStorage.getItem('email')),
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

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Variabel | Admin | Psikotest`}
                description={`Halamana Variabel dengan otoritas sebagai Admin.`}
                pathURL={`admin/variabel`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Variabel" />
        );
    });

    if(loading) {
        return (
            <div className='text-center p-8'>
                <p><span className='font-bold text-2lg'>Loading...</span></p>
            </div>
        );
    }

    return (
        <Layoutadmin>
            <MemoHelmet />
            <MemoAppbarku  />
            <main className="p-5 mb-14">
                <div>
                    {loading ? (
                        <div className='text-center'>
                            <p><span className='font-bold text-2lg'>Loading...</span></p>
                            <p><span className='font-bold text-2lg'>Sedang memproses...</span></p>
                        </div>
                    ) : (
                        <For each={data}>
                            {(data, index) =>
                            <div key={index} className='border-b-2 p-3'>
                                <div className="static mt-3 flex flex-row justify-between">
                                    <div className="order-first">
                                        <p>
                                            {data.variabel} = {data.values} detik
                                        </p>
                                    </div>
                                    <div className="order-last">
                                        <Link
                                            sx={linkStyle}
                                            className="mr-4"
                                            onClick={(e) => toEdit(e, data.id, data.variabel, data.values)}
                                        >
                                            <EditIcon />
                                        </Link>
                                        <Link
                                            sx={linkStyle}
                                            onClick={(e) => fDelete(e, data.id, data.variabel, data.values)}
                                        >
                                            <DeleteIcon />
                                        </Link>
                                    </div>
                                </div>
                            </div>}
                        </For>
                    )}
                </div>
                <div id="newdata" className="mt-6 border-2 p-2 rounded-lg hidden">
                    <h3 className="font-bold border-b-2">Tambah Variabel Baru</h3>
                    <NewOrEdit />
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
    );
}
