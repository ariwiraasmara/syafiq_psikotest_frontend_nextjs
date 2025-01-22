// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PesertaDetil_GrafikKecermatan from './GrafikHasilPsikotestKecermatan_Peserta';

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

const TabStyle = {
    color: '#fff'
};

TabGrafikHasilPsikotestPesertaDetil.propTypes = {
    peserta_id: PropTypes.number,
    textColor: PropTypes.text,
};

export default function TabGrafikHasilPsikotestPesertaDetil(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    // console.info('TabHasilPsikotestPeserta peserta_id', props.peserta_id);
    return (
        <React.StrictMode>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value}
                        onChange={handleChange}
                        aria-label="Hasil Psikotest"
                        variant="fullWidth" centered
                    >
                        <Tab label="Kecermatan" {...a11yProps(0)} wrapped sx={TabStyle} />

                        {/* <Tab label="Item Two" {...a11yProps(1)} wrapped sx={TabStyle} />
                        <Tab label="Item Three" {...a11yProps(2)} wrapped sx={TabStyle} /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <PesertaDetil_GrafikKecermatan
                        peserta_id={props.peserta_id}
                        textColor={props.textColor}
                        borderColor={props.borderColor}
                    />
                </CustomTabPanel>

                {/* <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel> */}
            </Box>
        </React.StrictMode>
    );
}
