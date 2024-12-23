import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PesertaKolomPertanyaan(dataPertanyaan) {
    return(
        <TableContainer component={Paper} className="border-b-2">
            <Table aria-label="standard table">
                <TableHead>
                    <TableRow>
                        <TableCell component="th" align="center" colSpan={5}>
                            <span className="font-bold">{dataPertanyaan.kolom_x}</span>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="td" align="center">{dataPertanyaan.nilai_A}</TableCell>
                        <TableCell component="td" align="center">{dataPertanyaan.nilai_B}</TableCell>
                        <TableCell component="td" align="center">{dataPertanyaan.nilai_C}</TableCell>
                        <TableCell component="td" align="center">{dataPertanyaan.nilai_D}</TableCell>
                        <TableCell component="td" align="center">{dataPertanyaan.nilai_E}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="td" align="center">A</TableCell>
                        <TableCell component="td" align="center">B</TableCell>
                        <TableCell component="td" align="center">C</TableCell>
                        <TableCell component="td" align="center">D</TableCell>
                        <TableCell component="td" align="center">E</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}