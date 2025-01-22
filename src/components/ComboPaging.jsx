// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

ComboPaging.propTypes = {
    link: PropTypes.string,
    lastpage: PropTypes.number,
    current: PropTypes.number,
};

export default function ComboPaging(props) {
    const toPage = (e) => {
        const x = e.target.value;
        console.info('toPage', x);
        window.location.href= `${props.link}?page=${x}`;
    }

    const pageMenuItems = [];
    const linkHidden = [];
    for(let x = 1; x < parseInt(props.lastpage) + 1; x++) {
        pageMenuItems.push(
            <MenuItem value={x} selected={x === parseInt(props.current)} key={x}>
                {x}
            </MenuItem>
        );
        linkHidden.push(
            <Link rel='follow' title={`${props.title} halaman ${x}`} href={`${props.link}?page=${x}`} className='hidden' key={x}>
                {x}
            </Link>
        );
    }

    return(
        <div className={`text-center fixed w-full bg-black text-white p-2 ${props.bottom}`}>
            <span className='mr-2'>Halaman</span>
            <span>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.current}
                    label={props.current}
                    onChange={(e) => toPage(e)}
                    sx={{
                        border: '1px solid #fff',
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        color: '#000',
                        textAlign: 'right',
                        width: 80,
                        height: 30,
                    }}
                >
                    {pageMenuItems}
                </Select>
            </span>
            <span className='ml-2'>/ {props.lastpage}</span>
            {linkHidden}
        </div>
    );
}