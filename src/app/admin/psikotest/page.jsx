// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '@/components/layout/Layoutadmin';
import * as React from 'react';
import Link from '@mui/material/Link';
import dynamic from 'next/dynamic';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});

const typePsikotest = [
    "kecermatan",
];

export default function Psikotest() {
    const textColor = localStorage.getItem('text-color');
    const textColorRGB = localStorage.getItem('text-color-rgb');
    const borderColor = localStorage.getItem('border-color');
    const borderColorRGB = localStorage.getItem('border-color-rgb');
    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Psikotest | Admin | Psikotest`}
                pathURL={`/admin/psikotest`}
                robots={`index, follow, snippet, max-snippet:99, noarchive, notranslate`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Psikotest" />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin / Psikotest`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer hidden={`hidden`} />
        );
    });

    return (
        <>
            <Layoutadmin>
                <MemoHelmet />
                <MemoAppbarku />
                <MemoNavBreadcrumb />
                <div className={`p-4 mb-14 text-${textColor}`}>
                    <h1 className='hidden'>Halaman Psikotest | Admin</h1>
                    {typePsikotest.map((data, index) => (
                        <Link rel='follow' title={`Psikotest ${data}`} href={`/admin/psikotest/${data}`} key={index}>
                            <div className={`bg-slate-50 border-b-2 p-3 rounded-t-md mt-2 capitalize text-${textColor} border-${borderColor}`}>
                                {data}
                            </div>
                        </Link>
                    ))}
                </div>
                <MemoFooter />
            </Layoutadmin>
        </>
    )
}