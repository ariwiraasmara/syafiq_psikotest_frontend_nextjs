// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';

export default function ListPeserta(props) {
    const router = useRouter();
    // let local = localStorage;

    const goTo = (id) => {
        sessionStorage.setItem('admid_peserta', id);
        router.push(`/admin/peserta/detil`);
    }

    return(
        <React.StrictMode>
            <div>
                {props.listpeserta.map((data, index) => (
                    <Link onClick={() => goTo(data.id) } sx={{color: '#fff'}} key={index}>
                        <div key={index} className='border-b-2 p-3'>
                            <p><span className="font-bold">{data.nama}</span></p>
                            <p>{data.no_identitas}</p>
                            <p>{data.email}</p>
                            <p>{data.asal}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </React.StrictMode>
    );
}