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
      const iv = window.crypto.getRandomValues(new Uint8Array(12));  // IV acak
      const encodedData = new TextEncoder().encode(data);  // Encoding data ke dalam bentuk array byte
      const encryptedData = await window.crypto.subtle.encrypt(
          {
              name: "AES-GCM",
              iv: iv,
          },
          key,  // Kunci untuk enkripsi
          encodedData
      );
  
      return { encryptedData, iv };
    },

    decrypt: async (cipher, key) => {
      const decryptedData = await window.crypto.subtle.decrypt(
          {
              name: "AES-GCM",
              iv: iv,
          },
          key,  // Kunci untuk dekripsi
          encryptedData
      );

      return new TextDecoder().decode(decryptedData);
    },

    generateKey: async () => {
      const key = await window.crypto.subtle.generateKey(
          {
              name: "AES-GCM",
              length: 256,  // Ukuran kunci 256-bit
          },
          true,  // Kunci dapat digunakan untuk enkripsi dan dekripsi
          ["encrypt", "decrypt"]
      );
      return key;
    },
  

    enval: (str, isencrypt = false) => {
      const encoded = btoa(str);  // Menggunakan base64 encoding
      const hexEncoded = Buffer.from(encoded, 'utf8').toString('hex');  // Mengonversi ke hex
  
      if (isencrypt) {
          return encrypt(hexEncoded);  // Fungsi enkripsi, Anda harus mendefinisikan enkripsi sendiri
      }
      
      return hexEncoded;
    },

    denval: (str, isencrypt = false) => {
      let decodedHex;
    
      if (isencrypt) {
          const decrypted = decrypt(str);  // Fungsi dekripsi, Anda harus mendefinisikan dekripsi sendiri
          decodedHex = Buffer.from(decrypted, 'hex').toString('utf8');  // Dekode dari hex ke string
      } else {
          decodedHex = Buffer.from(str, 'hex').toString('utf8');  // Dekode dari hex ke string
      }
  
      return atob(decodedHex);  // Dekode base64 menjadi string asli
    },

    getHari: (str) => {
      try {
          const date = new Date(str);
          const options = { weekday: 'long' };  // Mengambil nama hari panjang (e.g., 'Monday')
          return date.toLocaleDateString('id-ID', options); // id-ID untuk bahasa Indonesia
      } catch (e) {
          return "function Hari() Error: " + e;
      }
    },

    getTanggal: (str, pemisah, format, jam) => {
      try {
          const date = new Date(str);
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

          let formattedDate;

          if (format === 'dmy') {
              formattedDate = date.toLocaleDateString('id-ID', options).split('/').reverse().join(pemisah);
          } else if (format === 'ymd') {
              formattedDate = date.toLocaleDateString('id-ID', options).split('/').join(pemisah);
          } else {
              formattedDate = date.toLocaleDateString('id-ID', options);
          }

          if (jam === 'Yes') {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const seconds = date.getSeconds().toString().padStart(2, '0');
              return formattedDate + ` ${hours}:${minutes}:${seconds}`;
          }

          return formattedDate;
      } catch (e) {
          return "function getBulan() Error: " + e;
      }
    },

    getTanggalAkhir: ($str, $pemisah, $format, $jam) => {
      try {
          const date = new Date(str);
          const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          return lastDay.getDate();
      } catch (e) {
          return "function getTanggalAkhir() Error: " + e;
      }
    },

    getBulan: () => {
      try {
          const date = new Date(str);
          const options = { year: 'numeric', month: 'long' }; // Format bulan dan tahun

          if (bulan === 'Angka') {
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              return tahun === 'Yes' ? `${month} ${date.getFullYear()}` : month;
          } else if (bulan === 'Nama') {
              return tahun === 'Yes' ? date.toLocaleDateString('id-ID', options) : date.toLocaleDateString('id-ID', { month: 'long' });
          } else {
              return date.toLocaleDateString('id-ID', options);
          }
      } catch (e) {
          return "function getBulan() Error: " + e;
      }
    },

    random: (str, length = 10) => {
        try {
            let seed;

            // Tentukan jenis karakter berdasarkan parameter `str`
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
                    seed = '`~!@#$%^&*()-_=+[{]}\'\"|;:,<.>/?/'.split('');
                    break;
                case 'combwisp':
                    seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
                    break;
                default:
                    seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[{]}\'\"|;:,<.>/?/'.split('');
            }

            // Acak urutan seed
            seed = seed.sort(() => Math.random() - 0.5);  // Sort untuk mengacak array

            // Ambil karakter secara acak dari seed
            let rand = '';
            for (let i = 0; i < length; i++) {
                rand += seed[Math.floor(Math.random() * seed.length)];
            }

            return rand;
        } catch (e) {
            console.error('function random() Error: ', e);
        }
    }
}
