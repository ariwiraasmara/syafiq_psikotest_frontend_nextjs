// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '@/components/layout/Layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
const ListPeserta = dynamic(() => import('@/components/admin/ListPeserta'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const ComboPaging = dynamic(() => import('@/components/ComboPaging'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

export default function AdminPeserta() {
    const params = useSearchParams();
    const textColor = localStorage.getItem('text-color');
    const textColorRGB = localStorage.getItem('text-color-rgb');
    const borderColor = localStorage.getItem('border-color');
    const borderColorRGB = localStorage.getItem('border-color-rgb');
    const [loading, setLoading] = React.useState(true);
    const [loadingData, setLoadingData] = React.useState(true);
    const [searchHidden, setSearchHidden] = React.useState('hidden');
    const [data, setData] = React.useState([]);
    const [sort, setSort] = React.useState('nama');
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
            borderColor: borderColorRGB, // warna hover
        },
        '&:hover .MuiInputLabel-root': {
            color: textColorRGB, // warna hover
        }
    }
    
    const getData = async () => {
        setLoadingData(true);
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/${sort}/${by}/${toSearch}?page=${currentpage}`, {
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
            setData(response.data.data.data);
            setLastpage(response.data.data.last_page);
            // console.log('response', response);
        }
        catch(err) {
            console.info('Error AdminPeserta-getData:', err);
        }
        setLoadingData(false);
    }

    /*const getdata = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('/admin/peserta');
            
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
                        withCredentials: true
                    });
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta`, {
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
                        const cache = await caches.open('/admin/peserta');
                        await cache.delete('/admin/peserta');
                        // console.log('Data lama dihapus dari cache');
                        
                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('/admin/peserta', newResponse);
                        // console.log('Data baru disimpan ke cache');
                        
                        // Update data dengan data terbaru dari API
                        setData(apiData);
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
                }
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.log('Data tidak ditemukan di cache');
                
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta`, {
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
                    const data = response.data.data;
                    setData(data);  // Menyimpan data ke state

                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('/admin/peserta');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('/admin/peserta', cacheResponse);
                    console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    };*/

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
    }, [sort, by, toSearch]);

    console.table('tabel peserta', data);

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
                title={`Peserta | Admin | Psikotest Online App`}
                pathURL={`/admin/peserta?page=${currentpage}`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Peserta" />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Peserta`} hidden={`hidden`} />
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
        return(
            searchHidden == 'hidden' ? (
                <Button variant="contained" color="primary"
                        size="small" aria-label="cari...."
                        onClick={(e) => handleChange_searchHidden(e)}
                        sx={{
                            color: '#fff',
                            marginTop: '-2px'
                        }}>
                    <SearchIcon fontSize="small" />
                </Button>
            ) : (
                <Button variant="contained" color="warning"
                        size="small" aria-label="cari...."
                        onClick={(e) => handleChange_searchHidden(e)}
                        sx={{
                            color: '#fff',
                            marginTop: '-2px'
                        }}>
                    <CloseIcon fontSize="small" />
                </Button>
            )
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

    return (
        <Layoutadmin>
            <MemoHelmet />
            <MemoAppbarku />
            <MemoNavBreadcrumb />
            <div className={`text-${textColor}`}>
                <h1 className='hidden'>Halaman Daftar Peserta | Admin</h1>
                <div className={`mr-2 p-2 text-right`} sx={{ borderBottom: `1px solid ${borderColor}` }}>
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
                        <MenuItem value={`nama`} selected={'nama' === sort}>
                            Nama Peserta
                        </MenuItem>
                        <MenuItem value={`no_identitas`} selected={'no_identitas' === sort}>
                            Nomor Identitas Peserta
                        </MenuItem>
                        <MenuItem value={`asal`} selected={'asal' === sort}>
                            Asal Peserta
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
                <div className={`ml-2 mr-2 p-2 ${searchHidden}`}>
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
                ) : (
                    <div className='p-4 mb-32'>
                        <h2 className='hidden'>Daftar Peserta</h2>
                        <ListPeserta listpeserta={data} textColor={textColor} borderColor={borderColor} />
                    </div>
                )}
                <ComboPaging
                    title={`Peserta`}
                    bottom={`bottom-14`}
                    current={currentpage}
                    lastpage={lastpage}
                    link={`/admin/peserta`}
                />
            </div>
            <MemoFooter />
        </Layoutadmin>
    )
}