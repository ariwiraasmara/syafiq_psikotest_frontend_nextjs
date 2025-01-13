// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import axios from 'axios';
import Head from 'next/head'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types';

Myhelmet.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    pathURL: PropTypes.string,
    onetime: PropTypes.boolean,
    robots: PropTypes.string,
};

export default function Myhelmet(props) {
    function setHeaderData() {
        localStorage.setItem('page-title', props.title);
        localStorage.setItem('page-url', props.pathURL);
        localStorage.setItem('page-robots', props.robots);

        if(props.onetime == null || props.pathURL == undefined) {
            Cookies.remove('page-onetime');
        }
        else {
            Cookies.set('page-onetime', props.onetime, { expires: 1, path: 'syafiq.psikotest', secure: true, sameSite: 'strict' });
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        setHeaderData();
    }, []);
}