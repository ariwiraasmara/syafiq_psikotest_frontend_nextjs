// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';

export default function ListPeserta(props) {
    const router = useRouter();
    // let local = localStorage;

    const goTo = (id) => {
        sessionStorage.setItem('peserta_id', id);
        router.push(`/admin/peserta/detil`);
    }

    return(
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
    );
}