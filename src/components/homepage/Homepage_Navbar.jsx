// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

Homepage_Navbar.propTypes = {
};

const style = {
    'color' : '#fff',
    'color:hover' : '#5577ff',
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    color: '#000',
    border: '2px solid #000',
    boxShadow: 50,
    borderRadius: 5,
    p: 4,
  };
  

export default function Homepage_Navbar(props) {
    const router = useRouter();

    const [anchorPeserta, setAnchorPeserta] = React.useState(null);
    const open = Boolean(anchorPeserta);

    const toHomepage = (e) => {
        e.preventDefault();
        try {
            router.push(`/`);
        }
        catch(error) {
            console.error(error);
        }
    }

    const toAdmin = (e) => {
        e.preventDefault();
        try {
            router.push(`/admin`);
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleClick_MenuPeserta = (event) => {
        setAnchorPeserta(event.currentTarget);
      };

    const handleClose_MenuPeserta = (e) => {
        e.preventDefault();
        setAnchorPeserta(null);
    }

    const toPeserta = (e) => {
        e.preventDefault();
        setAnchorPeserta(null);
        try {
            localStorage.setItem('ispeserta', true);
            router.push('peserta');
        }
        catch(error) {
            console.error(error);
        }
    }

    const [noidentitas, setNoidentitas] = React.useState(0);
    const ongetNoIdentitas = (e) => {
        e.preventDefault();
        setNoidentitas(e.target.value);
        console.info('noidentitas', noidentitas);
    }

    const [tglTes, setTglTes] = React.useState('');
    const ongetTanggalTes = (e) => {
        e.preventDefault();
        setTglTes(e.target.value);
        console.info('tglTes', tglTes);
    }

    const [openModal_HasilPsikotestKecermatanPeserta, setOpenModal_HasilPsikotestKecermatanPeserta] = React.useState(false);
    const handleOpenModal_HasilPsikotestKecermatanPeserta = (e) => {
        e.preventDefault();
        setOpenModal_HasilPsikotestKecermatanPeserta(true);
    }
    
    const handleCloseModal_HasilPsikotestKecermatanPeserta = (e) => {
        e.preventDefault();
        setOpenModal_HasilPsikotestKecermatanPeserta(false);
        setAnchorPeserta(null);
    }

    const onSubmit_HasilPsikotestKecermatanPeserta = (e) => {
        e.preventDefault();
        try {
            localStorage.setItem('ispeserta', true);
            router.push(`peserta/psikotest/kecermatan/hasil/?identitas=${noidentitas}&tgl_tes=${tglTes}`);
        }
        catch(err) {
            console.error(err);
        }
    }
    
    const MenuAdmin = () => {
        if(!localStorage.getItem('ispeserta') || localStorage.getItem('ispeserta') === 'false') {
            return(
                <span className="mr-2">
                    <Button onClick={(e) => toAdmin(e)} sx={style}>
                        Admin
                    </Button>
                </span>
            );
        }
    }

    return(
        <>
            <div className="items-center justify-items-center text-center border-white border-b-2 p-2 bg-gradient-to-t from-sky-300 to-sky-700">
                <span className="mr-2">
                    <Button onClick={(e) => toHomepage(e)} sx={style}>
                        Beranda
                    </Button>
                </span>
                <MenuAdmin />
                <span>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => handleClick_MenuPeserta(e)}
                        sx={style}
                    >
                        Peserta
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorPeserta}
                        open={open}
                        onClose={(e) => handleClose_MenuPeserta(e)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={(e) => toPeserta(e)}>Mulai Psikotest</MenuItem>
                        <MenuItem onClick={(e) => handleOpenModal_HasilPsikotestKecermatanPeserta(e)}>Hasil Tes Psikotest Kecermatan</MenuItem>
                    </Menu>
                </span>
            </div>
            <Modal
                open={openModal_HasilPsikotestKecermatanPeserta}
                onClose={(e) => handleCloseModal_HasilPsikotestKecermatanPeserta(e)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form"
                    onSubmit={(e) => onSubmit_HasilPsikotestKecermatanPeserta(e)}
                    sx={styleModal}
                >
                    <div className='text-center'>
                        <h2 className='font-bold'>Isi Data Dulu...</h2>
                    </div>
                    <div className='mt-4'>
                        <span>No. Identitas (NIK, NIP, NISP, NIS, NIM, dll)</span>
                        <TextField type="number" id="no-identitas" variant="outlined" fullWidth
                                    focused required
                                    onChange={(e) => ongetNoIdentitas(e)}
                                    defaultValue={noidentitas}
                                    sx={{
                                        ':active' : '#000'
                                    }}
                        />
                    </div>
                    <div className='mt-4'>
                        <span>Tanggal Tes</span>
                        <TextField  type="date" id="tanggal-tes" variant="outlined" fullWidth
                                    focused required
                                    onChange = {(e) => ongetTanggalTes(e)}
                                    defaultValue={tglTes} />
                    </div>
                    <div className='mt-4'>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            OK
                        </Button>
                    </div>
                    <div className='mt-4'>
                        <Button variant="contained" color="secondary" fullWidth onClick={(e) => handleCloseModal_HasilPsikotestKecermatanPeserta(e)} type="button">
                            Batal
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}