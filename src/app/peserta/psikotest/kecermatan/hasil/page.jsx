// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutpeserta from '../../../../layoutpeserta';
import * as React from 'react';
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic';
import axios from 'axios';

const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const HasilTes_GrafikKecermatan = dynamic(() => import('@/components/HasilTes_GrafikKecermatan'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});

export default function PesertaPsikotestKecermatanHasil() {
    const [paramIdentitas, setParamIdentitas] = React.useState(0);
    const [paramTgl_tes, setParamTgl_tes] = React.useState('');

    const [dataPeserta, setDataPeserta] = React.useState({});
    const [dataHasiltes, setDataHasiltes] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        const searchParams = useSearchParams();
        setParamIdentitas(searchParams.get('identitas'));
        setParamTgl_tes(searchParams.get('tgl_tes'));
        try {
            const cacheResponse = await caches.match('peserta/psikotest/kecermatan/hasil-tes');

            if (cacheResponse) {
                // Jika data ditemukan dalam cache
                // console.log('Data ditemukan di cache:', cacheResponse);

                const cachedData = await cacheResponse.json();
                // Set data dari cache ke state
                // Menyimpan data dari cache ke state
                setDataPeserta(cachedData.peserta[0]);
                setDataHasiltes(cachedData.hasiltes[0]);

                // Cek waktu atau versi data di server jika memungkinkan
                try {
                    axios.defaults.withCredentials = true;
                    axios.defaults.withXSRFToken = true;
                    const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    });
                    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil-tes/${paramIdentitas}/${paramTgl_tes}`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                        headers: {
                            'XSRF-TOKEN': csrfToken,
                            'Content-Type': 'application/json',
                            'tokenlogin': fun.random('combwisp', 50),
                        }
                    });
                    const apiData = apiResponse.data.data;

                    // Cek apakah ada pembaruan data
                    if (JSON.stringify(cachedData) !== JSON.stringify(apiData)) {
                        // console.log('Data diperbarui. Menyimpan data baru ke cache');

                        // Hapus data lama dari cache dan simpan yang baru
                        const cache = await caches.open('peserta/psikotest/kecermatan');
                        await cache.delete('peserta/psikotest/kecermatan');
                        // console.log('Data lama dihapus dari cache');

                        // Menyimpan data baru ke cache
                        const newResponse = new Response(JSON.stringify(apiData), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                        await cache.put('peserta/psikotest/kecermatan', newResponse);
                        // console.log('Data baru disimpan ke cache');

                        // Update data dengan data terbaru dari API
                        setDataPeserta(apiResponse.data.data.peserta[0]);
                        setDataHasiltes(apiResponse.data.data.hasiltes[0]);
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil-tes/${paramIdentitas}/${paramTgl_tes}`, {
                        withCredentials: true,  // Mengirimkan cookie dalam permintaan
                        headers: {
                            'XSRF-TOKEN': csrfToken,
                            'Content-Type': 'application/json',
                            'tokenlogin': fun.random('combwisp', 50),
                        }
                    });
                    const data = response.data.data;
                    // Menyimpan data ke state
                    setDataPeserta(response.data.data.peserta[0]);
                    setDataHasiltes(response.data.data.hasiltes[0]);

                    // Menyimpan data ke cache setelah berhasil mendapatkan data
                    const cache = await caches.open('peserta/psikotest/kecermatan');
                    const cacheResponse = new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    await cache.put('peserta/psikotest/kecermatan', cacheResponse);
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

    React.useEffect(() => {
        getData();
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    const filteredDataPeserta = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return dataPeserta;
    }, [dataPeserta]);

    const filteredDataHasilTes = React.useMemo(() => {
        // return variabels.filter(item => item.values > 10); // Contoh: hanya menampilkan variabel dengan values > 10
        return dataHasiltes;
    }, [dataHasiltes]);

    console.table('Data Peserta', dataPeserta);
    console.table('Data Hasil Psikotest Kecermatan Peserta', dataHasiltes);

    return(
        <Layoutpeserta>
            <Myhelmet
                title='Hasil Psikotest Kecermatan | Psikotest Online App'
                description={`Halaman Hasil Psikotest Kecermatan Peserta ${filteredDataPeserta.nama}`}
                pathURL='peserta/psikotest/kecermatan/hasil'
            />
            <Appbarku headTitle="Hasil Psikotest Kecermatan" />
            <main className="p-4">
                {loading ? (
                    <div className='text-center'>
                        <p><span className='font-bold text-2lg'>Loading...</span></p>
                    </div>
                ) : (
                    <div>
                        <div>
                            <p><span className="font-bold">Nama :</span> {filteredDataPeserta.nama}</p>
                            <p><span className="font-bold">No. Identitas :</span> {filteredDataPeserta.no_identitas}</p>
                            <p><span className="font-bold">Email :</span> {filteredDataPeserta.email}</p>
                            <p><span className="font-bold">Tanggal Lahir :</span> {filteredDataPeserta.tgl_lahir}</p>
                            <p><span className="font-bold">Usia :</span> {filteredDataPeserta.usia}</p>
                            <p><span className="font-bold">Asal : </span> {filteredDataPeserta.asal}</p>
                            <p><span className="font-bold">Tanggal Tes : </span> {paramTgl_tes}</p>
                        </div>
                        <div className="mt-4">
                            <HasilTes_GrafikKecermatan
                                tgl_tes={paramTgl_tes}
                                hasilnilai_kolom_1={filteredDataHasilTes.hasilnilai_kolom_1}
                                hasilnilai_kolom_2={filteredDataHasilTes.hasilnilai_kolom_2}
                                hasilnilai_kolom_3={filteredDataHasilTes.hasilnilai_kolom_3}
                                hasilnilai_kolom_4={filteredDataHasilTes.hasilnilai_kolom_4}
                                hasilnilai_kolom_5={filteredDataHasilTes.hasilnilai_kolom_5}
                                // hasilnilai_kolom_1={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom1')}
                                // hasilnilai_kolom_2={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom2')}
                                // hasilnilai_kolom_3={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom3')}
                                // hasilnilai_kolom_4={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom4')}
                                // hasilnilai_kolom_5={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom5')}
                            />
                        </div>
                    </div>
                )}
            </main>
        </Layoutpeserta>
    );
}