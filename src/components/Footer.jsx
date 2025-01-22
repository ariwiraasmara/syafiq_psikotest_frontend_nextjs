// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import PropTypes from 'prop-types';
Footer.propTypes = {
    hidden: PropTypes.string,
    children: PropTypes.any
};
export default function Footer(props) {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className={`border-white border-t-2 p-2 bg-gradient-to-t from-sky-300 to-sky-500 ${props.hidden} ${props.otherCSS}`}>
            <div className='text-center text-black'>
                <h2 className='font-bold'>Copyright @ {year} : </h2>
                <h3 className='mt-2'>
                    <address><strong>Syafiq (syafiq@gmail.com, +6285311487755)</strong></address>
                </h3>
                <h3 className='mt-2'>
                    <address><strong>Syahri Ramadhan Wiraasmara (ariwiraasmara.sc37@gmail.com, +628176896353)</strong></address>
                </h3>
            </div>
        </footer>
    )
}
