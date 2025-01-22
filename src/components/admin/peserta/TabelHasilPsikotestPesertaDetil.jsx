// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara
import axios from 'axios';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';

import CircularProgress from '@mui/material/CircularProgress';
import { readable, random } from '@/libraries/myfunction';

TabelHasilPsikotestPesertaDetil.propTypes = {
    peserta_id: PropTypes.number,
    textColor: PropTypes.text,
    borderColor: PropTypes.text,
};

export default function TabelHasilPsikotestPesertaDetil(props) {
    const [dataLoading, setDataLoading] = React.useState(false);
    const [dataHasilPsikotesKecermatan, setDataHasilPsikotesKecermatan] = React.useState({});
    
    const APIUrl_default = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil/psikotest/kecermatan/semua/${props.peserta_id}`;
    const [apiURL, setApiURL] = React.useState(APIUrl_default);
    const [tglSearch_1, setTglSearch_1] = React.useState('null');
    const [tglSearch_2, setTglSearch_2] = React.useState('null');

    const headerColumns = [
        { id: 'kolom_1', label: 'Kolom 1', minWidth: 120, align: 'center' },
        { id: 'kolom_2', label: 'Kolom 2', minWidth: 120, align: 'center' },
        { id: 'kolom_3', label: 'Kolom 3', minWidth: 120, align: 'center' },
        { id: 'kolom_4', label: 'Kolom 4', minWidth: 120, align: 'center' },
        { id: 'kolom_5', label: 'Kolom 5', minWidth: 120, align: 'center' },
    ];

    const headerColumnsStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        minWidth: 120
    }

    const styledTextField = {
        '& .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${props.borderColor}`,
            color: props.textColor
        },
        '& .MuiInputLabel-root': {
            color: props.textColor
        },
        '& .MuiOutlinedInput-input': {
            color: props.textColor
        },
        '& .MuiOutlinedInput-placeholder': {
            color: props.textColor
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: props.borderColor, // warna hover
        },
        '&:hover .MuiInputLabel-root': {
            color: props.textColor, // warna hover
        }
    }

    const getDataHasilPsikotesKecermatan = async () => {
        setDataLoading(true);
        try {
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.get(apiURL, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
                headers: {
                    'Content-Type': 'application/json',
                    'XSRF-TOKEN': csrfToken,
                    'X-API-KEY': process.env.APP_FAST_API_KEY,
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
            console.info('response', response);
            setDataHasilPsikotesKecermatan(response.data.data);
        } catch (err) {
            console.error('Error TabelHasilPsikotestPesertaDetil-getDataHasilPsikotesKecermatan:', err);
        }
        setDataLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getDataHasilPsikotesKecermatan();
    }, [apiURL]);

    // console.info('peserta-detil-TabelHasilPsikotestPesertaDetil: id peserta', props.peserta_id);
    // console.info('id peserta', props.peserta_id);
    // console.info('no_identitas', props.no_identitas);

    const handleChange_tglSearch_1 = (e) => {
        if( e.target.value === '0000-00-00' ||
            e.target.value === null) {
                setTglSearch_1('null');
        }
        else {
            setTglSearch_1(e.target.value);
        }
    };

    const handleChange_tglSearch_2 = (e) => {
        if( e.target.value === '0000-00-00' ||
            e.target.value === null) {
                setTglSearch_2('null');
        }
        else {
            setTglSearch_2(e.target.value);
        }
    };

    const submitSearch = (e) => {
        e.preventDefault();
        console.info('submit search triggered!');
        setApiURL(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil/psikotest/kecermatan/${props.peserta_id}/${tglSearch_1}/${tglSearch_2}`);
        getDataHasilPsikotesKecermatan();
        console.info('submit search finish!');
    }

    const cancelSearch = (e) => {
        e.preventDefault();
        setTglSearch_1(null);
        setTglSearch_2(null);
        setDataLoading(true);
        setApiURL(APIUrl_default);
        getDataHasilPsikotesKecermatan();
        setDataLoading(false);
    }

    return (
        <React.StrictMode>
            <div className={`p-2 rounded-md mb-4 border-2 border-${props.borderColor}`}>
                <div className='font-bold'>
                    <h3 className='font-bold ml-2'>Cari Data...</h3>
                </div>
                <div className='static grid grid-cols-3 gap-2 mt-2'>
                    <div className=''>
                        <TextField type='date' sx={styledTextField}
                            size="small" fullWidth focused
                            defaultValue={tglSearch_1}
                            onChange={(e) => handleChange_tglSearch_1(e)}
                        />
                    </div>
                    <div className=''>
                        <TextField type='date' sx={styledTextField}
                            size="small" fullWidth focused
                            defaultValue={tglSearch_2}
                            onChange={(e) => handleChange_tglSearch_2(e)}
                        />
                    </div>
                    <div className=''>
                        <Button title='Cari Data' variant="contained" size="small" fullWidth color="primary" onClick={(e) => submitSearch(e)}>
                            <SearchIcon />
                        </Button>
                    </div>
                </div>
                <div className='mt-2'>
                    <Button title='Batal Cari Data dan Refresh Data' variant="contained" size="small" fullWidth color="warning" onClick={(e) => cancelSearch(e)} startIcon={<RestartAltIcon />}>
                        Batal & Refresh
                    </Button>
                </div>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
                <TableContainer sx={{ maxHeight: 450 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headerColumnsStyle}>
                                    <span className='font-bold'>#</span>
                                </TableCell>
                                <TableCell sx={headerColumnsStyle}>
                                    <div className='font-bold'>Tanggal</div>
                                </TableCell>
                                {headerColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <span className='font-bold'>{column.label}</span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <div className='text-center font-bold'>
                                            Sedang Memuat Data..<br/>
                                            Mohon Harap Tunggu...<br/>
                                            <CircularProgress color="info" size={50} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                dataHasilPsikotesKecermatan.length > 0 ? (
                                    dataHasilPsikotesKecermatan.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ textAlign: 'right' }}>{parseInt(index) + 1}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{data.tgl_ujian}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{data.hasilnilai_kolom_1}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{data.hasilnilai_kolom_2}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{data.hasilnilai_kolom_3}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{data.hasilnilai_kolom_4}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{data.hasilnilai_kolom_5}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <div className='text-center font-bold'>
                                                Belum Ada Data<br/>
                                                Data Kosong!
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </React.StrictMode>
    );
}