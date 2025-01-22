// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import './style.css';
import Layoutadmin from '@/components/layout/Layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';

import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

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

export default function AdminVariabel() {
    const router = useRouter();
    const params = useSearchParams();
    const textColor = localStorage.getItem('text-color');
    const textColorRGB = localStorage.getItem('text-color-rgb');
    const borderColor = localStorage.getItem('border-color');
    const borderColorRGB = localStorage.getItem('border-color-rgb');
    const [loading, setLoading] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(false);
    const [searchHidden, setSearchHidden] = React.useState('hidden');
    const [data, setData] = React.useState([]);
    const [sort, setSort] = React.useState('variabel');
    const [by, setBy] = React.useState('asc');
    const [toSearch, setToSearch] = React.useState('null');

    // paging
    let currentpage = params.get('page');
    const [lastpage, setLastpage] = React.useState(1);

    const styledTextField = {
        '& .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${borderColor}`,
            color: textColorRGB,
        },
        '& .MuiInputLabel-root': {
            color: textColorRGB,
        },
        '& .MuiOutlinedInput-input': {
            color: textColorRGB,
        },
        '& .MuiOutlinedInput-placeholder': {
            color: textColorRGB,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor, // warna hover
        },
        '&:hover .MuiInputLabel-root': {
            color: textColorRGB, // warna hover
        }
    }

    const linkStyle = {
        color: textColorRGB
    }

    const getData = async() => {
        setLoadingData(true);
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/${sort}/${by}/${toSearch}?page=${currentpage}`, {
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
            setData(response.data.data.data);
            setLastpage(response.data.data.last_page);
            // console.log('response', response);
        }
        catch(err) {
            console.info("Terjadi Error AdminVariabel-getData:", err);
        }
        setLoadingData(false);
    }

    /*const getData = async () => {
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
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/${sort}/${by}`, {
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
    };*/

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
    }, [sort, by, toSearch]);

    console.table('tabel data variabel', data);

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
                title={`Variabel | Admin | Psikotest`}
                pathURL={`/admin/variabel?page=${currentpage}`}
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

    const handleChange_searchHidden = (e) => {
        e.preventDefault();
        if(searchHidden == 'hidden') setSearchHidden('');
        else setSearchHidden('hidden');
    }

    const ButtonChange_searchHidden = () => {
        if(searchHidden == 'hidden') return(
            <Button variant="contained" color="primary"
                    size="small" aria-label="cari...."
                    onClick={(e) => handleChange_searchHidden(e)}
                    sx={{
                        color: '#fff',
                        marginTop: '-2px',
                        width: 5
                    }}>
                <SearchIcon fontSize="small" />
            </Button>
        );
        else return(
            <Button variant="contained" color="warning"
                    size="small" aria-label="cari...."
                    onClick={(e) => handleChange_searchHidden(e)}
                    sx={{
                        color: '#fff', marginTop: '-2px'
                    }}>
                <CloseIcon fontSize="small" />
            </Button>
        );
    }

    const handleChange_toSearch = (e) => {
        if( e.target.value === '' ||
            e.target.value === ' ' ||
            e.target.value === null) {
                setToSearch('null');
        }
        else {
            setToSearch(e.target.value);
        }
        currentpage = 1;
    };

    const handleChange_sort = (e) => {
        setSort(e.target.value);
        console.info('sort', sort);
    }

    const handleChange_by = (e) => {
        setBy(e.target.value);
        console.info('by', by);
    }

    const toAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        router.push('/admin/variabel/baru');
    }

    const toEdit = (e, id, nvariabel, nvalue) => {
        e.preventDefault();
        setLoading(true);
        sessionStorage.setItem('admin_variabel_id', id);
        sessionStorage.setItem('admin_variabel_variabel', nvariabel);
        sessionStorage.setItem('admin_variabel_values', nvalue);
        router.push('/admin/variabel/edit');
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
                    // Swal.showValidationMessage(`Request failed: ${error}`);
                    console.info('Terjadi Error AdminVariabel-fDelte:', err)
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
            <MemoHelmet />
            <MemoAppbarku  />
            <MemoNavBreadcrumb />
            <div className={`text-${textColor}`}>
                <h1 className="hidden">Halaman Variabel | Admin</h1>
                <div className={`mx-2 p-2 text-right`}>
                    <Button variant="contained" color="success" size="small" onClick={(e) => getData()} aria-label="cari...." sx={{ color: '#fff', marginTop: '-2px' }}>
                        <RefreshIcon fontSize="small" />
                    </Button>
                    <ButtonChange_searchHidden />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        title={'Pilih Berdasarkan...'}
                        label={'Pilih Berdasarkan...'}
                        onChange={(e) => handleChange_sort(e)}
                        sx={{
                            border: `1px solid #000`,
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            color: '#000',
                            textAlign: 'right',
                            width: 150,
                            height: 30,
                        }}
                    >
                        <MenuItem value={`variabel`} selected={'variabel' === sort}>
                            Nama Variabel
                        </MenuItem>
                        <MenuItem value={`values`} selected={'values' === sort}>
                            Nilai Variabel
                        </MenuItem>
                    </Select>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={by}
                        title={'Menaik atau Menurun...'}
                        label={'Menaik atau Menurun...'}
                        onChange={(e) => handleChange_by(e)}
                        sx={{
                            border: `1px solid #000`,
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            color: '#000',
                            textAlign: 'right',
                            width: 85,
                            height: 30,
                        }}
                    >
                        <MenuItem value={`asc`} selected={'asc' === sort}>
                            A - Z
                        </MenuItem>
                        <MenuItem value={`desc`} selected={'desc' === sort}>
                            Z - A
                        </MenuItem>
                    </Select>
                </div>
                <div className={`mx-2 p-2 ${searchHidden}`}>
                    <TextField label="Cari.." sx={styledTextField}
                        size="small" fullWidth
                        onChange={(e) => handleChange_toSearch(e)}
                        slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: textColorRGB }} />
                                </InputAdornment>
                                ),
                            },
                        }}
                    />
                </div>
                {loadingData ? (
                    <h2 className={`text-center text-${textColor}`}>
                        <p><span className='font-bold text-2lg'>
                            Sedang memuat data... Mohon Harap Tunggu...
                        </span></p>
                        <CircularProgress color="info" size={50} />
                    </h2>
                ) : (<>
                    {data.length > 0 ? (
                        <div className='p-4 mb-32'>
                            {data.map((data, index) => (
                                <div key={index} className={`bg-slate-50 border-b-2 p-3 rounded-t-md mt-2 border-${borderColor}`}>
                                    <div className="static flex flex-row justify-between">
                                        <Link
                                            sx={linkStyle}
                                            className="mr-4"
                                            rel='nofollow'
                                            title={`${data.variabel} = ${data.values} detik`}
                                            onClick={(e) => toEdit(e, data.id, data.variabel, data.values)}
                                            href="#"
                                        >
                                            <div className={`order-first text-${textColor}`}>
                                                {data.variabel} = {data.values} detik
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
                            ))}
                        </div>
                    ) : (
                        <h2 className='font=bold text-center text-lg'>
                            Belum Ada Data<br/>
                            Data Kosong!
                        </h2>
                    )}
                </>)}
                <ComboPaging
                    title={`Variabel`}
                    bottom={`bottom-14`}
                    current={currentpage}
                    lastpage={lastpage}
                    link={`/admin/variabel`}
                />
                <Fab sx={{
                    position: 'fixed',
                    bottom: '12%',
                    right: '3%',
                }} color="primary" aria-label="add" rel='nofollow' title='Data Baru' href='#' onClick={(e) => toAdd(e)} >
                    <AddIcon />
                </Fab>
            </div>
            <MemoFooter />
        </Layoutadmin>
    );
}
