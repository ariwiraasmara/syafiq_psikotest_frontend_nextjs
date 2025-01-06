// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

Layoutpeserta.propTypes = {
  children: PropTypes.any,
};

export default function Layoutpeserta({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}
