// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '@/components/layout/Layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

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
const TabDataHasilPsikotestPesertaDetil = dynamic(() => import('@/components/admin/peserta/TabDataHasilPsikotestPesertaDetil'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

export default function AdminPesertaDetil() {
    const router = useRouter();
    const textColor = localStorage.getItem('text-color');
    const borderColor = localStorage.getItem('border-color');
    const [sessionID, setSessionID] = React.useState(sessionStorage.getItem('admin_id_peserta'));
    const safeID = readable(sessionID);

    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const handleOpenModalInfo = () => setOpenModalInfo(true);
    const handleCloseModalInfo = () => setOpenModalInfo(false);

    const buttonStyle = {
        border: `3px solid ${borderColor}`,
        backgroundColor : 'rgba(255, 255, 255, 0.5)',
        color : textColor
    }

    const styleModalInfo = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        color: '#000',
        boxShadow: 24,
        p: 2,
        overflow: 'auto',
        maxHeight: 300,
        maxWidth: '90%',
    };

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        const expirationTime = (Date.now() + 3600000) * 24; // 24 jam ke depan dalam milidetik
        try {
            const cacheResponse = await caches.match(`/admin/peserta/detil/${safeID}`);
            
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
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/${safeID}`, {
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
                    const apiData = apiResponse.data.data[0];
                    const responseStore = {
                        data: apiData,
                        expirationTime: expirationTime
                    }
                    
                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');
                        
                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open(`/admin/peserta/detil/${safeID}`);
                        await cache.delete(`/admin/peserta/detil/${safeID}`);
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(responseStore), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put(`/admin/peserta/detil/${safeID}`, newResponse);
                        // console.log('Data baru disimpan ke cache');
                        
                        // Update data dengan data terbaru dari API
                        setData(apiData);
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
                }
                setLoading(false);
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.log('Data tidak ditemukan di cache');
                
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/${safeID}`, {
                        withCredentials: true,
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
                    const data = response.data.data[0];
                    setData(data);  // Menyimpan data ke state
                    const responseStore = {
                        data: data,
                        expirationTime: expirationTime
                    }
                    
                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open(`/admin/peserta/detil/${safeID}`);
                    const cacheResponse = new Response(JSON.stringify(responseStore), {
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
                    await cache.put(`/admin/peserta/detil/${safeID}`, cacheResponse);
                    // console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
                setLoading(false);
            }
        } catch (error) {
            setData({});
            console.info('Terjadi Error AdminPesertaDetil-getData:', error);
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);
    // console.info('peserta-detil: id peserta', data.id);
    console.table('tabel peserta detil', data);

    if(loading) {
        return (
            <h2 className={`text-center p-8 font-bold text-2lg text-${textColor}`}>
                <p>Sedang memuat data...<br/></p>
                <p>Mohon Harap Tunggu...</p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    const toEdit = (e, id, nama, no_indentitas, email, tgl, asal) => {
        e.preventDefault();
        setLoading(true);
        try {
            sessionStorage.setItem('admin_id_peserta', id);
            sessionStorage.setItem('admin_nama_peserta', nama);
            sessionStorage.setItem('admin_noidentitas_peserta', no_indentitas);
            sessionStorage.setItem('admin_email_peserta', email);
            sessionStorage.setItem('admin_tgllahir_peserta', tgl);
            sessionStorage.setItem('admin_asal_peserta', asal);
            router.push(`/admin/peserta/edit`);
        }
        catch(err) {
            console.info('Terjadi Error AdminPesertaDetil-toEdit:', err);
        }
    };

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Detil Peserta | Admin | Psikotest Online App`}
                pathURL={`/admin/peserta/detil`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle={'Detil Peserta'} isback={true} url={`/admin/peserta?page=1`} />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Peserta / Detil`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer hidden={`hidden`} />
        );
    });

    return (
        <>
            <Layoutadmindetil>
                <MemoHelmet />
                <MemoAppbarku />
                <MemoNavBreadcrumb />
                <div className="p-4 mb-14">
                    <h1 className='hidden'>Halaman Detil Peserta | Admin</h1>
                    {loading ? (
                        <h2 className={`text-center ${textColor}`}>
                            <p><span className='font-bold text-2lg'>
                                Sedang memuat data... Mohon Harap Tunggu...
                            </span></p>
                            <CircularProgress color="info" size={50} />
                        </h2>
                    ) : (
                        <div className={`${textColor}`}>
                            <div>
                                <p>
                                    <span className='mr-2'>
                                        <Link follow="nofollow" title={`Edit Data Peserta ${data.nama}`} href='#' onClick={(e) => toEdit(e, data.id, data.nama, data.no_identitas, data.email, data.tgl_lahir, data.asal)}>
                                            <EditIcon />
                                        </Link>
                                    </span>
                                    <span className="font-bold">Nama :</span> {data.nama} 
                                </p>
                                <p><span className="font-bold">No. Identitas :</span> {data.no_identitas}</p>
                                <p><span className="font-bold">Email :</span> {data.email}</p>
                                <p><span className="font-bold">Tanggal Lahir :</span> {data.tgl_lahir}</p>
                                <p><span className="font-bold">Usia :</span> {data.usia}</p>
                                <p><span className="font-bold">Asal : </span> {data.asal}</p>
                            </div>

                            <div className="mt-4">
                                <div className='text-right'>
                                    <Button variant="outlined" color="info" size="small" onClick={handleOpenModalInfo} sx={buttonStyle}>
                                        <InfoIcon />
                                    </Button>
                                </div>
                                <TabDataHasilPsikotestPesertaDetil
                                    peserta_id={safeID}
                                    no_identitas={data.no_identitas}
                                    textColor={textColor}
                                    borderColor={borderColor}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <Modal
                    open={openModalInfo}
                    onClose={handleCloseModalInfo}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModalInfo}>
                        <div id="modal-modal-title">
                            <h2 className='font-bold underline'>Informasi dan Petunjuk Penggunaan</h2>
                        </div>
                        <div id="modal-modal-description" className='mt-2'>
                            <List>
                                <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
                                    <ListItemText component="li">
                                        Ikon pensil disamping nama peserta merujuk ke halaman edit data peserta
                                    </ListItemText>
                                </ListItem>
                                <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
                                    <ListItemText component="li">
                                        Tombol "Batal & Refresh" berfungsi sebagai untuk membatalkan hasil pencarian dan mengembalikan tampilan data ke awal.
                                    </ListItemText>
                                </ListItem>
                                <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
                                    <ListItemText component="li">
                                        Terdapat 2 kotak untuk mengisi variabel tanggal.<br/><br/>
                                        Pada tab "Tabel" kemudian memilih salah satu jenis psikotest,
                                            dapat digunakan untuk mendapatkan 1 data dengan cara menyamakan data tanggal pada 2 field, sebagai contoh : "01-01-2024" dan "01-01-2024".<br/><br/>
                                        Sedangkan pada tab "Grafik", tidak dapat mendapatkan 1 data, dikarenakan hasil akhir pada grafik hanya akan menampilkan titik saja, tidak ada garis yang menghubungkan antara 2 variabel tanggal yang yang dipilih dan menghubungkan.
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </div>
                        <div id="modal-modal-footer" className='mt-2'>
                            <Button variant="contained" color="warning" fullWidth size="small" onClick={handleCloseModalInfo}>
                                <CloseIcon />
                            </Button>
                        </div>
                    </Box>
                </Modal>
                <MemoFooter />
            </Layoutadmindetil>
        </>
    );
}
