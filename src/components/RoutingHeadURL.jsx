// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});

export default function RoutingHeadURL(props) {
    const [getURL, setGetURL] = React.useState('');
    const admin = `${process.env.NEXT_PUBLIC_FRONTEND}/admin`;
    const peserta = `${process.env.NEXT_PUBLIC_FRONTEND}/peserta`;

    const HeadAdmin = () => {
        <Myhelmet
            title={`Login Admin | Psikotest Online App`}
            pathURL={`admin`}
            robots={`index, follow`}
            onetime={true}
        />
    }

    const HeadPeserta = () => {
        <Myhelmet
            title={`Formulir Peserta | Psikotest Online App`}
            pathURL={`peserta`}
            robots={`index, follow`}
            onetime={true}
        />
    }

    const HeadNotFound = () => {
        <Myhelmet
            title={`Not Found | Psikotest Online App`}
            pathURL={``}
            robots={`none`}
            onetime={false}
        />
    }

    React.useEffect(() => {
        setGetURL(window.location.href);
        console.info('window.location.href', window.location.href);
    }, []);

    if(window.location.href === admin) return(<HeadAdmin />);
    else if(window.location.href === peserta) return(<HeadPeserta />);
    else return(<HeadNotFound />);
}