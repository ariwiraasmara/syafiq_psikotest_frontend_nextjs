// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '../../../../layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { For } from 'million/react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2'

import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Paging = dynamic(() => import('@/components/Paging'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import fun from '@/libraries/myfunction';

export default function DetilPsikotestKecermatan() {
    const router = useRouter();
    const params = useSearchParams();
    // const [pkid, setPkid] = React.useState(0);
    const pkid = sessionStorage.getItem('psikotest_kecermatan_id')
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoalJawaban, setDataSoalJawaban] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // paging
    let currentpage = params.get('page');
    const [lastpage, setLastpage] = React.useState(1);
    let numbertable = 0;
    if(currentpage == 1) numbertable = 1;
    else if(currentpage == 2) numbertable = 11;
    else if(currentpage == 3) numbertable = 21;
    else if(currentpage == 4) numbertable = 31;
    else if(currentpage == 5) numbertable = 41;

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        
        // setCurrentpage(params.get('page'));
        // setPkid(sessionStorage.getItem('psikotest_kecermatan_id'));
        const expirationTime = (Date.now() + 3600000) * 24; // 24 jam ke depan dalam milidetik
        try {
            const cacheResponse = await caches.match('psikotest/kecermatan/detil');
            
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
                    const apiData = apiResponse.data;
                    const responseStore = {
                        data: apiData,
                        expirationTime: expirationTime
                    }
                    
                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');
                        
                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('psikotest/kecermatan/detil');
                        await cache.delete('psikotest/kecermatan/detil');
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(responseStore), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('psikotest/kecermatan/detil', newResponse);
                        // console.log('Data baru disimpan ke cache');
                        
                        // Update dataPeserta dengan data terbaru dari API
                        setDataPertanyaan(apiResponse.data.data.pertanyaan[0]);
                        setDataSoalJawaban(apiResponse.data.data.soaljawaban.data);
                        setLastpage(apiResponse.data.data.soaljawaban.last_page);
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
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
                    const cache = await caches.open('psikotest/kecermatan/detil');
                    const cacheResponse = new Response(JSON.stringify(responseStore), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('psikotest/kecermatan/detil', cacheResponse);
                    // console.log('Data disimpan ke cache');
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
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    // Filter data menggunakan useMemo (hanya jika ada operasi pengolahan data)
    const filteredDataPertanyaan = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return dataPertanyaan;
    }, [dataPertanyaan]);

    const filteredDataSoalJawaban = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return dataSoalJawaban;
    }, [dataSoalJawaban]);

    const filteredLastPage = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return lastpage;
    }, [lastpage]);

    console.table('dataPertanyaan', dataPertanyaan);
    console.table('dataSoalJawaban', dataSoalJawaban);

    const toAdd = (e) => {
        e.preventDefault();
        try {
            sessionStorage.setItem('psikotest_kecermatan_tabellastpage', currentpage);
            router.push(`/admin/psikotest/kecermatan/detil/baru`);
        }
        catch(err) {
            console.log(err);
        }
    }

    const toEdit = (e, id, soalA, soalB, soalC, soalD, jawaban) => {
        e.preventDefault();
        try {
            sessionStorage.setItem('psikotest_kecermatan_idsoal', id);
            sessionStorage.setItem('psikotest_kecermatan_soalA', soalA);
            sessionStorage.setItem('psikotest_kecermatan_soalB', soalB);
            sessionStorage.setItem('psikotest_kecermatan_soalC', soalC);
            sessionStorage.setItem('psikotest_kecermatan_soalD', soalD);
            sessionStorage.setItem('psikotest_kecermatan_jawaban', jawaban);
            router.push(`/admin/psikotest/kecermatan/detil/edit`);
        }
        catch(err) {
            console.log(err);
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
                description={`Halaman Detil Psikotest Kecermatan dengan otoritas sebagai Admin.`}
                pathURL={`admin/psikotest/kecermatan/detil`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Detil Psikotest Kecermatan" isback={true} url={`/admin/psikotest/kecermatan`} />
        );
    });

    return (
        <Layoutadmindetil>
            <MemoHelmet />
            <MemoAppbarku />
            <main className="p-5 mb-14" key={1}>
                {loading ? (
                    <div className='text-center'>
                        <p><span className='font-bold text-2lg'>Loading...</span></p>
                        <p><span className='font-bold text-2lg'>Sedang memproses...</span></p>
                    </div>
                ) : (
                <div className="text-white">
                    <span className="font-bold">Pertanyaan {dataPertanyaan.kolom_x}</span> : [
                        {dataPertanyaan.nilai_A},
                        {dataPertanyaan.nilai_B},
                        {dataPertanyaan.nilai_C},
                        {dataPertanyaan.nilai_D},
                        {dataPertanyaan.nilai_E}
                    ]
                    <table className="border-collapse border-2 border-white-500 w-full rounded-lg mt-4">
                        <thead>
                            <tr>
                                <th className="border-2 p-2"><span className="text-lg">#</span></th>
                                <th className="border-2 p-2"><span className="text-lg">Soal</span></th>
                                <th className="border-2 p-2"><span className="text-lg">Jawaban</span></th>
                                <th colSpan="2"><span className="text-lg">Edit / Delete</span></th>
                            </tr>
                        </thead>
                        <For each={dataSoalJawaban}>
                        {(data, index) => (
                            <tbody key={index}>
                                <tr className="border-t-2">
                                    <td className="p-2 border-r-2 text-center ml-2">
                                        {numbertable++}
                                    </td>
                                    <td className="p-2 border-r-2 text-center">
                                        <div>
                                            {data.soal_jawaban.soal[0][0]}, {data.soal_jawaban.soal[0][1]}, {data.soal_jawaban.soal[0][2]}, {data.soal_jawaban.soal[0][3]}
                                        </div>
                                    </td>
                                    <td className="p-2 border-r-2 text-center">
                                        <div>
                                            {data.soal_jawaban.jawaban}
                                        </div>
                                    </td>
                                    <td className='p-2 border-r-2 text-center'>
                                        <Link onClick={(e) => toEdit(e, data.id, data.soal_jawaban.soal[0][0], data.soal_jawaban.soal[0][1], data.soal_jawaban.soal[0][2], data.soal_jawaban.soal[0][3], data.soal_jawaban.jawaban)}>
                                            <span className="mr-2"><EditIcon /></span>
                                        </Link>
                                    </td>
                                    <td className='p-2 border-r-2 text-center'>
                                        <Link onClick={(e) => fDelete(e, data.id, data.soal_jawaban.soal[0][0], data.soal_jawaban.soal[0][1], data.soal_jawaban.soal[0][2], data.soal_jawaban.soal[0][3], data.soal_jawaban.jawaban)}>
                                            <DeleteIcon />
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        </For>
                    </table>
                    <div className='mt-4 text-center'>
                        <IconButton onClick={(e) => toAdd(e)} aria-label="tambah" size="large" sx={{ border: 2, borderColor: 'white', rounded: 100, color: 'white' }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className='mt-4 text-center bg-black text-white p-2 rounded-md'>
                        <div>
                            <span className='text-lg'>Halaman {currentpage}</span>
                        </div>
                        <div className='mt-2'>
                            <span>
                                <Link href={`/admin/psikotest/kecermatan/detil/?page=${parseInt(currentpage) - 1}`}>
                                    <ChevronLeftIcon />
                                </Link>
                            </span>
                            {[...Array(lastpage).keys()].map(x => (
                                <Paging key={x} current={currentpage} page={x} />
                            ))}
                            <span>
                                <Link href={`/admin/psikotest/kecermatan/detil/?page=${parseInt(currentpage) + 1}`}>
                                    <ChevronRightIcon />
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
                )}
            </main>
        </Layoutadmindetil>
    );
}