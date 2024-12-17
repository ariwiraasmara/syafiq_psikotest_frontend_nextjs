// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../../../secondlayoutadmin';
import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';
import encodeHtmlEntities from '@/libraries/myfunction';

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
}

export default function DetilPsikotestKecermatan(props) {

    const sessionID = sessionStorage.getItem('kecermatan_id');
    const safeID = encodeHtmlEntities(sessionID);
    console.log(safeID);

    const [data, setData] = React.useState([]);
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoal, setDataSoal] = React.useState([]);
    const [dataJawaban, setDataJawaban] = React.useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${safeID}`);
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
    const opencloseEdit = (varid) => {
        document.getElementById(varid).classList.toggle('hidden');
    }

    const [nilaiA, setNilaiA] = React.useState(0);
    const [nilaiB, setNilaiB] = React.useState(0);
    const [nilaiC, setNilaiC] = React.useState(0);
    const [nilaiD, setNilaiD] = React.useState(0);
    const [nilaiE, setNilaiE] = React.useState(0);
    const [jawaban, setJawaban] = React.useState(0);

    const handleChange_nilaiA = (event, index) => {
        setNilaiA(event.target.value);
    };

    const handleChange_nilaiB = (event, index) => {
        setNilaibB(event.target.value);
    };

    const handleChange_nilaiC = (event, index) => {
        setNilaiC(event.target.value);
    };

    const handleChange_nilaiD = (event, index) => {
        setNilaiD(event.target.value);
    };

    const handleChange_nilaiE = (event, index) => {
        setNilaiE(event.target.value);
    };

    const handleChange_Jawaban = (event, index) => {
        setJawaban(event.target.value);
    };

    return (
        <Layoutadmin>
            <Myhelmet
                title={`Detil Psikotest Kecermatan | Admin | Psikotest`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
            />
            <Appbarku headTitle="Detil Psikotest Kecermatan" />
            <main className="p-5 mb-14" key={1}>
                <div className="text-white">
                    <span className="font-bold">Pertanyaan {dataPertanyaan.kolom_x}</span> : [{dataPertanyaan.nilai_A}, {dataPertanyaan.nilai_B}, {dataPertanyaan.nilai_C}, {dataPertanyaan.nilai_D}, {dataPertanyaan.nilai_E}]
                    <table className="border-collapse border-2 border-white-500 w-full">
                        <thead>
                            <tr>
                                <th className="border-2 p-2"><span className="text-lg">Soal</span></th>
                                <th className="border-2 p-2"><span className="text-lg">Jawaban</span></th>
                            </tr>
                        </thead>
                        {dataSoal.map((data, index) => (
                            <tbody key={index}>
                                <tr className="border-t-2">
                                    <td className="p-2 border-r-2">
                                        <div>
                                            {data[0]}, {data[1]}, {data[2]}, {data[3]}
                                        </div>
                                        <Link onClick={() => opencloseEdit(`edit-${index}`)}>
                                            <span className="mr-2"><EditIcon /></span>
                                        </Link>
                                        <Link>
                                            <DeleteIcon />
                                        </Link>
                                    </td>
                                    <td className="p-2">
                                        <div>
                                            {dataJawaban[index]}
                                        </div>
                                        <Link onClick={() => opencloseEdit(`jawaban-${index}`)}>
                                            <span className="mr-2"><EditIcon /></span>
                                        </Link>
                                        <Link>
                                            <DeleteIcon />
                                        </Link>
                                    </td>
                                </tr>
                                <tr id={`edit-${index}`} className="hidden">
                                    <td colSpan="2" className="p-2">
                                        <div className="w-full">
                                            <div className="font-bold">Edit Soal</div>
                                            <div>
                                                <TextField id={`nilaia-${index}`} label="A"
                                                            onChange={handleChange_nilaiA}
                                                           defaultValue={data[0]} variant="standard"
                                                           sx={styledTextField} />

                                                <TextField id={`nilaib-${index}`} label="B"
                                                            onChange={handleChange_nilaiB}
                                                           defaultValue={data[1]} variant="standard"
                                                           sx={styledTextField} />

                                                <TextField id={`nilaic-${index}`} label="C"
                                                            onChange={handleChange_nilaiC}
                                                           defaultValue={data[2]} variant="standard"
                                                           sx={styledTextField} />

                                                <TextField id={`nilaid-${index}`} label="D"
                                                            onChange={handleChange_nilaiD}
                                                           defaultValue={data[3]} variant="standard"
                                                           sx={styledTextField} />

                                                <Button variant="contained" size="large" onClick={() => submitNilai()}>
                                                    <SaveIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr id={`jawaban-${index}`} className="hidden">
                                    <td colSpan="2" className="p-2">
                                        <div className="w-full">
                                            <div className="font-bold">Edit Jawaban</div>
                                            <div>
                                                <TextField id={`jawaban-${index}`} label="Jawaban"
                                                            onChange={handleChange_Jawaban}
                                                            defaultValue={dataJawaban[index]} variant="standard"
                                                            sx={styledTextField} />

                                                <Button variant="contained" size="large" onClick={() => submitJawaban()}>
                                                    <SaveIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </main>
        </Layoutadmin>
    )
}