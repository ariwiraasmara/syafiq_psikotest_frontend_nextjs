// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara
import axios from 'axios';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

import { random } from '@/libraries/myfunction';

GrafikHasilPsikotestKecermatan_Peserta.propTypes = {
    peserta_id: PropTypes.number,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
};

export default function GrafikHasilPsikotestKecermatan_Peserta(props) {
    const [dataLoading, setDataLoading] = React.useState(false);
    const [labels, setLabels] = React.useState([]);
    const [datasets, setDatasets] = React.useState({});
    const [countLoadData, setCountLoadData] = React.useState(0);

    const APIUrl_default = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil/psikotest/kecermatan/semua/${props.peserta_id}`;
    const [apiURL, setApiURL] = React.useState(APIUrl_default);
    const [tglSearch_1, setTglSearch_1] = React.useState('null');
    const [tglSearch_2, setTglSearch_2] = React.useState('null');

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
            console.info('response api from getDataHasilPsikotesKecermatan', response);
            if(response.data.data.length > 0) {
                const labels = response.data.data.map(item => item.tgl_ujian);
                const dataset = [
                    {
                        label: 'Hasil Nilai Kolom 1',
                        data: response.data.data.map(item => item.hasilnilai_kolom_1),
                        borderColor: 'rgba(255, 0, 0, 1)',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        color: 'rgba(255, 255, 255, 1)',
                        fill: false,
                    },
                    {
                        label: 'Hasil Nilai Kolom 2',
                        data: response.data.data.map(item => item.hasilnilai_kolom_2),
                        borderColor: 'rgba(0, 162, 0, 1)',
                        backgroundColor: 'rgba(0, 162, 0, 0.2)',
                        color: 'rgba(255, 255, 255, 1)',
                        fill: false,
                    },
                    {
                        label: 'Hasil Nilai Kolom 3',
                        data: response.data.data.map(item => item.hasilnilai_kolom_3),
                        borderColor: 'rgba(0, 0, 255, 1)',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 1)',
                        fill: false,
                    },
                    {
                        label: 'Hasil Nilai Kolom 4',
                        data: response.data.data.map(item => item.hasilnilai_kolom_4),
                        borderColor: 'rgba(255, 255, 0, 1)',
                        backgroundColor: 'rgba(255, 255, 0, 0.2)',
                        color: 'rgba(255, 255, 255, 1)',
                        fill: false,
                    },
                    {
                        label: 'Hasil Nilai Kolom 5',
                        data: response.data.data.map(item => item.hasilnilai_kolom_5),
                        borderColor: 'rgba(255, 0, 255, 1)',
                        backgroundColor: 'rgba(255, 0, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 1)',
                        fill: false,
                    },
                ];
                setLabels(labels);
                setDatasets(dataset);
            }
        } catch (err) {
            console.error(err);
        }
        setDataLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getDataHasilPsikotesKecermatan();
    }, [apiURL]);

    // console.info('PesertaDetil_GrafikKecermatan peserta_id', props.peserta_id);

    const chartData = {
        labels,
        datasets,
    };

    const optionsData = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Grafik Hasil Psikotes Kecermatan',
                color: props.textColor,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tanggal Ujian',
                    color: props.textColor,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Nilai',
                    color: props.textColor,
                },
                beginAtZero: true,
                color: props.textColor,
            },
        },
    };

    // console.table(`tabel grafik peserta id:${props.peserta_id}`, chartData);
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
        if(tglSearch_1 === tglSearch_2) {
            alert('Tanggal Pencari 1 dan 2 Tidak Boleh Sama!');
        }
        else {
            setApiURL(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil/psikotest/kecermatan/${props.peserta_id}/${tglSearch_1}/${tglSearch_2}`);
            getDataHasilPsikotesKecermatan();
        }
    }

    const cancelSearch = (e) => {
        e.preventDefault();
        setCountLoadData(1);
        setApiURL(APIUrl_default);
        getDataHasilPsikotesKecermatan();
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
            <div className={`${props.textColor}`}>
                {/**!grafik error?!**/}
                {parseInt(countLoadData) > 0 ? (
                    <div className='bg-slate-50 p-2 rounded-md text-black'>
                        <Line data={chartData} options={optionsData} />
                    </div>
                    
                ) : (
                    dataLoading ? (
                        <div className='text-center font-bold'>
                            Sedang Memuat Data..<br/>
                            Mohon Harap Tunggu...<br/>
                            <CircularProgress color="info" size={50} />
                        </div>
                    ) : (
                        <div>Click Tombol "Batal & Refresh" terlebih dahulu untuk mendapatkan data ini..</div>
                    )
                )}
            </div>
        </React.StrictMode>
    );
}
