// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../layoutadmin';
import * as React from 'react';
import Link from '@mui/material/Link';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';

const typePsikotest = [
    "kecermatan",
    "dumb_data1",
    "dumb_data2",
    "dumb_data3",
];

export default function Psikotest() {
    return (
        <Layoutadmin>
            <Myhelmet
                title={`Psikotest | Admin | Psikotest`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`/admin/psikotest`}
            />
            <Appbarku headTitle="Psikotest" />
            <main className="p-5 mb-14" key={1}>
                {typePsikotest.map((data, index) => (
                    <Link href={`/admin/psikotest/${data}`} sx={{color: '#fff'}} key={index}>
                        <div className='border-b-2 p-3'>
                            {data}
                        </div>
                    </Link>
                ))}
            </main>
        </Layoutadmin>
    )
}