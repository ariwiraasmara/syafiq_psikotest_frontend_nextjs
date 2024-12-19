// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmindetil from '../../../../layoutadmindetil';
import axios from 'axios';
import * as React from 'react';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';
import fun from '@/libraries/myfunction';

const styledTextField = {
    '& .MuiOutlinedInput-notchedOutline': {
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-placeholder': {
        color: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(000, 000, 000, 0.8)', // warna hover
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white', // warna hover
    },
    m: 1
}

export default function DetilPsikotestKecermatan() {
    // const [pkid, setPkid] = React.useState(0);
    const pkid = sessionStorage.getItem('psikotest_kecermatan_id');
    // const safeID = fun.readable(pkid);
    console.log(pkid);

    
    const [data, setData] = React.useState([]);
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoal, setDataSoal] = React.useState([]);
    const [dataJawaban, setDataJawaban] = React.useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${pkid}`);
            console.log(response);
            setData(response.data);
            setDataPertanyaan(response.data.data.pertanyaan[0]);
            setDataSoal(response.data.data.soal);
            setDataJawaban(response.data.data.jawaban);
        } catch (err) {
            return err;
            console.error(err);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

    console.log('data', data);
    console.log('dataPertanyaan', dataPertanyaan);
    console.log('dataSoal', dataSoal);
    console.log('dataJawaban', dataJawaban);

    /*
    const [isEditSoalVisible, setIsEditSoalVisible] = React.useState(false);
    const [isEditJawabanVisible, setIsEditJawabanVisible] = React.useState(false);
    const opencloseEdit = (type, index) => {
        if (type === 'soal') {
            setIsEditSoalVisible(!isEditSoalVisible);
        } else if (type === 'jawaban') {
            setIsEditJawabanVisible(!isEditJawabanVisible);
        }
    };
    const editsoal = (id) => `editsoal-${id.toString()}`;
    const editjawaban = (id) => `editjawaban-${id.toString()}`;
    */
    const opencloseEdit = (index, id, soalA, soalB, soalC, soalD, jawaban) => {
        setIdsoal(id);
        setSoalA(soalA);
        setSoalB(soalB);
        setSoalC(soalC);
        setSoalD(soalD);
        setJawaban(jawaban);
        document.getElementById(index).classList.toggle('hidden');
    }

    const [idsoal, setIdsoal] = React.useState(0);
    const handleChange_idsoal = (event, index) => {
        setIdsoal(event.target.value);
    }; 

    const [soalA, setSoalA] = React.useState(0);
    const handleChange_soalA = (event, index) => {
        setNilaiA(event.target.value);
    };

    const [soalB, setSoalB] = React.useState(0);
    const handleChange_soalB = (event, index) => {
        setNilaibB(event.target.value);
    };

    const [soalC, setSoalC] = React.useState(0);
    const handleChange_soalC = (event, index) => {
        setNilaiC(event.target.value);
    };

    const [soalD, setSoalD] = React.useState(0);
    const handleChange_soalD = (event, index) => {
        setNilaiD(event.target.value);
    };

    const [jawaban, setJawaban] = React.useState(0);
    const handleChange_jawaban = (event, index) => {
        setJawaban(event.target.value);
    };

    const submit = async (e, id) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`);
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${nid}`, {
                variabel: nvariabel,
                values: nvalues,
                tokenlogin: fun.random('combwisp', 20)
            }, {
                headers: {
                    'XSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                }
            });
            if(response.data.success) {
                location.reload();
            }
            else {
                console.log('response', response);
                return alert('Terjadi Kesalahan Variabel');
            }
        }
        catch(e) {
            alert(`Terjadi Kesalahan`);
        }
    }

    return (
        <Layoutadmindetil>
            <Myhelmet
                title={`Detil Psikotest Kecermatan | Admin | Psikotest`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`/admin/psikotest/kecermatan/detil`}
            />
            <Appbarku headTitle="Detil Psikotest Kecermatan" isback={true} />
            <main className="p-5 mb-14" key={1}>
                <div className="text-white">
                    <span className="font-bold">Pertanyaan {dataPertanyaan.kolom_x}</span> : [{dataPertanyaan.nilai_A}, {dataPertanyaan.nilai_B}, {dataPertanyaan.nilai_C}, {dataPertanyaan.nilai_D}, {dataPertanyaan.nilai_E}]
                    <table className="border-collapse border-2 border-white-500 w-full">
                        <thead>
                            <tr>
                                <th className="border-2 p-2"><span className="text-lg">Soal</span></th>
                                <th className="border-2 p-2"><span className="text-lg">Jawaban</span></th>
                                <th colSpan="2"><span className="text-lg">Edit / Delete</span></th>
                            </tr>
                        </thead>
                        {dataSoal.map((data, index) => (
                            <tbody key={index}>
                                <tr className="border-t-2">
                                    <td className="p-2 border-r-2 text-center">
                                        <div>
                                            {data[0]}, {data[1]}, {data[2]}, {data[3]}
                                        </div>
                                    </td>
                                    <td className="p-2 border-r-2 text-center">
                                        <div>
                                            {dataJawaban[index]}
                                        </div>
                                    </td>
                                    <td className='p-2 border-r-2 text-center'>
                                        <Link onClick={() => opencloseEdit(`edit-${index}`, data.id, data[0], data[1], data[2], data[3], dataJawaban[index])}>
                                            <span className="mr-2"><EditIcon /></span>
                                        </Link>
                                    </td>
                                    <td className='p-2 border-r-2 text-center'>
                                        <Link>
                                            <DeleteIcon />
                                        </Link>
                                    </td>
                                </tr>
                                <tr id={`edit-${index}`} className="hidden">
                                    <td colSpan="2" className="p-2 text-center">
                                        <div className="font-bold">Edit Soal dan Jawaban</div>
                                        <div className=''>
                                            <TextField id={`soala-${index}`} label="A"
                                                        onChange={handleChange_soalA} focused
                                                        defaultValue={data[0]} variant="outlined"
                                                        sx={styledTextField} />

                                            <TextField id={`soalb-${index}`} label="B"
                                                        onChange={handleChange_soalB} focused
                                                        defaultValue={data[1]} variant="outlined"
                                                        sx={styledTextField} />
                                        </div>
                                        <div className=''>
                                            <TextField id={`soalc-${index}`} label="C"
                                                        onChange={handleChange_soalC} focused
                                                        defaultValue={data[2]} variant="outlined"
                                                        sx={styledTextField} />

                                            <TextField id={`soald-${index}`} label="D"
                                                        onChange={handleChange_soalD} focused
                                                        defaultValue={data[3]} variant="outlined"
                                                        sx={styledTextField} />
                                        </div>
                                        <div className=''>
                                            <TextField id={`jawaban-${index}`} label="Jawaban"
                                                        onChange={handleChange_jawaban} focused
                                                        defaultValue={dataJawaban[index]} variant="outlined"
                                                        sx={styledTextField} />
                                                            
                                            <Box sx={{ m: 1, width: '100%' }}>
                                                <Button variant="contained" size="large" onClick={(e) => submit(e)} sx={{ width: '95%' }}>
                                                    <SaveIcon />
                                                </Button>
                                            </Box>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </main>
        </Layoutadmindetil>
    )
}