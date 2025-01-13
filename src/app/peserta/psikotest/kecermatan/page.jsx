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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import debounce from 'lodash.debounce';

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
    const [sessionID, setSessionID] = React.useState(parseInt(sessionStorage.getItem('sesi_psikotest_kecermatan') || 1)); // Session ID dimulai dari 1
    // const [safeID, setSafeID] = React.useState(sessionID);
    // const safeID = readable(sessionID);
    const safeID = sessionID;
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoal, setDataSoal] = React.useState([]);
    const [dataJawaban, setDataJawaban] = React.useState([]);
    const [dataSoalJawaban, setDataSoalJawaban] = React.useState([]);
    const [variabel, setVariabel] = React.useState([]);
    const [timeLeft, setTimeLeft] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [loadingTimer, setLoadingTimer] = React.useState(true);

    const [jawabanUser, setJawabanUser] = React.useState({});
    const [nilaiTotal, setNilaiTotal] = React.useState(0);
    const nilaiTotalRef = React.useRef(nilaiTotal);
    const lastRadioRef = React.useRef(null);

    const debouncedChange = React.useCallback(
        debounce((event, index) => handleChange_nilaiTotal(event, index), 300),
        []
    );

    const handleChange_nilaiTotal = React.useCallback((event, index, kuncijawaban) => {
        const value = parseInt(event.target.value);
        console.info('handleChange_nilaiTotal: value', value);

        const correctAnswer = parseInt(kuncijawaban);
        // const correctAnswer = parseInt(kuncijawaban);
        console.info('handleChange_nilaiTotal: correctAnswer', correctAnswer);

        // Update jawabanUser untuk setiap perubahan
        setJawabanUser(prev => {
            const newAnswers = { ...prev, [index]: value };
            return newAnswers;
        });
        console.info('handleChange_nilaiTotal: jawabanUser', jawabanUser);

        // Update nilaiTotal berdasarkan jawaban yang benar atau salah
        setNilaiTotal(prev => {
            if (value === correctAnswer) {
                const res = prev + 1; // Menambahkan 1 jika jawabannya benar
                console.info('jawaban benar', res);
                return res;
            } else {
                // const res =  prev > 0 ? prev - 1 : 0; // Mengurangi 1 jika jawabannya salah, tapi tidak kurang dari 0
                const res = prev - 0; // Ketika jawaban salah, nilai tidak berkurang maupun bertambah
                console.info('jawaban salah', res);
                return res;
            }
        });

        console.info('handleChange_nilaiTotal: nilaiTotal', nilaiTotal);
    }); // => "[]" dihapus karena tidak terpakai

    // Mendapatkan data soal dan jawaban
    const getData = async () => {
        setLoading(true);
        try {
            if(!sessionStorage.getItem('id_peserta_psikotest') ||
                !sessionStorage.getItem('nama_peserta_psikotest') ||
                !sessionStorage.getItem('no_identitas_peserta_psikotest') ||
                !sessionStorage.getItem('email_peserta_psikotest') ||
                !sessionStorage.getItem('tgl_lahir_peserta_psikotest') ||
                !sessionStorage.getItem('asal_peserta_psikotest') ||
                !sessionStorage.getItem('sesi_psikotest_kecermatan') ||
                !localStorage.getItem('tgl_tes_peserta_psikotest')
            ) {
                Swal.fire({
                    title: "Oooppss..",
                    text: "Anda tidak diperkenankan untuk mengambil tes psikotest kecermatan ini!",
                    showConfirmButton: true,
                    confirmButtonText: "Ya",
                    icon: "error",
                }).then((result) => {
                    window.location.href = '/';
                });
            }
            else {
                if(!checkCompatibility) {
                    alert('Browser Tidak Support');
                    return router.push(`/peserta`);
                }
                const pertanyaan = await readPertanyaan(sessionID);
                const soal = await readSoalJawaban(sessionID);
                const jawaban = await readKunciJawaban(sessionID);
                setDataPertanyaan(pertanyaan);
                setDataSoalJawaban(soal);
                setDataJawaban(jawaban);
                setJawabanUser({});
            }
        }
        catch (error) {
            console.error('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    }

    /*const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('peserta/psikotest/kecermatan/mulai-tes');

            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                // Menyimpan data dari cache ke state
                setDataPertanyaan(cachedData.pertanyaan[0]);
                setDataSoal(cachedData.soal);
                setDataJawaban(cachedData.jawaban);

                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${safeID}`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                        headers: {
                            'XSRF-TOKEN': csrfToken,
                            'Content-Type': 'application/json',
                            'tokenlogin': random('combwisp', 50),
                        }
                    });
                    const apiData = apiResponse.data.data;

                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');

                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('peserta/psikotest/kecermatan/mulai-tes');
                        await cache.delete('peserta/psikotest/kecermatan/mulai-tes');
                        // console.log('Data lama dihapus dari cache');

                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('peserta/psikotest/kecermatan/mulai-tes', newResponse);
                        // console.log('Data baru disimpan ke cache');

                        // Update data dengan data terbaru dari API
                        setDataPertanyaan(apiResponse.data.data.pertanyaan[0]);
                        setDataSoal(apiResponse.data.data.soal);
                        setDataJawaban(apiResponse.data.data.jawaban);
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data terbaru:', error);
                }
            } else {
                // Jika data tidak ditemukan di cache, ambil dari API
                console.log('Data tidak ditemukan di cache');

                try {
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${safeID}`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                        headers: {
                            'XSRF-TOKEN': csrfToken,
                            'Content-Type': 'application/json',
                            'tokenlogin': random('combwisp', 50),
                        }
                    });
                    const data = response.data.data;
                    // Menyimpan data ke state
                    setDataPertanyaan(response.data.data.pertanyaan[0]);
                    setDataSoal(response.data.data.soal);
                    setDataJawaban(response.data.data.jawaban);

                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('peserta/psikotest/kecermatan/mulai-tes');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('peserta/psikotest/kecermatan/mulai-tes', cacheResponse);
                    console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    };*/

    const getVariabel = async () => {
        setLoadingTimer(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('/peserta/psikotest/kecermatan/get-variabel');

            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                // Menyimpan data dari cache ke state
                setVariabel(cachedData[0]);
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
                        setVariabel(apiResponse.data.data[0]);
                        setTimeLeft(apiResponse.data.data[0].values); // Mengambil waktu awal
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
                    setVariabel(response.data.data[0]);
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
            console.log('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoadingTimer(false);
    };

    const submit = async(e) => {
        e?.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil-tes/${parseInt(readable(sessionStorage.getItem(`id_peserta_psikotest`)))}`, {
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
                router.push(`
                    /peserta/psikotest/kecermatan/hasil?
                    identitas=${readable(sessionStorage.getItem('no_identitas_peserta_psikotest'))}
                    &tgl_tes=${readable(sessionStorage.getItem('tgl_tes_peserta_psikotest'))}
                `);
            }
            console.error('Tidak dapat menyimpan data sesi');
        }
        catch(err) {
            console.error('Terjadi Kesalahan Untuk menyimpan data sesi', err);
        }
    }

    // Format waktu menjadi menit:detik
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes} menit ${seconds} detik`;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
        getVariabel();

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
                        sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom${sessionID}`, nilaiTotalRef.current);
                        console.info("Nilai total disimpan:", nilaiTotalRef.current);
                        setJawabanUser({});        // Reset jawaban user
                        setNilaiTotal(0);          // Reset nilaiTotal
                        // setTimeLeft(variabel.values); // Reset waktu sesuai dengan nilai default variabel
                        if (sessionID > 5) {
                            submit();
                        } else {
                            // window.location.reload();
                            router.push(`/peserta/psikotest/kecermatan/`);
                        }
                    }, 10000); // Menunda penyimpanan nilaiTotal beberapa detik
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [sessionID, router]);

    const scrollPositionRef = React.useRef(0); // Menyimpan posisi scroll
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        nilaiTotalRef.current = nilaiTotal;
        console.log('Jawaban User:', jawabanUser);
        console.log('Nilai Total:', nilaiTotal);
        scrollPositionRef.current = window.scrollY;
        if (sessionID > 5) {
            submit();
        }
        else {
            router.push(`/peserta/psikotest/kecermatan`);
        }
    }, [scrollPositionRef.current]);
    
    React.useLayoutEffect(() => {
        const savedScrollPosition = scrollPositionRef;
        if (savedScrollPosition) {
            window.scrollTo(0, scrollPositionRef.current);
        }
    }, []);

    const MemoSoal = React.memo(({ soal1, soal2, soal3, soal4 }) => {
        return(
            <div>
                <span className="mr-4">{soal1}</span>
                <span className="mr-4">{soal2}</span>
                <span className="mr-4">{soal3}</span>
                <span className="mr-4">{soal4}</span>
            </div>
        )
    });

    const FormControlOptimized = React.memo(({ data, index, handleChange }) => {
        return (
            <div className="border-2 mt-4 rounded-lg border-white p-4 bg-gray-700" id={`row${index}`} key={index}>
                {/* <div>{data[0]}, {data[1]}, {data[2]}, {data[3]}</div> */}
                <MemoSoal
                    soal1={data[0]}
                    soal2={data[1]}
                    soal3={data[2]}
                    soal4={data[3]}
                />
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={jawabanUser[index] || ''}
                    onChange={(event) => handleChange(event, index)}
                >
                    <FormControlLabel value={dataPertanyaan.nilai_A} control={<Radio />} label="A" />
                    <FormControlLabel value={dataPertanyaan.nilai_B} control={<Radio />} label="B" />
                    <FormControlLabel value={dataPertanyaan.nilai_C} control={<Radio />} label="C" />
                    <FormControlLabel value={dataPertanyaan.nilai_D} control={<Radio />} label="D" />
                    <FormControlLabel value={dataPertanyaan.nilai_E} control={<Radio />} label="E" />
                </RadioGroup>
            </div>
        );
    }, [jawabanUser]);

    FormControlOptimized.propTypes = {
        index: PropTypes.number,
        data: PropTypes.any,
        handleChange: PropTypes.any
    };

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

    return (
    <>
        <MemoHelmet />
        <MemoNavBreadcrumb />
        <div>
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
                            Harap Tunggu! Anda akan dialihkan ke halaman hasil!
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
                                <div className="mt-8 border-white p-4">
                                    <h2 className='hidden'>Soal Psikotest Kecermatan {dataPertanyaan.kolom_x}</h2>
                                    <FormControl>
                                        {
                                        /*dataSoal.map((data, index) => (
                                            <FormControlOptimized
                                                key={index}
                                                data={data}
                                                index={index}
                                                handleChange={handleChange_nilaiTotal}
                                            />
                                        )) dataSoal */
                                        dataSoalJawaban.map((data, index) => (
                                            <div className="border-2 mt-4 rounded-lg border-white p-4 bg-gray-700" id={`row${index}`} key={index}>
                                                {/* <div>
                                                    <span className="mr-4">{data.soal_jawaban.soal[0][0]}</span>
                                                    <span className="mr-4">{data.soal_jawaban.soal[0][1]}</span>
                                                    <span className="mr-4">{data.soal_jawaban.soal[0][2]}</span>
                                                    <span className="mr-4">{data.soal_jawaban.soal[0][3]}</span>
                                                </div> */}
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
                                                    onChange={(event) => handleChange_nilaiTotal(event, index, dataJawaban[index].kunci_jawaban)}
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
                            </>
                        )}
                    </div>
                )
            )}
        </div>
        <MemoFooter />
    </>
    )
}