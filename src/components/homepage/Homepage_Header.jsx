// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import "./homepage_header.css";
import PropTypes from 'prop-types';
Homepage_Header.propTypes = {
};
export default function Homepage_Header(props) {
    return (
        <div className='bg-gradient-to-t from-sky-700 to-sky-900'>
            <h1 className='font-bold text-2xl text-center p-4'>Psikotest Online App</h1>
        </div>
    );
}