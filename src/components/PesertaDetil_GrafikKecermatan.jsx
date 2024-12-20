// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara
import axios from 'axios';
import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function PesertaDetil_GrafikKecermatan(props) {
    const [labels, setLabels] = React.useState([]);
    const [datasets, setDatasets] = React.useState([]);
    const [dataHasilPsikotesKecermatan, setDataHasilPsikotesKecermatan] = React.useState([]);

    const getDataHasilPsikotesKecermatan = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/peserta/hasil-tes/semua/${props.peserta_id}`);
            setDataHasilPsikotesKecermatan(response.data.data);
            // console.log(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        getDataHasilPsikotesKecermatan();

        if (dataHasilPsikotesKecermatan.length > 0) {
            const labels = dataHasilPsikotesKecermatan.map(item => item.tgl_ujian);
            const dataset = [
                {
                    label: 'Hasil Nilai Kolom 1',
                    data: dataHasilPsikotesKecermatan.map(item => item.hasilnilai_kolom_1),
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    color: 'rgba(255, 255, 255, 1)',
                    fill: false,
                },
                {
                    label: 'Hasil Nilai Kolom 2',
                    data: dataHasilPsikotesKecermatan.map(item => item.hasilnilai_kolom_2),
                    borderColor: 'rgba(0, 162, 0, 1)',
                    backgroundColor: 'rgba(0, 162, 0, 0.2)',
                    color: 'rgba(255, 255, 255, 1)',
                    fill: false,
                },
                {
                    label: 'Hasil Nilai Kolom 3',
                    data: dataHasilPsikotesKecermatan.map(item => item.hasilnilai_kolom_3),
                    borderColor: 'rgba(0, 0, 255, 1)',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 1)',
                    fill: false,
                },
                {
                    label: 'Hasil Nilai Kolom 4',
                    data: dataHasilPsikotesKecermatan.map(item => item.hasilnilai_kolom_4),
                    borderColor: 'rgba(255, 255, 0, 1)',
                    backgroundColor: 'rgba(255, 255, 0, 0.2)',
                    color: 'rgba(255, 255, 255, 1)',
                    fill: false,
                },
                {
                    label: 'Hasil Nilai Kolom 5',
                    data: dataHasilPsikotesKecermatan.map(item => item.hasilnilai_kolom_5),
                    borderColor: 'rgba(255, 0, 255, 1)',
                    backgroundColor: 'rgba(255, 0, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 1)',
                    fill: false,
                },
            ];
            setLabels(labels);
            setDatasets(dataset);
        }
    }, [dataHasilPsikotesKecermatan]);

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
                color: 'rgba(255, 255, 255, 1)',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tanggal Ujian',
                    color: 'rgba(255, 255, 255, 1)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Nilai',
                    color: 'rgba(255, 255, 255, 1)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <React.StrictMode>
            <div className="text-white">
                <Line data={chartData} options={optionsData} />
            </div>
        </React.StrictMode>
    );
}
