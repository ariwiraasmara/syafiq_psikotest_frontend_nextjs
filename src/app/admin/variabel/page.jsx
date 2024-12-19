// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Myhelmet from '@/components/Myhelmet';
import Appbarku from '@/components/Appbarku';
import fun from '@/libraries/myfunction';
import NewOrEdit from './new_edit';

const linkStyle = {
    color: '#fff'
}

const opencloseEdit = (varid) => {
    document.getElementById(varid).classList.toggle('hidden');
}

export default function VariabelSetting(props) {
    const router = useRouter();
    const [variabels, setVariabels] = React.useState([]);
    const getVariabelSetting = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting`);
            setVariabels(response.data.data);
        } catch (err) {
            return err;
            // console.error(err);
        }
    }

    const toEdit = (e, id, nvariabel, nvalue) => {
        e.preventDefault();
        sessionStorage.setItem('variabel_id', id);
        sessionStorage.setItem('variabel_variabel', nvariabel);
        sessionStorage.setItem('variabel_values', nvalue);
        return router.push('/admin/variabel/edit');
    };

    const fDelete = async (e, id) => {
        e.preventDefault();
    }

    React.useEffect(() => {
        getVariabelSetting();
    }, []);
    // console.log(variabels);
    return (
        <Layoutadmin>
            <Myhelmet
                title={`Variabel | Admin | Psikotest`}
                description={`Psikotest Online App`}
                keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
                pathURL={`${process.env.NEXT_PUBLIC_FRONTEND}/admin/variabel`}
            />
            <Appbarku headTitle="Variabel" />
            <main className="p-5 mb-14">
                <div>
                    {variabels.map((data, index) => (
                        <div key={index} className='border-b-2 p-3'>
                            <div className="static mt-3 flex flex-row justify-between">
                                <div className="order-first">
                                    <p>
                                        {data.variabel} = {data.values} detik
                                    </p>
                                </div>
                                <div className="order-last">
                                    <Link
                                        sx={linkStyle}
                                        className="mr-4"
                                        onClick={(e) => toEdit(e, data.id, data.variabel, data.values)}
                                    >
                                        <EditIcon />
                                    </Link>
                                    <Link
                                        sx={linkStyle}
                                        onClick={(e) => fDelete(e, `${data.id}`)}
                                    >
                                        <DeleteIcon />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="newdata" className="mt-6 border-1 hidden">
                    <h3 className="font-bold">Tambah Variabel Baru</h3>
                    <NewOrEdit />
                </div>
            </main>
            <Fab sx={{
                position: 'absolute',
                bottom: '13%',
                right: '3%',
            }} color="primary" aria-label="add" onClick={() => opencloseEdit('newdata')} >
                <AddIcon />
            </Fab>
        </Layoutadmin>
    );
}