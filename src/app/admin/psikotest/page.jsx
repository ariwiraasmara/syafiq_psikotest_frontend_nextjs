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
    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Psikotest | Admin | Psikotest`}
                pathURL={`admin/psikotest`}
                robots={`follow, index`}
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
            <MemoHelmet />
            <Layoutadmin>
                <MemoAppbarku />
                <MemoNavBreadcrumb />
                <div className="p-5 mb-14" key={1}>
                    <h1 className='hidden'>Halaman Psikotest | Admin</h1>
                    {typePsikotest.map((data, index) => (
                        <Link href={`/admin/psikotest/${data}`} sx={{color: '#fff'}} key={index}>
                            <div className='border-b-2 p-3 capitalize'>
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