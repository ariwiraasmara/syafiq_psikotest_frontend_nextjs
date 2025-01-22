'use client';
const readable = (str) => {
    if (str === null) return null;

    // Langkah pertama: Menggunakan browser API untuk mendekode entitas HTML
    let decodedString = str.replace(/&[^;]+;/g, (match) => {
        let element = document.createElement('div');
        element.innerHTML = match;
        return element.innerText || element.textContent;
    });

    // Langkah kedua: Mengonversi karakter khusus HTML menjadi karakter asli
    return decodedString
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'");
};

const readableDate = (dateStr) => {
    const date = new Date(dateStr);

    // Menggunakan toLocaleDateString untuk format tanggal
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', options);

    console.log(formattedDate); // Output: 24 Desember 2024
}

const currentDate = (type) => {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() + 1;
    const date = getDate.getDate();
    const hour = parseInt(getDate.getHours()) + 1;
    const minute = parseInt(getDate.getMinutes());
    const seconds = parseInt(getDate.getSeconds());

    if(type == 'today') return `${year}-${month}-${date}`;
    else if(type == 'time') return `${hour}:${minute}:${seconds}`;
    else if(type == 'day') return date;
    else if(type == 'month') return month;
    else if(type == 'year') return year;
    else return `${year}-${month}-${date} ${hour}:${minute}:${seconds}`;
}

const encrypt = async (text, key) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(text);
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedData
    );

    return { encryptedData, iv };
};

const decrypt = async (cipher, key) => {
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: cipher.iv,
        },
        key,
        cipher.encryptedData
    );

    return new TextDecoder().decode(decryptedData);
};

const generateKey = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
    return key;
};

const enval = (str, isencrypt = false) => {
    const encoded = btoa(str);
    const hexEncoded = Buffer.from(encoded, 'utf8').toString('hex');

    if (isencrypt) {
        return this.encrypt(hexEncoded);
    }

    return hexEncoded;
};

const denval = (str, isencrypt = false) => {
    let decodedHex;

    if (isencrypt) {
        const decrypted = this.decrypt(str);
        decodedHex = Buffer.from(decrypted, 'hex').toString('utf8');
    } else {
        decodedHex = Buffer.from(str, 'hex').toString('utf8');
    }

    return atob(decodedHex);
};

const random = (str, length = 10) => {
    try {
        let seed;

        switch (str) {
            case 'char':
                seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                break;
            case 'numb':
                seed = '0123456789'.split('');
                break;
            case 'numbwize':
                seed = '123456789'.split('');
                break;
            case 'pass':
                seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:,<.>?'.split('');
                break;
            case 'spec':
                seed = '`~!@#$%^&*()-_=+[{]}|;:,<.>/?/'.split('');
                break;
            case 'combwisp':
                seed = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789'.split('');
                break;
            default:
                seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[{]}|;:,<.>/?/'.split('');
        }

        seed = seed.sort(() => Math.random() - 0.5);

        let rand = '';
        for (let i = 0; i < length; i++) {
            rand += seed[Math.floor(Math.random() * seed.length)];
        }

        return rand;
    } catch (e) {
        console.error('function random() Error: ', e);
    }
};

export {
    readable,
    readableDate,
    currentDate,
    encrypt,
    decrypt,
    generateKey,
    enval,
    denval,
    random,
}

