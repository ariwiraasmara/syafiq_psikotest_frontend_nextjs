// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import {Helmet} from "react-helmet";
import axios from 'axios';
import * as React from 'react';

export default function Myhelmet(props) {

    const [token, setToken] = React.useState();
    const generateToken = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/token`, {
                withCredentials: true  // Mengirimkan cookies jika diperlukan
            });
            setToken(response.data.token);
            Cookies.set('XSRF-TOKEN', response.data.token, { expires: 1 });
            // Cookies.set('XSRF-TOKEN', response.data.token, { expires: 1, secure: true });
            // setCookie('XSRF-TOKEN', response.data.token, [{secure: true}]);
            console.log('token', response.data.token)
            if (token != null) {
                console.log('Token generated:', token);
                // Simpan token di state atau cookie sesuai kebutuhan
            } else {
                console.log('No CSRF token received');
            }
        } catch (err) {
            return err;
            // console.error(err);
        }
    }

    React.useEffect(() => {
        generateToken();
    }, []);

    return(
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
    );
}

