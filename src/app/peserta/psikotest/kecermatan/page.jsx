// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutpeserta from '../../../layoutpeserta';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as React from 'react';
import { List } from 'million/react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import debounce from 'lodash.debounce';


import Appbarpeserta from '@/components/peserta/Appbarpeserta';
import fun from '@/libraries/myfunction';

export default function PesertaPsikotestKecermatan() {
    const router = useRouter();
    const [sessionID, setSessionID] = React.useState(parseInt(sessionStorage.getItem('sesi_psikotest_kecermatan') || 1)); // Session ID dimulai dari 1
    const safeID = fun.readable(sessionID);
    const [data, setData] = React.useState([]);
    const [dataPertanyaan, setDataPertanyaan] = React.useState([]);
    const [dataSoal, setDataSoal] = React.useState([]);
    const [dataJawaban, setDataJawaban] = React.useState([]);
    const [variabel, setVariabel] = React.useState([]);
    const [timeLeft, setTimeLeft] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const [jawabanUser, setJawabanUser] = React.useState({});
    const [nilaiTotal, setNilaiTotal] = React.useState(0);

    const debouncedChange = React.useCallback(
        debounce((event, index) => handleChange_nilaiTotal(event, index), 300),
        []
    );
      

    const handleChange_nilaiTotal = React.useCallback((event, index) => {
        const value = event.target.value;
        const correctAnswer = dataJawaban[index];
      
        // Update jawabanUser untuk setiap perubahan
        setJawabanUser(prev => {
          const newAnswers = { ...prev, [index]: value };
          return newAnswers;
        });
      
        // Update nilaiTotal berdasarkan jawaban yang benar atau salah
        setNilaiTotal(prev => {
          if (value === correctAnswer) {
            return prev + 1; // Menambahkan 1 jika jawabannya benar
          } else {
            return prev > 0 ? prev - 1 : 0; // Mengurangi 1 jika jawabannya salah, tapi tidak kurang dari 0
          }
        });
      }, [dataJawaban]);      

    // Mendapatkan data soal dan jawaban
    /*
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
    */

    const getData = async () => {
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
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${safeID}`);
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/kecermatan/soaljawaban/${safeID}`);
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
            console.log('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    };

    const getVariabel = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        try {
            const cacheResponse = await caches.match('peserta/psikotest/kecermatan/get-variabel');

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
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/1`);
                    const apiData = apiResponse.data.data;

                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');

                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('peserta/psikotest/kecermatan/get-variabel');
                        await cache.delete('peserta/psikotest/kecermatan/get-variabel');
                        // console.log('Data lama dihapus dari cache');

                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('peserta/psikotest/kecermatan/get-variabel', newResponse);
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting/1`);
                    const data = response.data.data;
                    // Menyimpan data ke state
                    setVariabel(response.data.data[0]);
                    setTimeLeft(response.data.data[0].values); // Mengambil waktu awal

                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('peserta/psikotest/kecermatan/get-variabel');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('peserta/psikotest/kecermatan/get-variabel', cacheResponse);
                    console.log('Data disimpan ke cache');
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengambil data:', error);
                }
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat memeriksa cache:', error);
        }
        setLoading(false);
    };

    // Format waktu menjadi menit:detik
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes} menit ${seconds} detik`;
    };

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
                sessionStorage.setItem(`nilai_total_psikotest_kecermatan_kolom${sessionID}`, nilaiTotal);
      
                if (sessionID > 5) {
                  router.push(`/peserta/psikotest/kecermatan/hasil?identitas=${sessionStorage.getItem('no_identitas_peserta_psikotest')}&tgl_tes=${sessionStorage.getItem('tgl_tes_peserta_psikotest')}`);
                } else {
                  window.location.reload();
                }
              }, 500); // Menunda penyimpanan nilaiTotal beberapa detik
            }
            return prevTime - 1;
          });
        }, 1000);
      
        return () => clearInterval(interval);
      }, [sessionID, nilaiTotal, router]);

    React.useEffect(() => {
        console.info('nilai Total', nilaiTotal);
        if (sessionID > 5) {
            router.push(`/peserta/psikotest/kecermatan/hasil?identitas=${sessionStorage.getItem('no_identitas_peserta_psikotest')}&tgl_tes=${sessionStorage.getItem('tgl_tes_peserta_psikotest')}`);
        }
    }, [sessionID, router]);

    // console.log('dataJawaban', dataJawaban);

    const FormControlOptimized = React.memo(({ data, index, handleChange }) => {
        return (
          <div className="border-2 mt-4 rounded-lg border-white p-4 bg-gray-700" id={`row${index}`} key={index}>
            <div>{data[0]}, {data[1]}, {data[2]}, {data[3]}</div>
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
      });      

    return (
        <Layoutpeserta>
            <main>
                {loading ? (
                    <div className='text-center p-8'>
                        <p><span className='font-bold text-2lg'>Loading...</span></p>
                    </div>
                ) : (
                    <div className="text-center p-8">
                        <Appbarpeserta 
                            kolom_x={dataPertanyaan.kolom_x}
                            timer={formatTime(timeLeft)}
                            soalA={dataPertanyaan.nilai_A}
                            soalB={dataPertanyaan.nilai_B}
                            soalC={dataPertanyaan.nilai_C}
                            soalD={dataPertanyaan.nilai_D}
                            soalE={dataPertanyaan.nilai_E}
                        />
                        <div className="mt-8 border-t-2 border-b-2 border-white p-4">
                            <FormControl>
                                {dataSoal.map((data, index) => (
                                    <FormControlOptimized
                                        key={index}
                                        data={data}
                                        index={index}
                                        handleChange={handleChange_nilaiTotal}
                                    />
                                ))}
                            </FormControl>
                        </div>
                    </div>
                )}
            </main>
        </Layoutpeserta>
    )
}