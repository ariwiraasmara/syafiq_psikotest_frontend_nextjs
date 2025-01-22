// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '../../../../layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { For } from 'million/react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2'

import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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
const ComboPaging = dynamic(() => import('@/components/ComboPaging'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

export default function DetilPsikotestKecermatan() {
    const router = useRouter();
    const textColor = localStorage.getItem('text-color');
    const textColorRGB = localStorage.getItem('text-color-rgb');
    const borderColor = localStorage.getItem('border-color');
    const borderColorRGB = localStorage.getItem('border-color-rgb');
    const params = useSearchParams();
    // const [pkid, setPkid] = React.useState(0);
    const pkid = sessionStorage.getItem('admin_psikotest_kecermatan_id')
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoalJawaban, setDataSoalJawaban] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // paging
    let currentpage = params.get('page');
    // console.log('currentPage', currentpage);
    const [lastpage, setLastpage] = React.useState(1);
    let numbertable = 0;
    if(currentpage == 1) numbertable = 1;
    else if(currentpage == 2) numbertable = 11;
    else if(currentpage == 3) numbertable = 21;
    else if(currentpage == 4) numbertable = 31;
    else if(currentpage == 5) numbertable = 41;

    const tableHeaderColumnsStyle = {
        p: 2,
        borderBottom: '1px solid #000',
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        minWidth: 120
    }

    const tableBodyColumnStyle = {
        p: 2,
        textAlign: 'center',
        color: '#000',
    }

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        
        // setCurrentpage(params.get('page'));
        // setPkid(sessionStorage.getItem('psikotest_kecermatan_id'));
        const expirationTime = (Date.now() + 3600000) * 24; // 24 jam ke depan dalam milidetik
        try {
            const cacheResponse = await caches.match(`/admin/psikotest/kecermatan/detil/${pkid}`);
            
            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);
                
                const cachedData = await cacheResponse.json();
                console.table('cachedData', cachedData);
                
                // Set data dari cache ke state
                // Menyimpan data dari cache ke state
                setDataPertanyaan(cachedData.dataPertanyaan);
                setDataSoalJawaban(cachedData.dataSoalJawaban);
                setLastpage(cachedData.lastpage);
                
                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/all/${pkid}?page=${currentpage}`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
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
                    const apiData = apiResponse.data;
                    const responseStore = {
                        data: apiData,
                        expirationTime: expirationTime
                    }
                    
                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');
                        
                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open(`/admin/psikotest/kecermatan/detil/${pkid}`);
                        await cache.delete(`/admin/psikotest/kecermatan/detil/${pkid}`);
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(responseStore), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put(`/admin/psikotest/kecermatan/detil/${pkid}`, newResponse);
                        // console.log('Data baru disimpan ke cache');
                        
                        // Update dataPeserta dengan data terbaru dari API
                        setDataPertanyaan(apiResponse.data.data.pertanyaan[0]);
                        setDataSoalJawaban(apiResponse.data.data.soaljawaban.data);
                        setLastpage(apiResponse.data.data.soaljawaban.last_page);
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/all/${pkid}?page=${currentpage}`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
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
                    setDataPertanyaan(response.data.data.pertanyaan[0]);
                    setDataSoalJawaban(response.data.data.soaljawaban.data);
                    setLastpage(response.data.data.soaljawaban.last_page);
                    const responseStore = {
                        dataPertanyaan: dataPertanyaan,
                        dataSoalJawaban: dataSoalJawaban,
                        lastpage: lastpage,
                        expirationTime: expirationTime
                    }
                    
                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open(`/admin/psikotest/kecermatan/detil/${pkid}`);
                    const cacheResponse = new Response(JSON.stringify(responseStore), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put(`/admin/psikotest/kecermatan/detil/${pkid}`, cacheResponse);
                    // console.log('Data disimpan ke cache');
                } catch (error) {
                    console.info('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.info('Terjadi Error AdminPsikotestKecermatanDetil-getData:', error);
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);

    console.table('dataPertanyaan', dataPertanyaan);
    console.table('dataSoalJawaban', dataSoalJawaban);

    if(loading) {
        return (
            <h2 className={`text-center p-8 font-bold text-2lg text-${textColor}`}>
                <p>Sedang memuat data...<br/></p>
                <p>Mohon Harap Tunggu...</p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    const toAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            sessionStorage.setItem('admin_psikotest_kecermatan_tabellastpage', currentpage);
            router.push(`/admin/psikotest/kecermatan/detil/baru`);
        }
        catch(err) {
            console.info('Terjadi Error DetilPsikotestKecermatanDetil-toAdd', err);
        }
    }

    const toEditPertanyaan = (e, id, kolom_x, nilai_a, nilai_b, nilai_c, nilai_d, nilai_e) => {
        e.preventDefault()
        setLoading(true);
        sessionStorage.setItem('admin_psikotest_kecermatan_id', id);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_A', nilai_a);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_B', nilai_b);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_C', nilai_c);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_D', nilai_d);
        sessionStorage.setItem('admin_psikotest_kecermatan_nilai_E', nilai_e);
        router.push(`/admin/psikotest/kecermatan/edit`);
    }

    const toEditSoalJawaban = (e, id, soalA, soalB, soalC, soalD, jawaban) => {
        e.preventDefault();
        setLoading(true);
        try {
            sessionStorage.setItem('admin_psikotest_kecermatan_id', pkid);
            sessionStorage.setItem('admin_psikotest_kecermatan_idsoal', id);
            sessionStorage.setItem('admin_psikotest_kecermatan_soalA', soalA);
            sessionStorage.setItem('admin_psikotest_kecermatan_soalB', soalB);
            sessionStorage.setItem('admin_psikotest_kecermatan_soalC', soalC);
            sessionStorage.setItem('admin_psikotest_kecermatan_soalD', soalD);
            sessionStorage.setItem('admin_psikotest_kecermatan_jawaban', jawaban);
            sessionStorage.setItem('admin_psikotest_kecermatan_tabellastpage', currentpage);
            router.push(`/admin/psikotest/kecermatan/detil/edit`);
        }
        catch(err) {
            console.info('Terjadi Error DetilPsikotestKecermatanDetil-toEditSoalJawaban', err);
        }
    }

    const fDelete = async (e, id, soalA, soalB, soalC, soalE, jawaban) => {
        e.preventDefault();
        Swal.fire({
            title: "Anda yakin ingin menghapus data soal dan jawaban ini?",
            html: `Soal : ${soalA}, ${soalB}, ${soalC}, ${soalE}<br/>Jawaban : ${jawaban}`,
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
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`,  {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${pkid}/${id}`, {
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
                } catch (error) {
                    // Swal.showValidationMessage(`Request failed: ${error}`);
                    console.info('Terjadi Error DetilPsikotestKecermatanDetil-fDelete', err);
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Terhapus!",
                    text: "Data Telah Berhasil Dihapus",
                    icon: "success"
                }).then((res2) => {
                    if (res2.isConfirmed) {
                        location.reload();
                    }
                });
            }
        });
    }

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Detil Psikotest Kecermatan | Admin | Psikotest`}
                pathURL={`/admin/psikotest/kecermatan/detil?page=${currentpage}`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Psikotest Kecermatan" isback={true} url={`/admin/psikotest/kecermatan`} />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Psikotest / Kecermatan / Detil`} hidden={`hidden`} />
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
            <div className={`p-0 mb-0 text-${textColor}`}>
                <h1 className='hidden'>Detil Halaman Psikotest Kecermatan {currentpage} | Admin</h1>
                {loading ? (
                    <h2 className='text-center'>
                        <p><span className='font-bold text-2lg'>
                            Sedang memuat data... Mohon Harap Tunggu...
                        </span></p>
                        <CircularProgress color="info" size={50} />
                    </h2>
                ) : (
                <>
                    <div className={`p-4 mb-10 text-${textColor}`}>
                        <h2 className='font-bold'>Detil Psikotest Kecermatan</h2>
                        <h2 className="font-bold">Pertanyaan {dataPertanyaan.kolom_x} : [
                            <span className='ml-2 mr-2'>{dataPertanyaan.nilai_A}</span>
                            <span className='mr-2'>{dataPertanyaan.nilai_B}</span>
                            <span className='mr-2'>{dataPertanyaan.nilai_C}</span>
                            <span className='mr-2'>{dataPertanyaan.nilai_D}</span>
                            <span className='mr-2'>{dataPertanyaan.nilai_E}</span>
                        ]
                            <span className='ml-4'>
                                <Link rel='nofollow' title={`Edit Data Pertanyaan`} href='#' onClick={(e) => toEditPertanyaan(e, dataPertanyaan.id, dataPertanyaan.kolom_x, dataPertanyaan.nilai_A, dataPertanyaan.nilai_B, dataPertanyaan.nilai_C, dataPertanyaan.nilai_D, dataPertanyaan.nilai_E)}>
                                    <span className="mr-2"><EditIcon /></span>
                                </Link>
                            </span>
                        </h2>
                        <Paper sx={{ marginTop: '20px', width: '100%', overflow: 'hidden', borderRadius: 2 }}>
                            <TableContainer sx={{ maxHeight: 350 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={tableHeaderColumnsStyle}>
                                                <span className="">#</span>
                                            </TableCell>
                                            <TableCell sx={tableHeaderColumnsStyle}>
                                                <span className="">Soal</span>
                                            </TableCell>
                                            <TableCell sx={tableHeaderColumnsStyle}>
                                                <span className="">Jawaban</span>
                                            </TableCell>
                                            <TableCell sx={tableHeaderColumnsStyle} colSpan="2">
                                                <span className="">Edit / Delete</span>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {dataSoalJawaban ? dataSoalJawaban.map((data, index) => (
                                        <TableBody key={index}>
                                            <TableRow>
                                                <TableCell sx={tableBodyColumnStyle}>
                                                    {numbertable++}
                                                </TableCell>
                                                <TableCell sx={tableBodyColumnStyle}>
                                                    {data.soal_jawaban.soal[0][0]}, {data.soal_jawaban.soal[0][1]}, {data.soal_jawaban.soal[0][2]}, {data.soal_jawaban.soal[0][3]}
                                                </TableCell>
                                                <TableCell sx={tableBodyColumnStyle}>
                                                    {data.soal_jawaban.jawaban}
                                                </TableCell>
                                                <TableCell sx={tableBodyColumnStyle}>
                                                    <Link rel='nofollow' title={`Edit Data`} href='#' onClick={(e) => toEditSoalJawaban(e, data.id, data.soal_jawaban.soal[0][0], data.soal_jawaban.soal[0][1], data.soal_jawaban.soal[0][2], data.soal_jawaban.soal[0][3], data.soal_jawaban.jawaban)}>
                                                        <span className="mr-2"><EditIcon /></span>
                                                    </Link>
                                                </TableCell>
                                                <TableCell sx={tableBodyColumnStyle}>
                                                    <Link rel='nofollow' title={`Delete Data`} href='#' onClick={(e) => fDelete(e, data.id, data.soal_jawaban.soal[0][0], data.soal_jawaban.soal[0][1], data.soal_jawaban.soal[0][2], data.soal_jawaban.soal[0][3], data.soal_jawaban.jawaban)}>
                                                        <DeleteIcon />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )) : (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan='6' sx={tableBodyColumnStyle}>
                                                    <span className='font-bold text-lg'>
                                                        Belum Ada Data<br/>
                                                        Data Kosong!
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        </Paper>
                        <div className='mt-2 text-center'>
                            <IconButton onClick={(e) => toAdd(e)} aria-label="tambah" size="large" sx={{ border: 2, borderColor: borderColorRGB, rounded: 100, color: textColorRGB }}>
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                    <ComboPaging
                        title={`Psikotest Kecermatan Detil`}
                        bottom={`bottom-0`}
                        current={currentpage}
                        lastpage={lastpage}
                        link={`/admin/psikotest/kecermatan/detil`}
                    />
                </>
                )}
            </div>
            <MemoFooter />
        </Layoutadmindetil>
    </>
    );
}