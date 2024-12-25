'use client';
import axios from 'axios';

export default {
    readable: (str) => {
        let textarea = document.createElement('textarea');
        textarea.textContent = str;
        return textarea.innerHTML;
    },
    csrfToken: async() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        return await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`);
    },
    encrypt: async (text, key) => {
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
    },
    decrypt: async (cipher, key) => {
        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: cipher.iv,
            },
            key,
            cipher.encryptedData
        );

        return new TextDecoder().decode(decryptedData);
    },
    generateKey: async () => {
        const key = await window.crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256,
            },
            true,
            ["encrypt", "decrypt"]
        );
        return key;
    },
    enval: (str, isencrypt = false) => {
        const encoded = btoa(str);
        const hexEncoded = Buffer.from(encoded, 'utf8').toString('hex');

        if (isencrypt) {
            return this.encrypt(hexEncoded);
        }

        return hexEncoded;
    },
    denval: (str, isencrypt = false) => {
        let decodedHex;

        if (isencrypt) {
            const decrypted = this.decrypt(str);
            decodedHex = Buffer.from(decrypted, 'hex').toString('utf8');
        } else {
            decodedHex = Buffer.from(str, 'hex').toString('utf8');
        }

        return atob(decodedHex);
    },
    random: (str, length = 10) => {
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
                    seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
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
    },
}

