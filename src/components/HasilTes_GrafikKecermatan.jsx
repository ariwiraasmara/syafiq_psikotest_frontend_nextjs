// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

HasilTes_GrafikKecermatan.propTypes = {
    hasilnilai_kolom_1: PropTypes.number,
    hasilnilai_kolom_2: PropTypes.number,
    hasilnilai_kolom_3: PropTypes.number,
    hasilnilai_kolom_4: PropTypes.number,
    hasilnilai_kolom_5: PropTypes.number
};

export default function HasilTes_GrafikKecermatan(props) {
    // Daftar label untuk grafik (Kolom)
    const label = [
        'Kolom 1',
        'Kolom 2',
        'Kolom 3',
        'Kolom 4',
        'Kolom 5',
    ];

    // Menyusun dataset secara dinamis berdasarkan nilai kolom yang ada di props
    const dataset = {
        label: 'Hasil Psikotes Kecermatan',
        datasets: [{
            label: 'Nilai',
            data: [
                props.hasilnilai_kolom_1,
                props.hasilnilai_kolom_2,
                props.hasilnilai_kolom_3,
                props.hasilnilai_kolom_4,
                props.hasilnilai_kolom_5,
            ],
            fill: false,
            borderColor: 'rgba(200, 200, 255, 1)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(200, 200, 255, 1)',
            pointRadius: 5,
        },],
    };

    // Menyusun data chart
    const chartData = {
        labels: label,
        datasets: dataset.datasets,
    };

    // Opsi konfigurasi untuk grafik
    const optionsData = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Grafik Hasil Psikotes Kecermatan',
                color: 'rgba(255, 255, 255, 1)',
                font: {
                size: 18,
                },
            },
            tooltip: {
                callbacks: {
                label: (context) => {
                    return `${context.dataset.label}: ${context.raw}`;
                },
                },
            },
        },
        scales: {
            x: {
                title: {
                display: true,
                text: 'Kolom',
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
