// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutpeserta from '../../../layoutpeserta';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Myhelmet from '@/components/Myhelmet';

const NavigationSession = (props) => {
    if(props.isadmin) {
        return(
            <div className="flex flex-col static">
                <div className="grow w-fullstatic">
                    <div className="inset-x-0 top-0 h-16 p-2 flex justify-between">
                        <div className="order-first">
                            <Button variant="contained" onClick={() => previousSession()} size="medium" >
                                <ArrowBackIcon />
                            </Button>
                        </div>
                            
                        <div className="order-last">
                            <Button variant="contained" onClick={() => nextSession()} size="medium" >
                                <ArrowForwardIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default function PesertaPsikotestKecermatan() {
    const router = useRouter();
    const [sessionID, setSessionID] = React.useState(parseInt(sessionStorage.getItem('sesi_psikotest_kecermatan') || 1)); // Session ID dimulai dari 1
    const safeID = encodeHtmlEntities(sessionID);
    const [data, setData] = React.useState([]);
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoal, setDataSoal] = React.useState([]);
    const [dataJawaban, setDataJawaban] = React.useState([]);
    const [variabel, setVariabel] = React.useState([]);
    const [timeLeft, setTimeLeft] = React.useState();

    const [jawabanUser, setJawabanUser] = React.useState({});
    const [nilaiTotal, setNilaiTotal] = React.useState(0);
    const handleChange_nilaiTotal = (event, index) => {
        const value = event.target.value;
        const correctAnswer = dataJawaban[index];

        // Update jawabanUser for this question
        setJawabanUser((prev) => {
            const newAnswers = { ...prev, [index]: value };
            return newAnswers;
        });

        // Check if the answer is correct or not
        if (value === correctAnswer) {
            // If the answer is correct, increment the score
            setNilaiTotal((prev) => prev + 1);
        } else {
            // If the answer is incorrect, decrement the score
            setNilaiTotal((prev) => (prev > 0 ? prev - 1 : 0));
        }
    };

    // Mendapatkan data soal dan jawaban
    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${safeID}`);
            setData(response.data);
            setDataPertanyaan(response.data.data.pertanyaan[0]);
            setDataSoal(response.data.data.soal);
            setDataJawaban(response.data.data.jawaban);
        } catch (err) {
            console.error(err);
        }
    }

    // Mendapatkan data variabel waktu
    const getVariabel = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/1`);
            setVariabel(response.data.data[0]);
            setTimeLeft(response.data.data[0].values); // Mengambil waktu awal
        } catch (err) {
            console.error(err);
        }
    }

    // Format waktu menjadi menit:detik
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes} menit ${seconds} detik`;
    };

    React.useEffect(() => {
        getData();
        getVariabel();

        // Flag untuk memastikan pembaruan sessionID hanya terjadi sekali
        let hasUpdatedSessionID = false;

        // Membuat interval untuk countdown setiap detik
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0 && !hasUpdatedSessionID) {
                    // Jika waktu habis dan sessionID belum diperbarui
                    setSessionID((prevSessionID) => {
                        const nextSessionID = prevSessionID + 1;
                        sessionStorage.setItem('sesi_psikotest_kecermatan', nextSessionID);
                        return nextSessionID;
                    });

                    // Set flag untuk memastikan sessionID hanya diupdate sekali
                    hasUpdatedSessionID = true;

                    // Menghentikan interval setelah waktu habis
                    clearInterval(interval);

                    // Jika sessionID lebih dari 5, arahkan ke halaman hasil
                    if (sessionID > 5) {
                        sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom${sessionID}`, nilaiTotal);
                        router.push(`/peserta/psikotest/kecermatan/hasil?identitas=${sessionStorage.getItem('no_identitas')}`);
                    } else {
                        // Refresh halaman setelah sessionID diperbarui
                        window.location.reload(); // Refresh halaman
                    }

                    return 0; // Mengatur timeLeft ke 0 setelah interval dihentikan
                }
                return prevTime - 1; // Mengurangi waktu setiap detik
            });
        }, 1000);

        // Menghentikan interval ketika komponen unmount
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if (sessionID > 5) {
            router.push(`/peserta/psikotest/kecermatan/hasil?identitas=${sessionStorage.getItem('no_identitas')}`);
        }
    }, [sessionID, router]);

    console.log('dataJawaban', dataJawaban);

    return (
        <Layoutpeserta>
            <Myhelmet
                title='Psikotest Sedang Berlangsung... | Psikotest Online App'
                description='Psikotest Online App'
                keywords='Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind'
                pathURL='/peserta'
            />
            <main>
                <div className="text-center p-8">
                    <TableContainer component={Paper} className="border-b-2">
                        <Table aria-label="standard table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" align="center" colSpan={5}>
                                        <span className="font-bold">{dataPertanyaan.kolom_x}</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="td" align="center">{dataPertanyaan.nilai_A}</TableCell>
                                    <TableCell component="td" align="center">{dataPertanyaan.nilai_B}</TableCell>
                                    <TableCell component="td" align="center">{dataPertanyaan.nilai_C}</TableCell>
                                    <TableCell component="td" align="center">{dataPertanyaan.nilai_D}</TableCell>
                                    <TableCell component="td" align="center">{dataPertanyaan.nilai_E}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="td" align="center">A</TableCell>
                                    <TableCell component="td" align="center">B</TableCell>
                                    <TableCell component="td" align="center">C</TableCell>
                                    <TableCell component="td" align="center">D</TableCell>
                                    <TableCell component="td" align="center">E</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="mt-8 border-t-2 border-b-2 border-white p-4">
                        <h3 className="text-lg">Waktu : {formatTime(timeLeft)}</h3>
                        <FormControl>
                            {dataSoal.map((data, index) => (
                                <div className="border-2 mt-4 rounded-lg border-white p-4 bg-gray-700" id={`row${index}`} key={index}>
                                    <div>{data[0]}, {data[1]}, {data[2]}, {data[3]}</div>

                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={jawabanUser[index] || ''}
                                        onChange={(event) => handleChange_nilaiTotal(event, index)}
                                    >
                                        <FormControlLabel value={dataPertanyaan.nilai_A} control={<Radio />} label="A" />
                                        <FormControlLabel value={dataPertanyaan.nilai_B} control={<Radio />} label="B" />
                                        <FormControlLabel value={dataPertanyaan.nilai_C} control={<Radio />} label="C" />
                                        <FormControlLabel value={dataPertanyaan.nilai_D} control={<Radio />} label="D" />
                                        <FormControlLabel value={dataPertanyaan.nilai_E} control={<Radio />} label="E" />
                                    </RadioGroup>
                                </div>
                            ))}
                        </FormControl>
                    </div>
                </div>
            </main>
        </Layoutpeserta>
    )
}