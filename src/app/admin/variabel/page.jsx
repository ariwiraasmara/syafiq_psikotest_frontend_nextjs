'use client';
import Layoutadmin from '../../layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';
import NewOrEdit from './new_edit';

const linkStyle = {
    color: '#fff'
}

const opencloseEdit = (varid) => {
    document.getElementById(varid).classList.toggle('hidden');
}

export default function VariabelSetting() {
    const router = useRouter();
    const [variabels, setVariabels] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Fungsi untuk memeriksa dan mengambil data dari Cache
    const getCacheData = async () => {
        const cache = await caches.open('variabel-cache');
        const cachedResponse = await cache.match('variabels');
        if (cachedResponse) {
            return cachedResponse.json();
        }
        return null;
    };

    // Fungsi untuk menyimpan data ke Cache
    const setCacheData = async (data) => {
        const cache = await caches.open('variabel-cache');
        const response = new Response(JSON.stringify(data));
        await cache.put('variabels', response);
    };

    // Fungsi untuk mengambil data (baik dari cache atau API)
    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        let data = await getCacheData(); // Cek jika data ada di cache
        if (!data) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting`);
                data = response.data.data;
                setCacheData(data); // Simpan data ke cache
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan',
                    text: 'Gagal mengambil data variabel.',
                });
            }
        }
        setVariabels(data);
        setLoading(false);
    };

    React.useEffect(() => {
        getData();
    }, []);

    // Filter data menggunakan useMemo (hanya jika ada operasi pengolahan data)
    const filteredVariabels = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return variabels;
    }, [variabels]);

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
                        headers: {
                            'XSRF-TOKEN': csrfToken,
                            'Content-Type': 'application/json',
                        }
                    });
                    // Hapus item dari state variabels setelah sukses
                    setVariabels((prev) => prev.filter((item) => item.id !== id));
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

    return (
        <Layoutadmin>
            <Myhelmet
                title={`Variabel | Admin | Psikotest`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`${process.env.NEXT_PUBLIC_FRONTEND}/admin/variabel`}
            />
            <Appbarku headTitle="Variabel" />
            <main className="p-5 mb-14">
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        filteredVariabels.map((data, index) => (
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
                            </div>
                        ))
                    )}
                </div>
                <div id="newdata" className="mt-6 border-1 hidden">
                    <h3 className="font-bold">Tambah Variabel Baru</h3>
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
