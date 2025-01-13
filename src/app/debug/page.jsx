'use client';
import {
    checkCompatibility,
	openDB,
    saveDataToDB,
    readPertanyaan,
    readSoalJawaban,
	readKunciJawaban
} from '@/indexedDB/db';
import axios from 'axios';
import * as React from 'react';
import { getToken, getUniqueToken, getVariabel } from '@/api/api';

export default function Page() {

	const [dataUniqueToken, setDatauniqueToken] = React.useState();
	const [datagetVariabel, setDatagetVariabel] = React.useState();

	const [soaljawaban, setSoaljawaban] = React.useState([]);
	const [dataJawaban, setDataJawaban] = React.useState([]);

	const useDB = async() => {
		try {
			const db = await openDB();  // Tunggu hasil promise selesai
			console.log("Database berhasil dibuka:", db);
			// Anda dapat melanjutkan menggunakan db untuk operasi lebih lanjut
		} catch (error) {
			console.error("Terjadi kesalahan saat membuka database:", error);
		}
	}

	const dataPertanyaan = async () => {
		try {
			const res = await readPertanyaan(1);  // Tunggu hasil promise selesai
			console.log("Table Pertanyaan:", res);
			// Anda dapat melanjutkan menggunakan db untuk operasi lebih lanjut
		} catch (error) {
			console.error("Terjadi kesalahan saat membuka database:", error);
		}
	}

	const dataSoalJawaban = async() => {
		try {
			const res = await readSoalJawaban(1);  // Tunggu hasil promise selesai
			setSoaljawaban(res);
			console.log("Table Soal Jawaban:", soaljawaban);
			// Anda dapat melanjutkan menggunakan db untuk operasi lebih lanjut
		} catch (error) {
			console.error("Terjadi kesalahan saat membuka database:", error);
		}
	}

	const dataKunciJawaban = async() => {
		try {
			const res = await readKunciJawaban(1);  // Tunggu hasil promise selesai
			setDataJawaban(res);
			console.log("Table Kunci Jawaban:", dataJawaban);
		} catch (error) {
			console.error("Terjadi kesalahan saat membuka database:", error);
		}
	}

	const getData = () => {
		// setDatauniqueToken(getUniqueToken());
		// console.log('getUniqueToken', dataUniqueToken);

		// setDatagetVariabel(getVariabel(1));
		// console.log('getVariabel', datagetVariabel);

		if(checkCompatibility) {
			console.info('coba', coba.name);
			useDB();
			saveDataToDB();
			dataPertanyaan();
			dataSoalJawaban();
			dataKunciJawaban();
		}
	}

	React.useEffect(() => {
        getData();
    }, []);

	return (
		<>
			<h1>Page</h1>
			<p>Page content</p>
			{soaljawaban.map((data, index) =>{
				<div>
					<p>{data.id}</p>
					<p>{data.id2001}</p>
					<p>{data.soal_jawaban.soal[0][0]}, {data.soal_jawaban.soal[0][1]}, {data.soal_jawaban.soal[0][2]}, {data.soal_jawaban.soal[0][3]}</p>
				</div>
			})}
		</>
	);
}
