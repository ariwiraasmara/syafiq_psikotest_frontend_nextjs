// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import {
    checkCompatibility,
    readPertanyaan,
    readSoalJawaban,
    readKunciJawaban,
} from '@/indexedDB/db';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import * as React from 'react';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import debounce from 'lodash.debounce';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Swal from 'sweetalert2';
const Appbarpeserta = dynamic(() => import('@/components/peserta/Appbarpeserta'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { readable, random } from '@/libraries/myfunction';

export default function PesertaPsikotestKecermatan() {
    const router = useRouter();
    const textColor = localStorage.getItem('text-color');
    const borderColor = localStorage.getItem('border-color');
    const [sessionID, setSessionID] = React.useState(parseInt(sessionStorage.getItem('sesi_psikotest_kecermatan') || 1)); // Session ID dimulai dari 1
    // const [safeID, setSafeID] = React.useState(sessionID);
    // const safeID = readable(sessionID);
    const safeID = sessionID;
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoal, setDataSoal] = React.useState([]);
    const [dataJawaban, setDataJawaban] = React.useState([]);
    const [dataSoalJawaban, setDataSoalJawaban] = React.useState([]);
    const [variabel, setVariabel] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [loadingTimer, setLoadingTimer] = React.useState(false);
    const [isDoTest, setIsDoTest] = React.useState(false);

    const [jawabanUser, setJawabanUser] = React.useState({});
    const [nilaiTotal, setNilaiTotal] = React.useState(0);
    const nilaiTotalRef = React.useRef(nilaiTotal);

    const handleChange_nilaiTotal = React.useCallback((event, index, kuncijawaban) => {
        const value = parseInt(event.target.value);
        console.info('handleChange_nilaiTotal: value', value);

        const correctAnswer = parseInt(kuncijawaban);
        // const correctAnswer = parseInt(kuncijawaban);
        console.info('handleChange_nilaiTotal: correctAnswer', correctAnswer);

        // Update jawabanUser untuk setiap perubahan
        setJawabanUser(prevjawabanuser => {
            const newAnswers = { ...prevjawabanuser, [index]: value };
            // Update nilaiTotal berdasarkan jawaban yang benar atau salah
            console.info('jawabanUser', jawabanUser);
            console.info('prevjawabanuser', prevjawabanuser);
            return newAnswers;
        });

        /**
        setNilaiTotal(prevnilaitotal => {
            if (value === correctAnswer) {
                const res = prevnilaitotal + 1; // Menambahkan 1 jika jawabannya benar
                nilaiTotalRef.current = res;
                sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom${sessionID}`, nilaiTotalRef.current);
                console.info('nilaiTotalRef', nilaiTotalRef);
                console.info('jawaban benar', res);
                return res;
            } else {
                // const res =  prev > 0 ? prev - 1 : 0; // Mengurangi 1 jika jawabannya salah, tapi tidak kurang dari 0
                const res = prevnilaitotal - 0; // Ketika jawaban salah, nilai tidak berkurang maupun bertambah
                console.info('jawaban salah', res);
                return res;
            }
        });
         */

        setNilaiTotal(prevnilaitotal => {
            console.log(`jawabanUser${index}`, jawabanUser);
            if(jawabanUser[index]) { //? Mengecek jika jawabanUser sudah tersedia atau belum
                //? jika ya
                if(value === correctAnswer) { //? ketika jawaban benar
                    const res = prevnilaitotal + 1; // Bertambah 1
                    nilaiTotalRef.current = res;
                    sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom${sessionID}`, nilaiTotalRef.current);
                    // console.info('nilaiTotalRef', nilaiTotalRef);
                    console.info('jawaban benar', res);
                    return res;
                }
                else { //? ketika jawaban salah
                    const res = prevnilaitotal - 1; //? Berkurang 1
                    console.info('jawaban salah', res);
                    return res;
                    //? alasan karena ketika user bermain curang maka bagian ini tertrigger ketika user  hanya memindahkan radio button saja.
                }
            }
            else {
                //? jika tidak
                if (value === correctAnswer) { // ketika jawaban benar
                    const res = prevnilaitotal + 1; // bertambah 1
                    nilaiTotalRef.current = res;
                    sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom${sessionID}`, nilaiTotalRef.current);
                    // console.info('nilaiTotalRef', nilaiTotalRef);
                    console.info('jawaban benar', res);
                    return res;
                } else { //? ketika jawaban salah
                    const res = prevnilaitotal - 0; //? nilai tidak bertambah maupun berkurang
                    console.info('jawaban salah', res);
                    return res;
                }
            }
            //? tujuannya untuk menghindari kecurangan.
        });

        // nilaiTotalRef.current = nilaiTotal;
        // console.info('handleChange_nilaiTotal: jawabanUser', jawabanUser);
        // console.info('handleChange_nilaiTotal: nilaiTotal', nilaiTotal);
    }); // => "[]" dihapus karena tidak terpakai

    // Mendapatkan data soal dan jawaban
    const getData = async () => {
        setLoading(true);
        try {
            if(!checkCompatibility) {
                alert('Browser Tidak Support');
                router.push(`/peserta`);
            }
            else {
                setLoadingTimer(true);
                // const pertanyaan = await readPertanyaan(sessionID);
                // const soal = await readSoalJawaban(sessionID);
                // const jawaban = await readKunciJawaban(sessionID);
                axios.defaults.withCredentials = true;
                axios.defaults.withXSRFToken = true;
                const csrfToken1 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                });
                const response_pertanyaan = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/indexedDB/psikotest/kecermatan/pertanyaan/${sessionID}`, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    headers: {
                        'XSRF-TOKEN': csrfToken1,
                        'Content-Type': 'application/json',
                        'indexeddb' : 'syafiq_psikotest',
                        'tokenlogin': random('combwisp', 50),
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
                const csrfToken2 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                });
                const response_soaljawaban = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/indexedDB/psikotest/kecermatan/soaljawaban/${sessionID}`, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    headers: {
                        'XSRF-TOKEN': csrfToken2,
                        'Content-Type': 'application/json',
                        'indexeddb' : 'syafiq_psikotest',
                        'tokenlogin': random('combwisp', 50),
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

                console.info('resresponse_pertanyaan', response_pertanyaan);
                setDataPertanyaan(response_pertanyaan.data[0]);

                console.info('resresponse_soaljawaban', response_soaljawaban);
                setDataSoalJawaban(response_soaljawaban.data);
                // setDataJawaban(jawaban);
                setJawabanUser({});
                setNilaiTotal(0);
                sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom${sessionID}`, 0);
                sessionStorage.setItem(`sisawaktu_pengerjaan_peserta_psikotest_kecermatan_sesi${sessionID}`, 0);
                setLoadingTimer(false);
            }
        }
        catch (error) {
            console.error('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    }

    const getVariabel = async() => {
        setLoadingTimer(true);
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/1`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.APP_FAST_API_KEY,
                    'XSRF-TOKEN': csrfToken,
                    'tokenlogin': random('combwisp', 50),
                }
            });
            setIsDoTest(false);
            setVariabel(response.data.data[0].values);
            setTimeLeft(response.data.data[0].values);
            setIsDoTest(true);
        }
        catch(err) {
            console.info('Error getVariabel halaman Peserta', err);
        }
        setLoadingTimer(false);
    }

    /*const getVariabel = async () => {
        setIsDoTest(false);
        setLoadingTimer(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('/peserta/psikotest/kecermatan/get-variabel');

            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                // Menyimpan data dari cache ke state
                setVariabel(cachedData[0].values);
                setTimeLeft(cachedData[0].values); // Mengambil waktu awal

                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/1`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-KEY': process.env.APP_FAST_API_KEY,
                            'XSRF-TOKEN': csrfToken,
                            'tokenlogin': random('combwisp', 50),
                        }
                    });
                    const apiData = apiResponse.data.data;

                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');

                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('/peserta/psikotest/kecermatan/get-variabel');
                        await cache.delete('/peserta/psikotest/kecermatan/get-variabel');
                        // console.log('Data lama dihapus dari cache');

                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('/peserta/psikotest/kecermatan/get-variabell', newResponse);
                        // console.log('Data baru disimpan ke cache');

                        // Update data dengan data terbaru dari API
                        setVariabel(apiResponse.data.data[0].values);
                        setTimeLeft(apiResponse.data.data[0].values); // Mengambil waktu awal
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
                }/
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.log('Data tidak ditemukan di cache');

                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/1`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-KEY': process.env.APP_FAST_API_KEY,
                            'XSRF-TOKEN': csrfToken,
                            'tokenlogin': random('combwisp', 50),
                        }
                    });
                    const data = response.data.data;
                    // Menyimpan data ke state
                    setVariabel(response.data.data[0].values);
                    setTimeLeft(response.data.data[0].values); // Mengambil waktu awal

                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('/peserta/psikotest/kecermatan/get-variabel');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('/peserta/psikotest/kecermatan/get-variabel', cacheResponse);
                    console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.log('Terjadi Error PesertaPsikotestKecermatan-getVariabel:', error);
        }
        setLoadingTimer(false);
        setIsDoTest(true);
    };*/

    // Format waktu menjadi menit:detik
    const formatTime = (time) => {
        const minutes = Math.floor(time / parseInt(variabel));
        const seconds = time % parseInt(variabel);
        return `${minutes} menit ${seconds} detik`;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if(parseInt(sessionID) > 5) {
            submit();
        }
        else {
            getData();
            getVariabel()
            if(isDoTest) {
                let hasUpdatedSessionID = false;
                const interval = setInterval(() => {
                    setTimeLeft((prevTime) => {
                        if (prevTime <= 0 && !hasUpdatedSessionID) {
                            setSessionID((prevSessionID) => {
                                const nextSessionID = prevSessionID + 1;
                                sessionStorage.setItem('sesi_psikotest_kecermatan', nextSessionID);
                                return nextSessionID;
                            });
                            hasUpdatedSessionID = true;
                            clearInterval(interval);
                            // Menyimpan nilaiTotal setelah interval selesai dengan sedikit penundaan
                            setTimeout(() => {
                                if (sessionID > 5) {
                                    submit();
                                } else {
                                    router.push(`/peserta/psikotest/kecermatan/`);
                                }
                            }, 60000); // Menunda penyimpanan nilaiTotal beberapa detik
                        }
                        let res = prevTime - 1;
                        sessionStorage.setItem(`sisawaktu_pengerjaan_peserta_psikotest_kecermatan_sesi${sessionID}`, res);
                        return res;
                    });
                }, 1000);
                return () => clearInterval(interval);
            }
        }
    }, [sessionID, isDoTest, nilaiTotalRef]);

    const MemoSoal = React.memo(({ soal1, soal2, soal3, soal4 }) => {
        return(
            <div className='text-center'>
                <span className="mr-4">{soal1}</span>
                <span className="mr-4">{soal2}</span>
                <span className="mr-4">{soal3}</span>
                <span className="mr-4">{soal4}</span>
            </div>
        )
    });

    const MemoRadioGroup_Jawaban = React.memo(({ index }) => {
        return (
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={jawabanUser[index] || ''}
                onChange={(event) => handleChange_nilaiTotal(event, index, dataJawaban[index].kunci_jawaban)}
            >
                <FormControlLabel value={dataPertanyaan.nilai_A} control={<Radio />} label="A" />
                <FormControlLabel value={dataPertanyaan.nilai_B} control={<Radio />} label="B" />
                <FormControlLabel value={dataPertanyaan.nilai_C} control={<Radio />} label="C" />
                <FormControlLabel value={dataPertanyaan.nilai_D} control={<Radio />} label="D" />
                <FormControlLabel value={dataPertanyaan.nilai_E} control={<Radio />} label="E" />
            </RadioGroup>
        );
    }, []);

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Psikotest Kecermatan | Psikotest Online App`}
                pathURL={`/peserta/psikotest/kecermatan`}
                robots={`none, nosnippet, noarchive, notranslate, noimageindex`}
            />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Peserta / Psikotest / Kecermatan`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer />
        );
    });

    const submit = async() => {
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta-hasil-tes/${parseInt(readable(sessionStorage.getItem(`id_peserta_psikotest`)))}`, {
                hasilnilai_kolom_1: parseInt(readable(sessionStorage.getItem(`nilai_total_psikotest_kecermatan_kolom1`))),
                hasilnilai_kolom_2: parseInt(readable(sessionStorage.getItem(`nilai_total_psikotest_kecermatan_kolom2`))),
                hasilnilai_kolom_3: parseInt(readable(sessionStorage.getItem(`nilai_total_psikotest_kecermatan_kolom3`))),
                hasilnilai_kolom_4: parseInt(readable(sessionStorage.getItem(`nilai_total_psikotest_kecermatan_kolom4`))),
                hasilnilai_kolom_5: parseInt(readable(sessionStorage.getItem(`nilai_total_psikotest_kecermatan_kolom5`)))
            }, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.APP_FAST_API_KEY,
                    'XSRF-TOKEN': csrfToken,
                    'tokenlogin': random('combwisp', 50),
                }
            });

            console.info('response', response);
            if(parseInt(response.data.success)) {
                sessionStorage.removeItem('sesi_psikotest_kecermatan');
                router.push(`/peserta/psikotest/kecermatan/hasil?identitas=${sessionStorage.getItem('no_identitas_peserta_psikotest')}&tgl_tes=${localStorage.getItem('tgl_tes_peserta_psikotest')}`);
            }
            console.info('Tidak dapat menyimpan data sesi');
        }
        catch(err) {
            console.info('Terjadi Error PesertaPsikotestKecermatan-submit:', err);
        }
    }

    const onNextSession = (e) => {
        e.preventDefault();
        setSessionID((prevSessionID) => {
            const nextSessionID = prevSessionID + 1;
            sessionStorage.setItem('sesi_psikotest_kecermatan', nextSessionID);
            return nextSessionID;
        });
        router.push(`/peserta/psikotest/kecermatan/`);
    }

    return (<>
        <MemoHelmet />
        <MemoNavBreadcrumb />
        <div className={`${textColor}`}>
            <h1 className='hidden'>Halaman Psikotest Kecermatan Peserta</h1>
            {loading ? (
                <h2 className='text-center p-8'>
                    <p><span className='font-bold text-2lg'>
                        Sedang memuat data... Mohon Harap Tunggu...
                    </span></p>
                    <CircularProgress color="info" size={50} />
                </h2>
            ) : (
                sessionID > 5 ? (
                    <h2 className='text-center p-8'>
                        <p><span className='font-bold text-2lg'>
                            Tes Telah Berakhir!<br/>
                            Harap Tunggu!<br/>
                            Sedang Menyimpan Data Jawaban Anda...<br/>
                            Setelah Menyimpan Sistem Akan Pindah Ke Halaman Hasil..
                        </span></p>
                        <CircularProgress color="info" size={50} />
                    </h2>
                ) : (
                    <div className="text-center p-8">
                        {loadingTimer ? (
                            <h2 className='text-center'>
                                <p><span className='font-bold text-2lg'>
                                    Sedang memuat data... Mohon Harap Tunggu...
                                </span></p>
                                <CircularProgress color="info" size={50} />
                            </h2>
                        ) : (
                            <>
                                <Appbarpeserta
                                    kolom_x={dataPertanyaan.kolom_x}
                                    timer={formatTime(timeLeft)}
                                    soalA={dataPertanyaan.nilai_A}
                                    soalB={dataPertanyaan.nilai_B}
                                    soalC={dataPertanyaan.nilai_C}
                                    soalD={dataPertanyaan.nilai_D}
                                    soalE={dataPertanyaan.nilai_E}
                                />
                                <div className={`mt-12`}>
                                    <h2 className='hidden'>Soal Psikotest Kecermatan {dataPertanyaan.kolom_x}</h2>
                                    <FormControl>
                                        {dataSoalJawaban.map((data, index) => (
                                            <div className="border-4 mt-4 rounded-lg w-full border-black p-2 content-center bg-gray-400" id={`row${index}`} key={index}>
                                                <MemoSoal
                                                    soal1={data.soal_jawaban.soal[0][0]}
                                                    soal2={data.soal_jawaban.soal[0][1]}
                                                    soal3={data.soal_jawaban.soal[0][2]}
                                                    soal4={data.soal_jawaban.soal[0][3]}
                                                />
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    value={jawabanUser[index] || ''}
                                                    onChange={(event) => handleChange_nilaiTotal(event, index, data.soal_jawaban.jawaban)}
                                                >
                                                    <FormControlLabel value={dataPertanyaan.nilai_A} control={<Radio />} label="A" />
                                                    <FormControlLabel value={dataPertanyaan.nilai_B} control={<Radio />} label="B" />
                                                    <FormControlLabel value={dataPertanyaan.nilai_C} control={<Radio />} label="C" />
                                                    <FormControlLabel value={dataPertanyaan.nilai_D} control={<Radio />} label="D" />
                                                    <FormControlLabel value={dataPertanyaan.nilai_E} control={<Radio />} label="E" />
                                                </RadioGroup>
                                            </div>
                                        ))
                                        }
                                    </FormControl>
                                </div>
                                <div className={`mt-4 border-t border-${borderColor}`}>
                                    <Button variant="contained" size="large" fullWidth
                                            color="secondary" title='Sesi Selanjutnya'
                                            onClick={(e) => onNextSession(e)}
                                            sx={{ marginTop: '10px' }}
                                            type="button" endIcon={<NavigateNextIcon />}
                                    >
                                        Sesi Selanjutnya
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                )
            )}
        </div>
        <MemoFooter />
    </>)
}