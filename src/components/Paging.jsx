// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client'
import * as React from 'react';
import Link from '@mui/material/Link';

export default function Paging(props) {
    const xr = parseInt(props.page) + 1;
    if(props.current == xr) {
        return (
            <React.StrictMode>
                <span className='mr-4 ml-4 bg-red-700 p-2 rounded-xl font-bold underline underline-offset-8'>
                    <Link href={`/admin/psikotest/kecermatan/detil/?page=${xr}`} sx={{ color: 'white' }}>
                        {xr}
                    </Link>
                </span>
            </React.StrictMode>
        );
    }
    else {
        return (
            <React.StrictMode>
                <span className='mr-4 ml-4'>
                    <Link href={`/admin/psikotest/kecermatan/detil/?page=${xr}`} sx={{ color: 'white' }}>
                        {xr}
                    </Link>
                </span>
            </React.StrictMode>
        );
    }
}