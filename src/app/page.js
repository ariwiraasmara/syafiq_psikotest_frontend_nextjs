// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import dynamic from 'next/dynamic';
import {
    checkCompatibility,
	openDB,
    saveDataToDB
} from '@/indexedDB/db';
import Link from '@mui/material/Link';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const FooterLinkSEORel = dynamic(() => import('@/components/FooterLinkSEORel'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Homepage_Header = dynamic(() => import('@/components/homepage/Homepage_Header'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Homepage_Navbar = dynamic(() => import('@/components/homepage/Homepage_Navbar'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Homepage_Welcome = dynamic(() => import('@/components/homepage/Homepage_Welcome'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Homepage_About = dynamic(() => import('@/components/homepage/Homepage_About'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Carousel = dynamic(() => import('@/components/homepage/carousel/Carousel'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});

export default function Home() {
    const UseDB = async() => {
		try {
			const db = await openDB();  // Tunggu hasil promise selesai
			// console.info("Database berhasil dibuka:", db);
			// Anda dapat melanjutkan menggunakan db untuk operasi lebih lanjut
		} catch (error) {
			console.error("Terjadi kesalahan saat membuka database:", error);
		}
	}

    const indexedDB = () => {
		if(checkCompatibility) {
			UseDB();
			saveDataToDB();
            /*
            if ('storage' in navigator && 'persist' in navigator.storage) {
                navigator.storage.persist().then((isPersistent) => {
                    if (!isPersistent) {
                        console.log('Penyimpanan tidak persisten.');
                    }
                }).catch((error) => {
                    console.error('Gagal mengakses persist:', error);
                });
            } else {
                console.log('StorageManager API tidak didukung di browser ini');
            }
            */
		}
	}

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Psikotest Online App`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
                pathURL={'/'}
                onetime={1}
            />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Homepage`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer />
        );
    });

    const MemoHomepageHeader = React.memo(function Memo() {
        return(
            <Homepage_Header />
        );
    });

    const MemoHomepageNavbar = React.memo(function Memo() {
        return(
            <Homepage_Navbar />
        );
    });

    const MemoHomepage_Welcome = React.memo(function Memo() {
        return(
            <Homepage_Welcome />
        );
    });
    
    const MemoHomepage_About = React.memo(function Memo() {
        return(
            <Homepage_About />
        );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        indexedDB();
    }, []);

    return(
        <>
            <MemoHelmet />
            <MemoNavBreadcrumb />
            <MemoHomepageHeader />
            <MemoHomepageNavbar />
            <MemoHomepage_Welcome />
            <MemoHomepage_About />
            <FooterLinkSEORel>
                <Link sx={{marginRight: 2}} rel="follow" title="Beranda" href="/" >Beranda</Link>
                <Link sx={{marginRight: 2}} rel="follow" title="Admin" href="/admin" >Admin</Link>
                <Link sx={{marginRight: 2}} rel="follow" title="Peserta" href="/peserta" >Peserta</Link>
                <Link sx={{marginRight: 2}} rel="follow" title="Hasil Psikotest" href="/peserta/psikotest/kecermatan/hasil" >Hasil Psikotest</Link>
            </FooterLinkSEORel>
            <MemoFooter />
        </>
    );
}
