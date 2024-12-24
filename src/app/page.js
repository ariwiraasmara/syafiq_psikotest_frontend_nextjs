// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
    const router = useRouter();
    React.useEffect(() => {
        router.push(`/peserta/`);
    }, []);
    return (
        <div className='flex justify-center items-center h-screen p-6 font-bold text-2lg'>
            Selamat Datang!
        </div>
    );
}
