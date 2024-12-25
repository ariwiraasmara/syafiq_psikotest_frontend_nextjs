// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
    const router = useRouter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        router.push(`/peserta/`);
    }, [router]);

    return (
        <div className='flex justify-center items-center h-screen p-6 font-bold text-2lg'>
            Selamat Datang!
        </div>
    );
}
