// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import Link from '@mui/material/Link';
import { For } from 'million/react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

ListPeserta.propTypes = {
    listpeserta: PropTypes.any,
    isLatest: PropTypes.boolean,
};

export default function ListPeserta(props) {
    const router = useRouter();
    // let local = localStorage;

    const goTo = (id) => {
        sessionStorage.setItem('admid_peserta', id);
        router.push(`/admin/peserta/detil`);
    }

    const isLatest = (isTrue, tgl_ujian) => {
        if(isTrue) {
            return (<p><span className="font-bold">Tanggal Terakhir Ujian : {tgl_ujian}</span></p>);
        }
    }

    return(
        <React.StrictMode>
            <div>
                {/* {props.listpeserta.map((data, index) => (
                    <Link onClick={() => goTo(data.id) } sx={{color: '#fff'}} key={index}>
                        <div key={index} className='border-b-2 p-3'>
                            {isLatest(props.isLatest, data.tgl_ujian)}
                            <p><span className="font-bold">{data.nama}</span></p>
                            <p>{data.no_identitas}</p>
                            <p>{data.email}</p>
                            <p>{data.asal}</p>
                        </div>
                    </Link>
                ))} */}
                <For each={props.listpeserta}>
                    {(data, index) =>
                        <Link onClick={() => goTo(data.id) } sx={{color: '#fff'}} key={index}>
                        <div key={index} className='border-b-2 p-3'>
                            {isLatest(props.isLatest, data.tgl_ujian)}
                            <p><span className="font-bold">{data.nama}</span></p>
                            <p>{data.no_identitas}</p>
                            <p>{data.email}</p>
                            <p>{data.asal}</p>
                        </div>
                    </Link>
                    }
                </For>
            </div>
        </React.StrictMode>
    );
}