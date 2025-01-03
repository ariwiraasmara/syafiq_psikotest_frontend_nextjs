import axios from 'axios';
import fun from '@/libraries/myfunction';
const dbVersion = 5;

const coba = () => {
    return 1;
}

const checkCompatibility = () => {
    if (!window.indexedDB) {
        console.error('Sorry! Your browser does not support IndexedDB');
        // alert("Sorry! Your browser does not support IndexedDB");
        return false;
    }
    console.info('Your Browser support IndexedDB');
    return true;
}

const openDB = async () => {
    try {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open("syafiq_psikotest", dbVersion);

            // Membuat object store dan indeks saat pertama kali membuka atau mengupgrade database
            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                
                // Membuat object store untuk 'pertanyaan' dengan keyPath 'id'
                if (!db.objectStoreNames.contains("pertanyaan_soalpsikotest_kecermatan")) {
                    const table_pertanyaan = db.createObjectStore("pertanyaan_soalpsikotest_kecermatan", { keyPath: "id" });
                    table_pertanyaan.createIndex("id", "id", { unique: true });
                    table_pertanyaan.createIndex("kolom_x", "kolom_x", { unique: false });
                    table_pertanyaan.createIndex("nilai_A", "nilai_A", { unique: false });
                    table_pertanyaan.createIndex("nilai_B", "nilai_B", { unique: false });
                    table_pertanyaan.createIndex("nilai_C", "nilai_C", { unique: false });
                    table_pertanyaan.createIndex("nilai_D", "nilai_D", { unique: false });
                    table_pertanyaan.createIndex("nilai_E", "nilai_E", { unique: false });
                    table_pertanyaan.createIndex("created_at", "created_at", { unique: false });
                    table_pertanyaan.createIndex("updated_at", "updated_at", { unique: false });
                }
    
                // Membuat object store untuk 'soaljawaban' dengan keyPath 'id'
                if (!db.objectStoreNames.contains("soaljawaban_soalpsikotest_kecermatan")) {
                    const table_soaljawaban = db.createObjectStore("soaljawaban_soalpsikotest_kecermatan", { keyPath: "id" });
                    table_soaljawaban.createIndex("id", "id", { unique: true });
                    table_soaljawaban.createIndex("id2001", "id2001", { unique: false });
                    table_soaljawaban.createIndex("soal_jawaban", "soal_jawaban", { unique: false });
                }

                if (!db.objectStoreNames.contains("kuncijawaban_soalpsikotest_kecermatan")) {
                    const table_kuncijawaban = db.createObjectStore("kuncijawaban_soalpsikotest_kecermatan", { keyPath: "id" });
                    table_kuncijawaban.createIndex("id", "id", { unique: true });
                    table_kuncijawaban.createIndex("id2001", "id2001", { unique: false });
                    table_kuncijawaban.createIndex("jawaban", "jawaban", { unique: false });
                }

                console.info('IndexedDB opened successfully');
            };
    
            // Jika sukses membuka database
            request.onsuccess = function(event) {
                resolve(event.target.result);
            };
    
            // Jika terjadi error saat membuka database
            request.onerror = function(event) {
                reject(event.target.error);
            };
        });
    }
    catch(error) {
        return error;
    }
}

// Fungsi untuk mengambil data dari API Laravel
const getPertanyaan = async () => {
    try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
        });
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/indexedDB/psikotest/kecermatan/pertanyaan`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
            headers: {
                'XSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json',
                'indexeddb' : 'syafiq_psikotest',
                'tokenlogin': fun.random('combwisp', 50),
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
        // console.table('table pertanyaan', response.data);
        return response.data;
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return null;
    }
}

const getSoalJawaban = async () => {
    try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
        });
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/indexedDB/psikotest/kecermatan/soaljawaban`, {
            withCredentials: true,  // Mengirimkan cookie dalam permintaan
            headers: {
                'XSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json',
                'indexeddb' : 'syafiq_psikotest',
                'tokenlogin': fun.random('combwisp', 50),
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
        // console.table('table soaljawaban', response.data);
        return response.data;
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return null;
    }
}

