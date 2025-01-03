// Fungsi untuk menyimpan data dengan waktu kadaluwarsa
function set(storage, key, value, expirationTime) {
    const data = {
        value: value,
        expiry: new Date().getTime() + expirationTime // expirationTime dalam milidetik
    };
    storage.setItem(key, JSON.stringify(data));
}

// Fungsi untuk mengambil data dengan pengecekan waktu kadaluwarsa
function get(storage, key) {
    const data = JSON.parse(storage.getItem(key));
    if (!data) {
        return null; // Data tidak ditemukan
    }
    // Jika data sudah kadaluarsa, hapus dan kembalikan null
    if (new Date().getTime() > data.expiry) {
        storage.removeItem(key);
        return null;
    }
    return data.value; // Kembalikan nilai data jika masih valid
}

export { set, get }