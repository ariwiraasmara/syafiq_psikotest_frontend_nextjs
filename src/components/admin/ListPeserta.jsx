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
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
};

export default function ListPeserta(props) {
    const router = useRouter();

    const goTo = (id) => {
        sessionStorage.setItem('admin_id_peserta', id);
        router.push(`/admin/peserta/detil`);
    }

    const isLatest = (isTrue, tgl_ujian) => {
        if(isTrue) {
            return (<p><span className="font-bold">Tanggal Terakhir Ujian : {tgl_ujian}</span></p>);
        }
    }

    return(
        <React.StrictMode>
            <>
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
                ))} */
                props.listpeserta ? (
                    <For each={props.listpeserta}>
                        {(data, index) =>
                            <Link href='/admin/peserta/detil' rel="follow" title={`Detil Peserta ${data.nama}`} onClick={() => goTo(data.id) } key={index}>
                                <div key={index} className={`bg-slate-50 border-b-2 p-3 rounded-t-md mt-2 text-${props.textColor} border-${props.borderColor}`}>
                                    {isLatest(props.isLatest, data.tgl_ujian)}
                                    <p><span className="font-bold">{data.nama}</span></p>
                                    <p>{data.no_identitas}</p>
                                    <p>{data.email}</p>
                                    <p>{data.asal}</p>
                                </div>
                            </Link>
                        }
                    </For>
                ) : (
                    <h2 className={`font-bold text-center text-lg ${props.textColor}`}>
                        Data Peserta Kosong!<br/>Belum Ada Data!
                    </h2>
                )}
            </>
        </React.StrictMode>
    );
}