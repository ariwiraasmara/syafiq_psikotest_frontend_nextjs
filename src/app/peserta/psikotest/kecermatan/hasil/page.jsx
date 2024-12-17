// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import layout from '../../../../layout';
import * as React from 'react';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

import Appbarku from '@/components/Appbarku';
import HasilTes_GrafikKecermatan from '@/components/HasilTes_GrafikKecermatan';
import encodeHtmlEntities from '@/libraries/myfunction';

export default function PesertaPsikotestKecermatanHasil() {

    const searchParams = useSearchParams();
    const paramIdentitas = searchParams.get('identitas');
    const paramTgl_tes = searchParams.get('tgl_tes');
    console.log(paramIdentitas);
    console.log(paramTgl_tes);

    const [dataPeserta, setDataPeserta] = React.useState({});
    const [dataHasiltes, setDataHasiltes] = React.useState({});

    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil-tes/${paramIdentitas}/${paramTgl_tes}`);
            // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil-tes/3604020302950075/2024-12-13`);
            console.log('response', response);
            setDataPeserta(response.data.data.peserta[0]);
            setNama(response.data.data.peserta[0].nama);
            setDataHasiltes(response.data.data.hasiltes[0]);
        }
        catch(err) {
            return err;
            console.log(err);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

    console.log(dataPeserta);
    console.log(dataHasiltes);

    return(
        <div>
            <Appbarku headTitle={`Hasil Psikotest Kecermatan`} />
            <main className="p-4">
                <div>
                    <p><span className="font-bold">Nama :</span> {dataPeserta.nama}</p>
                    <p><span className="font-bold">No. Identitas :</span> {dataPeserta.no_identitas}</p>
                    <p><span className="font-bold">Email :</span> {dataPeserta.email}</p>
                    <p><span className="font-bold">Tanggal Lahir :</span> {dataPeserta.tgl_lahir}</p>
                    <p><span className="font-bold">Usia :</span> {dataPeserta.usia}</p>
                    <p><span className="font-bold">Asal : </span> {dataPeserta.asal}</p>
                    <p><span className="font-bold">Tanggal Tes : </span> {paramTgl_tes}</p>
                </div>
                <div className="mt-4">
                    <HasilTes_GrafikKecermatan 
                        tgl_tes={paramTgl_tes}
                        hasilnilai_kolom_1={dataHasiltes.hasilnilai_kolom_1}
                        hasilnilai_kolom_2={dataHasiltes.hasilnilai_kolom_2}
                        hasilnilai_kolom_3={dataHasiltes.hasilnilai_kolom_3}
                        hasilnilai_kolom_4={dataHasiltes.hasilnilai_kolom_4}
                        hasilnilai_kolom_5={dataHasiltes.hasilnilai_kolom_5}
                        // hasilnilai_kolom_1={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom1')}
                        // hasilnilai_kolom_2={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom2')}
                        // hasilnilai_kolom_3={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom3')}
                        // hasilnilai_kolom_4={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom4')}
                        // hasilnilai_kolom_5={sessionStorage.getItem('nilai_total_psikotest_kecermatan_kolom5')}
                    />
                </div>
            </main>
        </div>
    );
}