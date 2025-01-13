// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '@/components/layout/Layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
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
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

const linkStyle = {
    color: '#fff'
}

export default function PsikotestKecermatan() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);

    const getData = async () => {
        setLoading(true);
        try {
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan-kolompertanyaan`, {
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
            console.info('response', response);
            setData(response.data.data);
        } catch (err) {
            console.error(err);
            return err;
        }
        setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);

    console.table('tabel psikotest kecermatan', data);

    const onDetil = (id) => {
        setLoading(true);
        sessionStorage.setItem('admin_psikotest_kecermatan_id', id);
        router.push(`/admin/psikotest/kecermatan/detil?page=1`);
    }

    const toAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        router.push(`/admin/psikotest/kecermatan/baru`);
    }

    const toEdit = (e, id, kolom_x, nilai_a, nilai_b, nilai_c, nilai_d, nilai_e) => {
        e.preventDefault()
        sessionStorage.setItem('admin_psikotest_kecermatan_id', id);
        sessionStorage.setItem('admin_psikotest_kecermatan_kolom_x', kolom_x);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_A', nilai_a);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_B', nilai_b);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_C', nilai_c);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_D', nilai_d);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_E', nilai_e);
        router.push(`/admin/psikotest/kecermatan/edit`);
    }

    const fDelete = async (e, id, kolom_x) => {
        e.preventDefault();
        Swal.fire({
            title: "Anda yakin ingin menghapus data Psikotest Kecermatan ini?",
            html: `Semua data <b>${kolom_x}</b> yang ada didalamnya juga akan terhapus!`,
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
                    await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/kolompertanyaan/${id}`, {
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

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Psikotest Kecermatan | Admin | Psikotest`}
                pathURL={`/admin/psikotest/kecermatan`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Psikotest Kecermatan" isback={true} url={`/admin/psikotest`} />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Psikotest / Kecermatan`} hidden={`hidden`} />
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
            <div className="p-5 mb-14">
                <h1 className='hidden'>Halaman Psikotest Kecermatan | Admin</h1>
                {loading ? (
                    <h2 className='text-center'>
                        <p><span className='font-bold text-2lg'>
                            Sedang memuat data... Mohon Harap Tunggu...
                        </span></p>
                        <CircularProgress color="info" size={50} />
                    </h2>
                ) : (
                    data ? (
                        data.map((data, index) => (
                            <div className='border-b-2 p-3' key={index}>
                                <div className="static flex flex-row justify-between">
                                    <Link rel='follow' title={`Psikotest Kecermatan ${data.kolom_x}`} onClick={() => onDetil(data.id)} href="/admin/psikotest/kecermatan/detil/?page=1" key={index}>
                                        <div className="order-first">
                                            <p>{data.kolom_x}</p>
                                        </div>
                                    </Link>
                                    <div className="order-last">
                                        <span className='mr-6'>
                                            <Link
                                                sx={linkStyle}
                                                rel='nofollow'
                                                title={`Edit Data`}
                                                onClick={(e) => toEdit(e, data.id, data.kolom_x, data.nilai_A, data.nilai_B, data.nilai_C, data.nilai_D, data.nilai_E)}
                                                href="#"
                                            >
                                                <EditIcon />
                                            </Link>
                                        </span>
                                        <Link
                                            sx={linkStyle}
                                            rel='nofollow'
                                            title={`Delete Data`}
                                            onClick={(e) => fDelete(e, data.id, data.kolom_x)}
                                            href="#"
                                        >
                                            <DeleteIcon />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2 className='font-bold text-center text-lg'>
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
            }} color="primary" aria-label="add" rel='nofollow' title='Tambah Data Baru' href='#' onClick={(e) => toAdd(e)} >
                <AddIcon />
            </Fab>
            <MemoFooter />
        </Layoutadmin>
    </>
    )
}