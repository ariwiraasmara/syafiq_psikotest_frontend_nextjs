// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutpeserta from '@/components/layout/Layout';
import axios from 'axios';
import * as React from 'react';
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

const Appbarku = dynamic(() => import('@/components/Appbarku'), {
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
const TabelHasilPsikotestKecermatan = dynamic(() => import('@/components/peserta/TabelHasilPsikotestKecermatan'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const GrafikHasilPsikotestKecermatan = dynamic(() => import('@/components/peserta/GrafikHasilPsikotestKecermatan'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { random } from '@/libraries/myfunction';

export default function PesertaPsikotestKecermatanHasil() {
    const searchParams = useSearchParams();
    // const [paramIdentitas, setParamIdentitas] = React.useState(0);
    let paramIdentitas = 0;
    // const [paramTgl_tes, setParamTgl_tes] = React.useState();
    let paramTgl_tes = '';

    const textColor = localStorage.getItem('text-color');
    const borderColor = localStorage.getItem('border-color');
    const [dataPeserta, setDataPeserta] = React.useState({});
    const [dataHasiltes, setDataHasiltes] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const getData = async () => {
        setLoading(true); // Menandakan bahwa proses loading sedang berjalan
        paramIdentitas = parseInt(searchParams.get('identitas'));
        paramTgl_tes = searchParams.get('tgl_tes');
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta-hasil-tes/${paramIdentitas}/${paramTgl_tes}`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.APP_FAST_API_KEY,
                    'XSRF-TOKEN': csrfToken,
                    'tokenlogin': random('combwisp', 50),
                }
            });
            const data = response.data.data;
            console.log('response data peserta dan hasil', response);
            // Menyimpan data ke state
            setDataPeserta(response.data.data.peserta[0]);
            setDataHasiltes(response.data.data.hasiltes[0]);
        }
        catch(err) {
            console.info('Terjadi Error PesertaPsikotestKecermatanHasil-getData:', err);
        }
        setLoading(false);
    };

    const filteredMemo_dataHasiltes = React.memo(dataHasiltes, [dataHasiltes]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);

    // console.table('Data Peserta', dataPeserta);
    // console.table('Data Hasil Psikotest Kecermatan Peserta', filteredMemo_dataHasiltes.type);

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Hasil Psikotest Kecermatan | Psikotest Online App`}
                pathURL={`/peserta/psikotest/kecermatan/hasil?identitas=${searchParams.get('identitas')}&tgl_tes=${searchParams.get('tgl_tes')}`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Hasil Psikotest Kecermatan" isback={true} url={`/`} />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Peserta / Psikotest / Kecermatan / Hasil`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer hidden={`hidden`} />
        );
    });

    return(
    <>
        <MemoHelmet />
        <MemoAppbarku />
        <MemoNavBreadcrumb />
        <div className={`p-4 ${textColor}`}>
            <h1 className='hidden'>Halaman Hasil Psikotest Kecermatan Peserta {dataPeserta.nama}</h1>
            {loading ? (
                <h2 className='text-center'>
                    <p><span className='font-bold text-2lg'>
                        Sedang memuat data... Mohon Harap Tunggu...
                    </span></p>
                    <CircularProgress color="info" size={50} />
                </h2>
            ) : (
                <div>
                    <div>
                        <h2 className='font-bold underline text-lg'>Profil Peserta</h2>
                        <p><span className="font-bold">Nama :</span> {dataPeserta.nama}</p>
                        <p><span className="font-bold">No. Identitas :</span> {dataPeserta.no_identitas}</p>
                        <p><span className="font-bold">Email :</span> {dataPeserta.email}</p>
                        <p><span className="font-bold">Tanggal Lahir :</span> {dataPeserta.tgl_lahir}</p>
                        <p><span className="font-bold">Usia :</span> {dataPeserta.usia}</p>
                        <p><span className="font-bold">Asal : </span> {dataPeserta.asal}</p>
                        <p><span className="font-bold">Tanggal Tes : </span> {dataHasiltes.tgl_ujian}</p>
                    </div>
                    <div className={`mt-4 p-2 rounded-lg bg-white border-2 border-${borderColor}`}>
                        <h3 className='hidden'>Peserta : {dataPeserta.nama}</h3>
                        <TabelHasilPsikotestKecermatan
                            hasilnilai_kolom_1={dataHasiltes.hasilnilai_kolom_1}
                            hasilnilai_kolom_2={dataHasiltes.hasilnilai_kolom_2}
                            hasilnilai_kolom_3={dataHasiltes.hasilnilai_kolom_3}
                            hasilnilai_kolom_4={dataHasiltes.hasilnilai_kolom_4}
                            hasilnilai_kolom_5={dataHasiltes.hasilnilai_kolom_5}
                        />
                        <GrafikHasilPsikotestKecermatan
                            tgl_tes={paramTgl_tes}
                            hasilnilai_kolom_1={dataHasiltes.hasilnilai_kolom_1}
                            hasilnilai_kolom_2={dataHasiltes.hasilnilai_kolom_2}
                            hasilnilai_kolom_3={dataHasiltes.hasilnilai_kolom_3}
                            hasilnilai_kolom_4={dataHasiltes.hasilnilai_kolom_4}
                            hasilnilai_kolom_5={dataHasiltes.hasilnilai_kolom_5}
                            textColor={textColor}
                        />
                    </div>
                </div>
            )}
        </div>
        <MemoFooter />
    </>
    );
}