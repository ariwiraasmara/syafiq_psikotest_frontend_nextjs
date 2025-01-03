// Fungsi untuk menghasilkan kunci AES
async function generateKey() {
    const key = await crypto.subtle.generateKey(
        {
            name: "AES-GCM", // Algoritma enkripsi
            length: 256, // Ukuran kunci (256-bit)
        },
        true, // Kunci ini dapat digunakan untuk operasi enkripsi dan dekripsi
        ["encrypt", "decrypt"] // Operasi yang diizinkan
    );
    return key;
}

// Fungsi untuk mengenkripsi data
async function encryptData(key, data) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector (IV) untuk AES-GCM
    const encodedData = new TextEncoder().encode(data); // Encode data menjadi byte array
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv, // IV yang digunakan untuk enkripsi
        },
        key, // Kunci yang digunakan untuk enkripsi
        encodedData // Data yang akan dienkripsi
    );
    return { encryptedData, iv }; // Mengembalikan data terenkripsi dan IV
}

// Fungsi untuk mendekripsi data
async function decryptData(key, encryptedData, iv) {
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv, // IV yang digunakan untuk dekripsi (harus sama dengan yang digunakan saat enkripsi)
        },
        key, // Kunci yang digunakan untuk dekripsi
        encryptedData // Data yang akan didekripsi
    );
    // Mengubah byte array hasil dekripsi menjadi string
    const decoder = new TextDecoder();
    const decodedData = decoder.decode(decryptedData);
    return decodedData; // Mengembalikan data yang sudah didekripsi
}

/**
 * ? Contoh penggunaan untuk di modul lain
    async function encryption() {
        let cobacrypt = 'Hello tes';
        const key = await generateKey();
        const { encryptedData, iv } = await encryptData(key, cobacrypt);
        console.log("Encrypted Data:", new Uint8Array(encryptedData));

        const decryptedData = await decryptData(key, encryptedData, iv);
        console.log("Decrypted Data:", decryptedData);
    }
 */

export {
    generateKey,
    encryptData,
    decryptData
}