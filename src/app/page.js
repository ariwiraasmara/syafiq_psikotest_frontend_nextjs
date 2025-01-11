// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import dynamic from 'next/dynamic';
import {
    checkCompatibility,
	openDB,
    saveDataToDB
} from '@/indexedDB/db';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
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
			console.info("Database berhasil dibuka:", db);
			// Anda dapat melanjutkan menggunakan db untuk operasi lebih lanjut
		} catch (error) {
			console.error("Terjadi kesalahan saat membuka database:", error);
		}
	}

    const indexedDB = () => {
		if(checkCompatibility) {
			UseDB();
			saveDataToDB();
            if ('storage' in navigator && 'persist' in navigator.storage) {
                navigator.storage.persist().then((isPersistent) => {
                    if (isPersistent) {
                        console.log('Penyimpanan persisten berhasil.');
                    } else {
                        console.log('Penyimpanan tidak persisten.');
                    }
                }).catch((error) => {
                    console.error('Gagal mengakses persist:', error);
                });
            } else {
                console.log('StorageManager API tidak didukung di browser ini');
            }
		}
	}

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Psikotest Online App`}
                pathURL={``}
                robots={`index, follow`}
                onetime={true}
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

    const [theHtml, setTheHtml] = React.useState('');
    const getAllPage = async () => {
        try {
            const cacheResponse = await caches.match('homepage');
            if (cacheResponse) {
                const cachedData = await cacheResponse;
                console.log('cachedData', cachedData);
                setTheHtml(cachedData);
            }
            else {
                const page = () => {
                    return(
                        <>
                            <MemoHelmet />
                            <MemoNavBreadcrumb />
                            <MemoHomepageHeader />
                            <MemoHomepageNavbar />
                            <MemoHomepage_Welcome />
                            <MemoHomepage_About />
                            <MemoFooter />
                        </>
                    );
                }
                const cache = await caches.open('homepage');
                const cacheResponse = new Response(JSON.stringify(page), {
                        headers: { 'Content-Type': 'application/json' }
                });
                await cache.put('homepage', cacheResponse);
                setTheHtml(cacheResponse);
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        indexedDB();
        getAllPage();
    }, []);

    return(
        <>
            <MemoHelmet />
            <MemoNavBreadcrumb />
            <MemoHomepageHeader />
            <MemoHomepageNavbar />
            <MemoHomepage_Welcome />
            <MemoHomepage_About />
            <MemoFooter />
        </>
    );
}
