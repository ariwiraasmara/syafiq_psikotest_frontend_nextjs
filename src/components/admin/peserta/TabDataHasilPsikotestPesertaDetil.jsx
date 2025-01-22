// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara
import * as React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const TabTabelHasilPsikotestPesertaDetil = dynamic(() => import('./TabTabelHasilPsikotestPesertaDetil'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const TabGrafikHasilPsikotestPesertaDetil = dynamic(() => import('./TabGrafikHasilPsikotestPesertaDetil'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabDataHasilPsikotestPesertaDetil.propTypes = {
    peserta_id: PropTypes.number,
    no_identitas: PropTypes.number,
    textColor: PropTypes.text,
    borderColor: PropTypes.text,
};

export default function TabDataHasilPsikotestPesertaDetil(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabStyle = {
        color: props.textColor
    };

    // console.info('peserta-detil-TabDataHasilPsikotestPesertaDetil: id peserta', props.peserta_id);
    return (
        <React.StrictMode>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value}
                        onChange={handleChange}
                        aria-label="Detil Data Hasil Psikotest Peserta"
                        variant="fullWidth" centered
                    >
                        <Tab label="Tabel" {...a11yProps(0)} wrapped sx={TabStyle} />
                        <Tab label="Grafik" {...a11yProps(1)} wrapped sx={TabStyle} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <TabTabelHasilPsikotestPesertaDetil
                        peserta_id={props.peserta_id}
                        no_identitas={props.no_identitas}
                        textColor={props.textColor}
                        borderColor={props.borderColor}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <TabGrafikHasilPsikotestPesertaDetil
                        peserta_id={props.peserta_id}
                        textColor={props.textColor}
                        borderColor={props.borderColor}
                    />
                </CustomTabPanel>
            </Box>
        </React.StrictMode>
    );
}