// Fungsi untuk menyimpan data ke IndexedDB
const saveDataToDB = async() => {
    try {
        // Ambil data dari API
        const dataTable_pertanyaan = await getPertanyaan();
        // console.log('dataTable_pertanyaan', dataTable_pertanyaan);

        const dataTable_soaljawaban = await getSoalJawaban();
        // console.log('dataTable_soaljawaban', dataTable_soaljawaban);
        
        // Buka IndexedDB
        const db = await openDB();

        // Simpan data 'pertanyaan'
        const transactionPertanyaan = db.transaction("pertanyaan_soalpsikotest_kecermatan", "readwrite");
        const storePertanyaan = transactionPertanyaan.objectStore("pertanyaan_soalpsikotest_kecermatan");

        if(dataTable_pertanyaan != null) {
            // storePertanyaan.put(dataTable_pertanyaan);
            dataTable_pertanyaan.forEach(item => {
                // storePertanyaan.put(item); // Menggunakan put untuk menyimpan data
                let data = {
                    id: item.id,
                    kolom_x : item.kolom_x,
                    nilai_A : item.nilai_A,
                    nilai_B : item.nilai_B,
                    nilai_C : item.nilai_C,
                    nilai_D : item.nilai_D,
                    nilai_E : item.nilai_E,
                    created_at : item.created_at,
                    updated_at : item.updated_at,
                };
                storePertanyaan.put(item);
            });

             // Menunggu transaksi selesai
            transactionPertanyaan.oncomplete = function() {
                console.info("Data pertanyaan berhasil disimpan.");
            };

            // Tangani error transaksi
            transactionPertanyaan.onerror = function() {
                console.info("Error menyimpan data pertanyaan.");
            };
        }
       
        // Simpan data 'soaljawaban'
        const transactionSoaljawaban = db.transaction("soaljawaban_soalpsikotest_kecermatan", "readwrite");
        const storeSoaljawaban = transactionSoaljawaban.objectStore("soaljawaban_soalpsikotest_kecermatan");

        const transactionKuncijawaban = db.transaction("kuncijawaban_soalpsikotest_kecermatan", "readwrite");
        const storeKuncijawaban = transactionKuncijawaban.objectStore("kuncijawaban_soalpsikotest_kecermatan");

        // soaljawabanData.forEach(item => {
        if(dataTable_soaljawaban != null) {
            // storeSoaljawaban.put(dataTable_soaljawaban);
            dataTable_soaljawaban.forEach(item => {
                // storeSoaljawaban.put(item); // Menggunakan put untuk menyimpan data
                let data_soaljawaban = {
                    id: item.id,
                    id2001: item.id2001,
                    soal_jawaban: item.soal_jawaban,
                };
                storeSoaljawaban.put(data_soaljawaban);

                let data_kuncijawaban = {
                    id: item.id,
                    id2001: item.id2001,
                    kunci_jawaban: item.soal_jawaban.jawaban
                };
                storeKuncijawaban.put(data_kuncijawaban);
            });

            transactionSoaljawaban.oncomplete = function() {
                console.info("Data soaljawaban berhasil disimpan.");
            };
    
            transactionSoaljawaban.onerror = function() {
                console.info("Error menyimpan data soaljawaban.");
            };

            transactionKuncijawaban.oncomplete = function() {
                console.info("Data kuncijawaban berhasil disimpan.");
            };

            transactionKuncijawaban.onerror = function() {
                console.info("Error menyimpan data kuncijawaban.");
            };
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}

// Panggil fungsi untuk menyimpan data ke IndexedDB
// saveDataToDB();

//? Table Pertanyaan {
    const readPertanyaan = async (id) => {
        try {
            return new Promise((resolve, reject) => {
                let request = window.indexedDB.open("syafiq_psikotest", dbVersion);
                request.onsuccess = function(event) {
                    let db = event.target.result;
                    let transaction = db.transaction("pertanyaan_soalpsikotest_kecermatan", "readonly");
                    let store = transaction.objectStore("pertanyaan_soalpsikotest_kecermatan");

                    // Membaca data berdasarkan key (id)
                    const byID = store.index('id');
                    let getRequest = byID.get(id); // Mengambil data dengan id = 1

                    getRequest.onsuccess = function() {
                        if (getRequest.result) {
                            console.log("Data ditemukan:", getRequest.result);
                            // return getRequest.result;
                            resolve(getRequest.result);
                        } else {
                            console.log("Data tidak ditemukan.");
                            // return -1;
                            resolve(-1);
                        }
                    };

                    transaction.oncomplete = function() {
                        db.close();
                    };

                    getRequest.onerror = function() {
                        console.error("Gagal mengambil data.");
                        reject('Gagal mengambil data');  // Menangani error
                    };
                };
            });
        }
        catch(error) {
            console.error('error readPertanyaan IndexedDB', error);
            return -1;
        }
    }
//? }

//? Table SoalJawaban {
    //? Create Data Into Table SoalJawaban
    //? Read Data Table SoalJawaban
    const readSoalJawaban = (id) => {
        try {
            return new Promise((resolve, reject) => {
                let request = window.indexedDB.open("syafiq_psikotest", dbVersion);
                request.onsuccess = function(event) {
                    let db = event.target.result;
                    let transaction = db.transaction("soaljawaban_soalpsikotest_kecermatan", "readonly");
                    let store = transaction.objectStore("soaljawaban_soalpsikotest_kecermatan");
                
                    // Membaca data berdasarkan key (id)
                    const byid2001 = store.index('id2001');
                    let getRequest = byid2001.getAll(id); // Mengambil data dengan id = 1
                
                    getRequest.onsuccess = function() {
                        if (getRequest.result) {
                            console.log("Data ditemukan:", getRequest.result);
                            // return getRequest.result;
                            resolve(getRequest.result);
                        } else {
                            console.log("Data tidak ditemukan.");
                            // return -1;
                            resolve(-1);
                        }
                    };

                    transaction.oncomplete = function() {
                        db.close();
                    };

                    getRequest.onerror = function() {
                        console.error("Gagal mengambil data.");
                        reject('Gagal mengambil data');  // Menangani error
                    };
                };
            });
        }
        catch(error) {
            console.error('error readPertanyaan IndexedDB', error);
            return error;
        }
    }
//? }

//? Table KunciJawaban {
    //? Create Data Into Table KunciJawaban
    //? Read Data Table KunciJawaban
    const readKunciJawaban = (id) => {
        try {
            return new Promise((resolve, reject) => {
                let request = window.indexedDB.open("syafiq_psikotest", dbVersion);
                request.onsuccess = function(event) {
                    let db = event.target.result;
                    let transaction = db.transaction("kuncijawaban_soalpsikotest_kecermatan", "readonly");
                    let store = transaction.objectStore("kuncijawaban_soalpsikotest_kecermatan");

                    // Membaca data berdasarkan key (id)
                    const byid2001 = store.index('id2001');
                    let getRequest = byid2001.getAll(id); // Mengambil data dengan id = 1

                    getRequest.onsuccess = function() {
                        if (getRequest.result) {
                            console.log("Data ditemukan:", getRequest.result);
                            // return getRequest.result;
                            resolve(getRequest.result);
                        } else {
                            console.log("Data tidak ditemukan.");
                            // return -1;
                            resolve(-1);
                        }
                    };

                    transaction.oncomplete = function() {
                        db.close();
                    };

                    getRequest.onerror = function() {
                        console.error("Gagal mengambil data.");
                        reject('Gagal mengambil data');  // Menangani error
                    };
                };
            });
        }
        catch(error) {
            console.error('error readPertanyaan IndexedDB', error);
            return error;
        }
    }
//? }

export {
    coba,
    checkCompatibility,
    openDB,
    saveDataToDB,
    readPertanyaan,
    readSoalJawaban,
    readKunciJawaban,
};