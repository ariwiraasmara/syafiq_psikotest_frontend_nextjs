// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../layoutadmin';
import * as React from 'react';
import Link from '@mui/material/Link';
import dynamic from 'next/dynamic';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Appbarku = dynamic(() => import('@/components/Appbarku'), {
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
                description={`Halaman Psikotest dengan otoritas sebagai Admin.`}
                pathURL={`admin/psikotest`}
            />
        );
    });

    const MemoAppbarku = React.memo(function Memo() {
        return(
            <Appbarku headTitle="Psikotest" />
        );
    });

    return (
        <Layoutadmin>
            <MemoHelmet />
            <MemoAppbarku />
            <main className="p-5 mb-14" key={1}>
                {typePsikotest.map((data, index) => (
                    <Link href={`/admin/psikotest/${data}`} sx={{color: '#fff'}} key={index}>
                        <div className='border-b-2 p-3 capitalize'>
                            {data}
                        </div>
                    </Link>
                ))}
            </main>
        </Layoutadmin>
    )
}