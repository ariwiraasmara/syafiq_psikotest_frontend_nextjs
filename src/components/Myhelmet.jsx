// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import { setCookie } from 'cookies-next/client';

export default function Myhelmet(props) {
    const [token, setToken] = React.useState();
    const generateToken = async () => {
        try {
            const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            setToken(response1);
            setCookie('XSRF-TOKEN', token);

            await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/generate-token-first`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            // localStorage.setItem('ckey', fun.generateKey());
            // console.log('token', response);
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    React.useEffect(() => {
        generateToken();
    }, []);

    return(
        <React.StrictMode>
            <Helmet>
                <title>{props.title}</title>
                <meta name="csrf-token" content={token} />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
                <meta name="author" content="Syahri Ramadhan Wiraasmara (ARI)" />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
                <link rel="author" href="https://github.com/ariwiraasmara" />
                <link rel="license" href="https://github.com/ariwiraasmara/syafiq_psikotest_frontend_nextjs?tab=AGPL-3.0-1-ov-file#" />
            </Helmet>
        </React.StrictMode>
    );
}